import { Course } from "./course.interface"
import { User } from "./user.interface"

//Default interface for Reservation
export interface Reservation {
    id: number
    course: Course,
    creator: User,
    player: User,
    creationDate: Date,
    startTime: Date ,
    deleted: boolean
}

//Interface for players in reservation
export interface ReservationPlayers {
    id: number
    player: {
        id: number
        firstname: string
        lastname: string
        hcp: number
    }
    startTime: Date
}
