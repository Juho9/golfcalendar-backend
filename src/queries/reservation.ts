import { pool } from '../index'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { Reservation } from '../interfaces/reservation.interface'

export const getAllReservations = async (): Promise<Reservation[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      r.id,
      co.coursename AS coursename,
      r.creator_id,
      r.player_id,
      r.creationDate,
      r.startTime,
      r.deleted
    FROM
      Reservation r
    LEFT JOIN
      Course co ON r.course_id = co.id
    `
  )
  return rows as Reservation[]
}

export const getReservationById = async (
  reservationId: number
): Promise<Reservation | null> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      r.id,
      co.coursename AS coursename,
      r.creator_id,
      r.player_id,
      r.creationDate,
      r.startTime,
      r.deleted
    FROM
      Reservation r
    LEFT JOIN
      Course co ON r.course_id = co.id
    WHERE
      r.id = ?
    `,
    [reservationId]
  )
  return rows.length > 0 ? (rows[0] as Reservation) : null
}

export const getAllReservationsForUser = async (
  userId: number
): Promise<Reservation[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      r.id,
      co.coursename AS coursename,
      r.creator_id,
      r.player_id,
      r.creationDate,
      r.startTime,
      r.deleted
    FROM
      Reservation r
    LEFT JOIN
      Course co ON r.course_id = co.id
    WHERE
      r.player_id = ? AND r.deleted = 0
    `,
    [userId]
  )
  return rows as Reservation[]
}

export const getAllDeletedReservationsForUser = async (
  userId: number
): Promise<Reservation[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      r.id,
      co.coursename AS coursename,
      r.creator_id,
      r.player_id,
      r.creationDate,
      r.startTime,
      r.deleted
    FROM
      Reservation r
    LEFT JOIN
      Course co ON r.course_id = co.id
    WHERE
        r.player_id = ? AND r.deleted = 1
    `,
    [userId]
  )
  return rows as Reservation[]
}
