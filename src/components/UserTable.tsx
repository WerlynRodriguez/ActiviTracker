import { useEffect, useRef, useState } from "react";
import { TTimeData, IUser } from "../api/types";
import { addOne } from "../utils";

function TableRow(props: IUser & {  n: number, onCickTableRow?: (id: string) => void }) {
    const { id, username, active, n, onCickTableRow } = props;
    const [time, setTime] = useState<TTimeData>(props.time);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!active) return;
        
        intervalRef.current = setInterval(() => {
            setTime(addOne);
        }, 1000);
        
        return () => {
            if(intervalRef.current != null) clearInterval(intervalRef.current);
        }
    }, []);

    const onClick = () => onCickTableRow && onCickTableRow(id);

    return (
        <tr>
            <th>{n}</th>
            <td>
                <button onClick={onClick} className="btn btn-neutral btn-xs">
                    {username}
                </button>
            </td>
            <td>{time.hours}h {time.minutes}m {Number(time.seconds).toFixed(0)}s</td>
            <td>{active && <div className="badge badge-success gap-2"> ✓ </div>}</td>
        </tr>
    )
}

interface UserTableProps {
    users: IUser[];
}

export default function UserTable(props: UserTableProps & { onCickTableRow?: (id: string) => void }) {
    const { users, onCickTableRow } = props;

    return (
        <table className="table table-zebra">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Tiempo</th>
                    <th>Activo</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, i) => (
                    <TableRow {...user} n={i + 1} key={user.id} onCickTableRow={onCickTableRow} />
                ))}
            </tbody>
        </table>
    );
}