import { pool } from '../index'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { User, MinUser } from '../interfaces/user.interface'

export const getAllUsers = async (): Promise<User[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      u.id,
      u.lastname,
      u.firstname,
      u.username,
      u.memberNumber,
      u.hcp,
      c.clubname AS homeclub,
      u.email,
      u.active,
      u.deleted
    FROM
      User u
    LEFT JOIN
      Club c ON u.homeclub = c.id
      `
  )
  return rows as User[]
}

export const getUserById = async (userId: number): Promise<User | null> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      u.id,
      u.lastname,
      u.firstname,
      u.username,
      u.memberNumber,
      u.hcp,
      c.clubname AS homeclub,
      u.email,
      u.active,
      u.deleted
    FROM
      User u
    LEFT JOIN
      Club c ON u.homeclub = c.id
    WHERE
      u.id = ?
      `,
    [userId]
  )
  return rows.length > 0 ? (rows[0] as User) : null
}

export const getUserByMemberNumber = async (
  number: number
): Promise<User | null> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      u.id,
      u.lastname,
      u.firstname,
      u.username,
      u.memberNumber,
      u.hcp,
      c.clubname AS homeclub,
      u.email,
      u.active,
      u.deleted
    FROM
      User u
    LEFT JOIN
      Club c ON u.homeclub = c.id
    WHERE
      u.memberNumber = ?
      `,
    [number]
  )
  return rows.length > 0 ? (rows[0] as User) : null
}

export const getAllMinUsers = async (): Promise<MinUser[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      u.id,
      u.lastname,
      u.firstname,
      u.memberNumber,
      u.hcp,
      c.nickname AS homeclub
    FROM
      User u
    LEFT JOIN
      Club c ON u.homeclub = c.id
      `
  )
  return rows as MinUser[]
}
