import { pool } from '../index'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { Permit } from '../interfaces/permit.interface'

export const getPermitsForUser = async (userId: number): Promise<Permit[]> => {
  const promisePool = pool.promise()
  const [rows] = await promisePool.query<RowDataPacket[]>(
    `SELECT
      p.id AS permit_id,
      p.nickname AS permit_nickname,
      p.isAdmin AS permit_isAdmin
    FROM
      UserPermits up
    LEFT JOIN
      Permit p ON up.permit_id
    WHERE
      up.user_id = ?
    `,
    [userId]
  )
  return rows as Permit[]
}
