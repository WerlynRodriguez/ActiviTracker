import { AxiosResponse } from "axios";
import axios from "./axios";
import { TDashboardData, IUser, TSesionDay, TStatus } from "./types";

const routes = Object.freeze({
    login: 'login',
    verifToken: 'verify',
    getInfo: 'getInfo',
    sesionsDays: 'sesionsDays',
    getAllInfo: 'allInfo',
    setStatus: 'setStatus',
    logout: 'logout',
});

export const verifyTokenReq = () => axios.get(routes.verifToken);

export const loginReq = (username: string, password: string) => axios.post(routes.login, { username, password });

export const getInfoUserReq = (idUser?: string) => 
    axios.get(routes.getInfo, { params: { id: idUser } }) as Promise<AxiosResponse<IUser>>;

export const getSesionsDayReq = (month: number, year: number, id?: string) =>  
    axios.get(routes.sesionsDays, { params: { month, year, id } }) as Promise<AxiosResponse<TSesionDay[]>>;

export const getAllInfoReq = () => axios.get(routes.getAllInfo) as Promise<AxiosResponse<TDashboardData>>;

export const setStatusReq = () => axios.put(routes.setStatus) as Promise<AxiosResponse<TStatus>>;

export const logoutReq = () => axios.get(routes.logout);