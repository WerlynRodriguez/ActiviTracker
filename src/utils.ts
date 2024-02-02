import { TTimeData } from "./api/types";

export function greaterTime(timeA: TTimeData, timeB: TTimeData) {
    const obkeys = Object.keys(timeA);

    for (const key of obkeys) {
        if (timeA[key as keyof TTimeData] > timeB[key as keyof TTimeData])
            return true;
        else if (timeA[key as keyof TTimeData] < timeB[key as keyof TTimeData])
            return false;
    }

    return false;
}

/**
* Adds one to a time var
* @param time - Time to add one
*/
export function addOne (time: TTimeData) {
   let { hours, minutes, seconds } = time;

   if(seconds++ >= 59){
       seconds = 0;
       if(minutes++ >= 59){
           minutes = 0;
           hours++;
       }
   }

   return { hours, minutes, seconds };
}