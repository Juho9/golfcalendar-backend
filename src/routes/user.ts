import { Response, Request, Router, NextFunction } from 'express'
import { getAllMinUsers, getAllUsers, getUserById, getUserByMemberNumber } from '../queries/user';
import { Permit } from '../interfaces/permit.interface';

const router = Router()

//All users
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsers()
      const formattedUsers = []
      for (const user of users) {
        formattedUsers.push({
          id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          username: user.username,
          memberNumber: user.memberNumber,
          hcp: user.hcp,
          homeclub: user.homeclub,
          email: user.email,
          active: user.active,
          permits: [user.permit],
          deleted: user.deleted,
        })
      }
      res.json(formattedUsers)
    } catch (err) {
      next(err)
  }
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(Number(req.query.id))
    if (user) {
      res.json({
        id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          username: user.username,
          memberNumber: user.memberNumber,
          hcp: user.hcp,
          homeclub: user.homeclub,
          email: user.email,
          active: user.active,
          deleted: user.deleted,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByMemberNumber(Number(req.query.number))
    if (user) {
      res.json({
        id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          username: user.username,
          memberNumber: user.memberNumber,
          hcp: user.hcp,
          homeclub: user.homeclub,
          email: user.email,
          active: user.active,
          deleted: user.deleted,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/min', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllMinUsers()
    const formattedUsers = []
    for (const user of users) {
      formattedUsers.push({
        id: user.id,
        memberNumber: user.memberNumber,
        lastname: user.lastname,
        firstname: user.firstname,
        hcp: user.hcp,
        homeclub: user.homeclub?.nickname
      })
    }
    res.json(formattedUsers)
  } catch (err) {
    next(err)
}
})

export default router