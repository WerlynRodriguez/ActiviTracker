import { json, redirect } from "react-router-dom";
import { getAllInfoReq } from "../api";

const greetings = Object.freeze([
    { g: "Buenos días", h: 5, t: 11 },
    { g: "Salutaciones", h: 11, t: 13 },
    { g: "Buenas tardes", h: 13, t: 17 },
    { g: "Salutaciones", h: 17, t: 19 },
    { g: "Buenas noches", h: 19, t: 23 },
    { g: "Dulces sueños", h: 23, t: 5 },
])

export async function loader(){
    const date = new Date();
    const hour = date.getHours();
    let greeting = greetings.find((g) => g.h <= hour && g.t > hour) || greetings[0];

    const res = await getAllInfoReq()
        .catch(() => {redirect('/login')});

    if (!res || !res.data) return redirect('/login');

    return json({
        ...res.data,
        greeting
    });
}