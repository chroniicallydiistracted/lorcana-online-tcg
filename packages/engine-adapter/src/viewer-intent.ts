import { closedRecord, copyInput, unsigned } from './validation.js';
/** Current synthetic command profile. Real-card private choices require qualified codecs before admission. */
export function resolveViewerIntent(actor:string,players:string[],move:unknown,value:unknown,resolve:(reference:unknown)=>string):Record<string,unknown> {
  try {
    if(!players.includes(actor))throw new Error();
    const fields:Record<string,string[]>={chooseWhoGoesFirst:['playerId'],alterHand:['cardsToMulligan'],putCardIntoInkwell:['cardId'],playCard:['cardId','cost','inkDrops','effectInkDropCounters'],quest:['cardId'],questWithAll:[],challenge:['attackerId','defenderId'],moveCharacterToLocation:['characterId','locationId','inkDrops','effectInkDropCounters'],activateAbility:['cardId','abilityIndex','inkDrops'],passTurn:[],concede:[]};
    if(typeof move!=='string'||!Object.hasOwn(fields,move))throw new Error();
    const input=closedRecord(copyInput(value),fields[move]!);
    const out:Record<string,unknown>={};
    for(const [key,item]of Object.entries(input)) {
      if(['cardId','attackerId','defenderId','characterId','locationId'].includes(key))out[key]=resolve(item);
      else if(key==='cardsToMulligan'){if(!Array.isArray(item)||item.length>60)throw new Error();out[key]=item.map(resolve);}
      else if(key==='playerId'){if(typeof item!=='string'||!players.includes(item))throw new Error();out[key]=item;}
      else if(key==='cost'){if(item!=='standard')throw new Error();out[key]=item;}
      else if(key==='effectInkDropCounters'){if(!Array.isArray(item)||item.length>32)throw new Error();out[key]=item.map(unsigned);}
      else out[key]=unsigned(item);
    }
    return out;
  }catch{throw new Error('Reference rejected');}
}
