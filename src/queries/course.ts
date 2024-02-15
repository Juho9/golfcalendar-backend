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

export const insertCourse = async (
  clubId: number,
  coursename: string,
  holes: number
): Promise<boolean> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `INSERT INTO
      Course(
        club_id,
        coursename,
        holes
      )
    VALUES (?, ?, ?)`,
    [clubId, coursename, holes]
  )
  return rows.affectedRows != 0
}

export const updateCourse = async (course: any): Promise<boolean> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `UPDATE
      Course co
    SET
      co.club_id = (?),
      co.coursename = (?),
      co.holes = (?)
    WHERE
      co.id = (?)
    `,
    [course.clubId, course.coursename, course.holes, course.id]
  )
  return rows.affectedRows != 0
}

export const hardDeleteCourse = async (courseId: number): Promise<boolean> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `DELETE
    FROM
      Course co
    WHERE
      co.id = ?
    `,
    [courseId]
  )
  return rows.affectedRows != 0
}
