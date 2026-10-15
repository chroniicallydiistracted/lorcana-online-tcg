interface Entry { value:string;bytes:number;expires:number }
/** Server-private bounded serialized cache. Authority and complete cache identity belong to the caller. */
export function createProjectionCache(options:{maxEntries?:number;maxBytes?:number;maxPending?:number;ttlMs?:number;now?:()=>number}={}) {
  const maxEntries=options.maxEntries??64,maxBytes=options.maxBytes??8*1024*1024,maxPending=options.maxPending??32,ttlMs=options.ttlMs??30_000,now=options.now??(()=>performance.now());
  for(const [v,min,max]of [[maxEntries,1,256],[maxBytes,1,16*1024*1024],[maxPending,1,64],[ttlMs,1,60_000]] as const)if(!Number.isSafeInteger(v)||v<min||v>max)throw new Error('Invalid cache limits');
  const entries=new Map<string,Entry>(),pending=new Map<string,Promise<string>>();let bytes=0,closed=false;
  function drop(key:string){const old=entries.get(key);if(old){entries.delete(key);bytes-=old.bytes;}}
  return {
    async get(key:string,produce:()=>Promise<string>):Promise<string> {
      if(closed||typeof key!=='string'||key.length>256)throw new Error('projection unavailable');
      for(const [k,entry]of entries)if(entry.expires<=now())drop(k);
      const hit=entries.get(key);if(hit){entries.delete(key);entries.set(key,hit);return hit.value;}
      const running=pending.get(key);if(running)return running;
      if(pending.size>=maxPending)throw new Error('projection unavailable');
      // Invoke immediately so all subsequent callers observe the owned promise.
      let load:Promise<string>;try{load=produce();}catch{throw new Error('projection unavailable');}
      const work=load.then(value=>{
        const size=typeof value==='string'?Buffer.byteLength(value):Infinity;
        if(closed||size>maxBytes)throw new Error('projection unavailable');
        while(entries.size>=maxEntries||bytes+size>maxBytes)drop(entries.keys().next().value!);
        entries.set(key,{value,bytes:size,expires:now()+ttlMs});bytes+=size;return value;
      }).finally(()=>pending.delete(key));
      pending.set(key,work);return work;
    },
    close(){closed=true;entries.clear();bytes=0;},
  };
}
