//Default interface for User
export interface User {
    id: number
    firstname: string
    username: string
    lastname: string
    memberNumber: string
    hcp: number
    email: string
    passw: string | null
    administrator?: boolean
    deleted: boolean
  }
  
//Interface for calender view
export interface ShortUser {
    id: number
    lastname: string
    username: string
    hcp: number
}