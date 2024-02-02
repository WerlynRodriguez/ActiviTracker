import { LoaderFunctionArgs, json, redirect } from "react-router-dom";
import { getInfoUserReq, getSesionsDayReq } from "../api";

export async function loader(props: LoaderFunctionArgs) {
    // Get id from params, and get year and month from search params
    const { id } = props.params;

    const res = await getInfoUserReq(id)
        .catch(() => {redirect("/home")});
    if (!res || !res.data) return redirect('/home');

    return json(res.data)
}