import { Course } from './course.interface'

export interface Club {
  id: number
  clubname: string
  nickname: string
  courses: Course[]
}
