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

export const getMinUserById = async (
  userId: number
): Promise<MinUser | null> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      u.id,
      u.lastname,
      u.firstname,
      u.memberNumber,
      u.hcp,
      c.clubname AS homeclub
    FROM
      User u
    LEFT JOIN
      Club c ON u.homeclub = c.id
    WHERE
      u.id = ?
      `,
    [userId]
  )
  return rows.length > 0 ? (rows[0] as MinUser) : null
}

export const insertUser = async (
  lastname: string,
  firstname: string,
  memberNumber: number,
  hcp: number,
  email: string,
  homeclub: number
): Promise<boolean> => {
  const promisePool = pool.promise()
  const username = 'FI-' + homeclub.toString() + memberNumber
  const passw = firstname.substring(0, 2) + lastname.substring(0, 2)
  const [rows] = await promisePool.query<ResultSetHeader>(
    `INSERT INTO
      User 
      (lastname,
      firstname,
      username,
      memberNumber,
      hcp,
      homeclub,
      email,
      passw,
      active,
      deleted)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      lastname,
      firstname,
      username,
      memberNumber,
      hcp,
      homeclub,
      email,
      passw,
      1,
      0,
    ]
  )
  return rows.affectedRows != 0
}
