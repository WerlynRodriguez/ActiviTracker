import { TSesion } from "../api/types";

interface SesionProps extends TSesion {
    index: number;
}

export default function (props: SesionProps) {
    const { start, end, time, index } = props;

    return (
        <tr>
            <th>{index}</th>

            <td>{start}</td>
            <td className="text-secondary">
                {`${time.hours}h ${time.minutes}m ${time.seconds}s`}
            </td>
            <td>{end}</td>
        </tr>
    )
}

interface StatValueProps {
    title: string;
    value: string;
    desc: string;
    secondary?: boolean;
}

function StatValue(props: StatValueProps) {
    const { title, value, desc } = props;

    return (
        <div className="stat place-items-center">
            <div className="stat-title">
                {title}
            </div>
            <div className={"stat-value " + (props.secondary && "text-secondary")}>
                {value}
            </div>
            <div className={"stat-desc " + (props.secondary && "text-secondary")}>
                {desc}
            </div>
        </div>
    )
}