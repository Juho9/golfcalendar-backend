
export interface User {
    id: number,
    lastname: string,
    firstname: string,
    username: string,
    membernumber: string,
    hcp: number,
    email: string,
    administrator: boolean,
    deleted: boolean
}

export interface MinUser {
    id: number,
    membernumber: string,
    lastname: string,
    firstname: string, 
    hcp: number
}