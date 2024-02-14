import { pool } from '../index'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { Course } from '../interfaces/course.interface'

export const getAllCourses = async (): Promise<Course[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      co.id,
      co.coursename,
      co.holes
    FROM
      Course co
      `
  )
  return rows as Course[]
}

export const getCourseById = async (
  courseId: number
): Promise<Course | null> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      co.id,
      co.coursename,
      co.holes
    FROM
      Course co
    WHERE
      co.id = ?
      `,
    [courseId]
  )
  return rows.length > 0 ? (rows[0] as Course) : null
}

export const getAllCoursesByClubId = async (
  clubId: number
): Promise<Course[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      co.id,
      co.coursename,
      co.holes
    FROM
      Course co
    WHERE
      co.club_id = ?
      `,
    [clubId]
  )
  return rows as Course[]
}
