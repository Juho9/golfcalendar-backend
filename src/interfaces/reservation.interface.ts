import { Course } from "./course.interface"
import { User } from "./user.interface"

export interface Reservation {
    id: number,
    course: Course,
    player: User,
    creator: User,
    creationDate: Date,
    startTime: Date,
    deleted: boolean
}

export interface MinReservation {
    id: number,
    course: string,
    player: string,
    creator: string,
    startTime: Date,
    creationDate: Date,
    deleted: boolean
}