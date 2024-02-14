import { pool } from '../index'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { Club } from '../interfaces/club.interface'

export const getAllClubs = async (): Promise<Club[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query('SELECT * FROM Club')
  return rows as Club[]
}

export const getClubById = async (clubId: number): Promise<Club | null> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    'SELECT * FROM Club WHERE id = ?',
    [clubId]
  )
  return rows.length > 0 ? (rows[0] as Club) : null
}
