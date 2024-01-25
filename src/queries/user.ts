import { pool } from '../index'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { User } from '../interfaces/user.interface'

export const getAllUsers = async (): Promise<User[]> => {
    const promisePool = pool.promise()
    const [rows] = await promisePool.query('SELECT * FROM User')
    return rows as User[]
  }