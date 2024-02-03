import { TTimeData } from "../api/types";
import NumValue from "./NumValue";

export default function (props: { time: TTimeData }){
    const { time } = props;
    const { hours, minutes, seconds } = time;

    return (
        <span className="countdown">
            <NumValue key={"FirstNumValue"} value={hours}/>:
            <NumValue key={"SecondNumValue"} value={minutes}/>:
            <NumValue key={"ThirdNumValue"} value={seconds}/>
        </span>
    )
}