import {parseClockProjection,parseViewerProjection} from '@lorcana/contracts';
import type {ClockProjection,ViewerProjection} from '@lorcana/contracts';
export function timeoutWarning(value:ClockProjection,playerId:string,opening=false):string|null {
 const clock=parseClockProjection(value),player=clock.players.find(p=>p.playerId===playerId);
 if(!player||typeof opening!=='boolean')throw new Error('Invalid timeout warning');
 if(clock.status==='ended')return null;
 if(opening)return 'Next timeout loses the game';
 if(player.timeoutCount===0&&clock.timeoutLimit>1)return null;
 return player.timeoutCount>=clock.timeoutLimit-1?'Next timeout loses the game':`${player.timeoutCount} of ${clock.timeoutLimit} timeouts used`;
}
export function matchResult(value:ViewerProjection):string|null {
 const view=parseViewerProjection(value);if(!view.ended)return null;
 return view.endReason==='concession'?'Game ended by concession':view.endReason==='timeout'?'Game ended by timeout':'Game ended by a normal win';
}
