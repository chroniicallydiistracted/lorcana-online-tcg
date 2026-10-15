import type {ClockService} from './clock-service.ts';

/** One owned sweep at a time; shutdown drains it before storage is closed. */
export function createClockRunner(options:{clocks:Pick<ClockService,'tick'>;intervalMs?:number;batchSize?:number}) {
  const interval=options.intervalMs??250,batch=options.batchSize??32;
  if(!Number.isInteger(interval)||interval<10||interval>5000||!Number.isInteger(batch)||batch<1||batch>128)throw new Error('Invalid clock runner configuration');
  let started=false,stopped=false,timer:ReturnType<typeof setTimeout>|undefined,pending:Promise<void>|undefined,delay=interval;
  function schedule(){if(!stopped)timer=setTimeout(sweep,delay);}
  function sweep(){
    timer=undefined;if(stopped)return;
    const work=(async()=>{try{await options.clocks.tick(batch);delay=interval;}catch{delay=Math.min(5000,delay*2);}})();
    pending=work;void work.finally(()=>{pending=undefined;schedule();});
  }
  return {
    start(){if(stopped)throw new Error('Clock runner closed');if(started)return;started=true;schedule();},
    async close(){stopped=true;if(timer!==undefined)clearTimeout(timer);timer=undefined;await pending;},
  };
}
