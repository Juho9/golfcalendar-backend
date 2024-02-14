import { Course } from './course.interface'

export interface Club {
  id: number
  name: string
  nickname: string
  courses: Course[]
}
