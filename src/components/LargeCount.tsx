import { TTimeData } from "../api/types";
import NumValue from "./NumValue";

function BigValue(props: { value: number, label: string }){
    const { value, label } = props;

    return (
        <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
                <NumValue value={value}/>
            </span>
            {label}
        </div> 
    )
}

export default function (props: { time: TTimeData }){
    const { time } = props;
    const { hours, minutes, seconds } = time;

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <BigValue value={hours} label="hours" key={"FirstBigValue"} />
            <BigValue value={minutes} label="min" key={"SecondBigValue"} />
            <BigValue value={seconds} label="sec" key={"ThirdBigValue"} />
        </div>
    )
}