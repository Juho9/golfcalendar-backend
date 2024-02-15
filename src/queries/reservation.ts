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
      r.arrived,
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
      r.arrived,
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
      r.arrived,
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
      r.arrived,
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

export const insertReservation = async (
  courseId: number,
  creatorId: number,
  playerId: number,
  startTime: string
): Promise<boolean> => {
  const creationDate = new Date()
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `INSERT INTO
      Reservation(
        course_id,
        creator_id,
        player_id,
        creationDate,
        startTime,
        arrived,
        deleted
      )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [courseId, creatorId, playerId, creationDate, startTime, 0, 0]
  )
  return rows.affectedRows != 0
}

export const updateReservation = async (reservation: any): Promise<boolean> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `UPDATE
      Reservation r
    SET
      r.course_id = (?),
      r.creator_id = (?),
      r.creationDate = (?),
      r.startTime = (?)
    WHERE
      r.id = (?)
    `,
    [
      reservation.courseId,
      reservation.creatorId,
      reservation.creationDate,
      reservation.startTime,
      reservation.id,
    ]
  )
  return rows.affectedRows != 0
}

export const updateReservationArrivedStatus = async (
  reservationId: number,
  arrived: boolean
): Promise<boolean> => {
  const promisePool = pool.promise()
  const status = !arrived
  const [rows] = await promisePool.query<ResultSetHeader>(
    `UPDATE
      Reservation r
    SET
      r.arrived = (?)
    WHERE
      r.id = (?)
    `,
    [status, reservationId]
  )
  return rows.affectedRows != 0
}

export const softDeleteReservaiton = async (
  reservationId: number
): Promise<boolean> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `UPDATE
      Reservation r
    SET
      r.deleted = 1
    WHERE
      r.id = (?)
    `,
    [reservationId]
  )
  return rows.affectedRows != 0
}
