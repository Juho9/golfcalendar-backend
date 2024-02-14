import { Course } from './course.interface'

export interface Club {
  id: number
  name: string
  nickname: string
}

export interface ClubCourses {
  id: number
  name: string
  courses: Course[]
}
