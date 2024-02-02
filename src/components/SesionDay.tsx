import { DateTime } from "luxon";
import { TSesionDay } from "../api/types"

interface ISesionDayProps extends TSesionDay {
    index: number;
    onClick?: (index: number) => void;
}

export default function (props: ISesionDayProps) {
    const { date, time, sesions, index, onClick } = props;

    const onClickHandler = () => {
        if (onClick) onClick(index);
    }

    return (
        <div
            onClick={onClickHandler}
            className="card bg-base-200 shadow-xl select-none cursor-pointer hover:border-info border-2 border-base-200 transition-colors"
        >
            <div className="card-body">
                <h2 className="card-title">
                    {DateTime.fromISO(date).toFormat('cccc', {locale: 'es'})} {DateTime.fromISO(date).day}
                </h2>
                <p>
                    {time.hours} horas con {time.minutes} minutos
                    <progress 
                        className="progress progress-info"
                        value={time.hours * 60 + time.minutes}
                        max={1440}
                    ></progress>
                </p>
                <div className="card-actions justify-end">
                    {sesions.length !== 0 && <div className="badge badge-outline"> Ver más </div>} 
                </div>
            </div>
        </div>
    )
}