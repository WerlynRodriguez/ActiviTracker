export type TGreeting = {
    /** The greeting message */
    g: string;
    /** The start time of the greeting */
    h: number;
}

export type TTimeData = {
    hours: number;
    minutes: number;
    seconds: number;
}

export type TStatus = {
    active: boolean;
    time?: TTimeData;
}

export interface IUser {
    id: string,
    username: string,
    active: boolean,
    time: TTimeData,
}

export type TSesion = {
    id: string,
    start: string,
    end: string,
    time: TTimeData
}

export type TSesionDay = {
    id: string,
    date: string,
    time: TTimeData
    sesions: TSesion[]
}

export type TPagination = {
    /** Indicates if there is a next page */
    next: boolean;
    /** The current page */
    page: number;
}

export type TDashboardData = {
    /** The greeting message of the hour */
    greeting: TGreeting;
    /** The user dashboard data */
    me: Omit<IUser, 'id'>;
    pagination: TPagination;
    users: IUser[];
    activeUsers: number;
    maxTimeUser: string;
}
