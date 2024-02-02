export default function (props: { value: number }){
    const { value } = props;

    return <span style={{ "--value": value } as React.CSSProperties}></span>
}