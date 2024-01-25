import { Response, Request, Router, NextFunction } from 'express'
import { getAllUsers } from '../queries/user';

const router = Router()

//All users
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsers()
      const formattedUsers = []
      for (const user of users) {
        formattedUsers.push({
          id: user.id,
          username: user.username,
          email: user.email,
          memberNumber: user.membernumber,
          hcp: user.hcp,
          deleted: user.deleted,
        })
      }
      res.json(formattedUsers)
    } catch (err) {
      next(err)
    }
  })

export default router