import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {createHash} from 'node:crypto';
import {once} from 'node:events';
import {createViewerProjection} from '../../packages/engine-adapter/dist/viewer.js';
import {encodeViewerSurface,decodeViewerSurface,encodeMatchDiagnostic} from '../../packages/contracts/dist/index.js';
import {source,context} from '../../packages/engine-adapter/tests/viewer-fixtures.mjs';
const surfaces=['snapshot','resources','logs','animations','export'];
function frame(raw){const data=Buffer.from(raw),header=data.length<126?Buffer.from([0x81,data.length]):data.length<65536?Buffer.from([0x81,126,data.length>>8,data.length&255]):Buffer.from([0x81,127,0,0,0,0,(data.length>>>24)&255,(data.length>>>16)&255,(data.length>>>8)&255,data.length&255]);return Buffer.concat([header,data]);}
/** Owned loopback transport fixture only. Not an authentication or PLAY-03 server. */
async function fixture(){
 const sockets=new Set();let current=source();
 function output(url){const [role,surface]=url.split('/').filter(Boolean);if(!['p1','p2','public'].includes(role)||!surfaces.includes(surface))throw new Error();const viewer=role==='public'?{kind:'public'}:{kind:'participant',playerId:role};return encodeViewerSurface(createViewerProjection(current,{...context,viewer}).snapshot,surface);}
 const server=createServer((req,res)=>{try{const raw=output(req.url);res.writeHead(200,{'content-type':'application/json','cache-control':'no-store'});res.end(raw);}catch{res.writeHead(403);res.end('{"error":"forbidden"}');}});
 server.on('connection',s=>{sockets.add(s);s.on('close',()=>sockets.delete(s));});
 server.on('upgrade',(req,socket)=>{try{const raw=output(req.url),key=req.headers['sec-websocket-key'];if(typeof key!=='string')throw new Error();const accept=createHash('sha1').update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+accept+'\r\n\r\n');socket.write(frame(raw));socket.on('data',data=>{if((data[0]&15)===8){socket.end(Buffer.from([0x88,0]));}});}catch{socket.destroy();}});
 server.listen(0,'127.0.0.1');await once(server,'listening');const port=server.address().port;
 return {port,set:value=>{current=value;},async close(){for(const socket of sockets)socket.destroy();await new Promise((r,e)=>server.close(error=>error?e(error):r()));}};
}
async function ws(port,path){const client=new globalThis.WebSocket('ws://127.0.0.1:'+port+path);try{return await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>{reject(new Error('wire timeout'));client.close();},5000);client.addEventListener('message',event=>{clearTimeout(timeout);resolve(String(event.data));},{once:true});client.addEventListener('error',()=>{clearTimeout(timeout);reject(new Error('wire error'));},{once:true});});}finally{const closed=new Promise(r=>client.addEventListener('close',r,{once:true}));client.close();await closed;}}

test('independent HTTP and WebSocket clients receive identical privacy-safe bytes on every output surface',async()=>{
 const f=await fixture();try{
  for(const role of ['p1','p2','public'])for(const surface of surfaces){
   const path='/'+role+'/'+surface,http=await fetch('http://127.0.0.1:'+f.port+path),raw=await http.text(),socket=await ws(f.port,path);assert.equal(http.status,200);assert.equal(socket,raw);const decoded=decodeViewerSurface(raw);assert.equal(decoded.surface,surface);
   for(const forbidden of ['private-a','private-b','deck-a','deck-b','ink-secret','raw-input','private-G','do-not-forward','cardInstances','seed','randomOutcomes'])assert.equal(raw.includes(forbidden),false,forbidden);
   if(role!=='p1')assert.equal(raw.includes('secret-amber'),false);if(role!=='p2')assert.equal(raw.includes('secret-ruby'),false);
  }
 }finally{await f.close();}
});

test('hidden-state paired worlds have identical real wire/resource/log/export bytes and fixed diagnostic output',async()=>{
 const f=await fixture();try{
  for(const surface of surfaces){
   const a=source(),b=source();b.instances['private-b']='mutated-secret';b.instances['deck-a']='mutated-private-deck';b.instances['ink-a']='mutated-ink';b.events[0].event.input={hidden:'different-log'};b.state.G.pendingEffects=[{target:'private-b',candidateIds:['deck-b']}];
   f.set(a);const first=await ws(f.port,'/p1/'+surface);f.set(b);const second=await ws(f.port,'/p1/'+surface);assert.equal(first,second,surface);
  }
  const before=encodeMatchDiagnostic({event:'projection',outcome:'ok',stateVersion:4});assert.equal(before,encodeMatchDiagnostic({event:'projection',outcome:'ok',stateVersion:4}));
  const result=await fetch('http://127.0.0.1:'+f.port+'/judge/export');assert.equal(result.status,403);assert.deepEqual(await result.json(),{error:'forbidden'});
 }finally{await f.close();}
});
