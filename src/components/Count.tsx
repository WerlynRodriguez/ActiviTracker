import { TTimeData } from "../api/types";
import NumValue from "./NumValue";

export default function (props: { time: TTimeData }){
    const { time } = props;
    const { hours, minutes, seconds } = time;

    return (
        <span className="countdown">
            <NumValue value={hours}/>:
            <NumValue value={minutes}/>:
            <NumValue value={seconds}/>
        </span>
    )
}