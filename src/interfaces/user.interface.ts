import { Club } from './club.interface'
import { Permit } from './permit.interface'

export interface User {
  id: number
  lastname: string
  firstname: string
  username: string
  memberNumber: number
  hcp: number
  homeclub: string
  email: string
  active: boolean
  permit: Permit[]
  deleted: boolean
}

export interface MinUser {
  id: number
  memberNumber: number
  lastname: string
  firstname: string
  hcp: number
  homeclub?: Club
}
