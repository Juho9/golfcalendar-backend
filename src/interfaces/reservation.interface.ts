import { Course } from './course.interface'
import { User } from './user.interface'

export interface Reservation {
  id: number
  coursename: string
  player_id: number
  creator_id: number
  startTime: Date
  creationDate: Date
  arrived: boolean
  deleted: boolean
}

export interface MinReservation {
  id: number
  course: string
  player: string
  creator: string
  startTime: Date
  creationDate: Date
  arrived: boolean
  deleted: boolean
}
