export interface ClockReading {utcMs:number;healthy:boolean;reason:'recovery'|'time_unreliable'|null}
export function createClockHealth(options:{monotonicNow?:()=>number;toleranceMs?:number;maxGapMs?:number}={}) {
  const now=options.monotonicNow??(()=>performance.now()),tolerance=options.toleranceMs??1000,maxGap=options.maxGapMs??15000;
  if(typeof now!=='function'||!Number.isSafeInteger(tolerance)||tolerance<1||tolerance>5000||!Number.isSafeInteger(maxGap)||maxGap<1||maxGap>60000)throw new Error('Invalid clock health limits');
  type Sample={utc:number;before:number;after:number};
  let first:Sample|undefined,last:Sample|undefined,failure:ClockReading['reason']=null;
  function refused(reason:Exclude<ClockReading['reason'],null>,utc=last?.utc??0):ClockReading{failure??=reason;return {utcMs:utc,healthy:false,reason:failure};}
  let queued=Promise.resolve();
  async function sample(read:()=>Promise<number>):Promise<ClockReading>{
      let before:number,after:number,utc:number;
      try{before=now();utc=await read();after=now();}catch{return refused('recovery');}
      if(!Number.isSafeInteger(utc)||utc<0||utc>8_640_000_000_000_000||!Number.isFinite(before)||!Number.isFinite(after)||before<0||after<before)return refused('time_unreliable');
      if(failure)return {utcMs:utc,healthy:false,reason:failure};
      if(after-before>maxGap||last&&before-last.after>maxGap)return refused('recovery',utc);
      if(last&&(utc<last.utc||before<last.before))return refused('time_unreliable',utc);
      if(first){
        const delta=utc-first.utc,lower=before-first.after,upper=after-first.before;
        if(delta<lower-tolerance||delta>upper+tolerance)return refused('time_unreliable',utc);
      }
      const sample={utc,before,after};first??=sample;last=sample;return {utcMs:utc,healthy:true,reason:null};
  }
  return {
    maxGapMs:maxGap,
    sample(read:()=>Promise<number>):Promise<ClockReading>{const work=queued.then(()=>sample(read));queued=work.then(()=>{},()=>{});return work;},
    /** Trusted audited recovery only; no client clock, timer or host setting is changed. */
    reset(){first=undefined;last=undefined;failure=null;},
  };
}
export type ClockHealth=ReturnType<typeof createClockHealth>;
