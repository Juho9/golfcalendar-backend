import { pool } from '../index'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { Club } from '../interfaces/club.interface'

export const getAllClubs = async (): Promise<Club[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query(
    `SELECT
      c.id,
      c.clubname,
      c.nickname
    FROM
      Club c
    `
  )
  return rows as Club[]
}

export const getClubById = async (clubId: number): Promise<Club | null> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      c.id,
      c.clubname,
      c.nickname
    FROM 
      Club c
    WHERE 
      id = ?
    `,
    [clubId]
  )
  return rows.length > 0 ? (rows[0] as Club) : null
}

export const insertClub = async (
  clubname: string,
  nickname: string
): Promise<boolean> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `INSERT INTO
      Club(
        clubname,
        nickname
      )
    VALUES (?, ?)`,
    [clubname, nickname]
  )
  return rows.affectedRows != 0
}

export const updateClub = async (club: any): Promise<boolean> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `UPDATE
      Club c
    SET
      c.clubname = (?),
      c.nickname = (?)
    WHERE
      c.id = (?)
    `,
    [club.clubname, club.nickname, club.id]
  )
  return rows.affectedRows != 0
}

export const hardDeleteClub = async (clubId: number): Promise<boolean> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<ResultSetHeader>(
    `DELETE
    FROM
      Club c
    WHERE
      c.id = ?
    `,
    [clubId]
  )
  return rows.affectedRows != 0
}
