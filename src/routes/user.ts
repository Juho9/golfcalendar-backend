import { Response, Request, Router, NextFunction } from 'express'
import {
  getAllMinUsers,
  getAllUsers,
  getUserById,
  getUserByMemberNumber,
  hardDeleteUser,
  insertUser,
  setUserActive,
  setUserInactive,
  softDeleteUser,
  updateUser,
} from '../queries/user'
import { getPermitsForUser } from '../queries/permit'

const router = Router()

//All users
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers()
    const formattedUsers = []
    for (const user of users) {
      const permits = await getPermitsForUser(user.id)
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
        permits: permits,
        deleted: user.deleted,
      })
    }
    res.json(formattedUsers)
  } catch (err) {
    next(err)
  }
})

//User by id
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(Number(req.query.id))
    if (user) {
      const permits = await getPermitsForUser(user.id)
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
        permits: permits,
        deleted: user.deleted,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

//User by membernumber
router.get('/mem', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByMemberNumber(Number(req.query.num))
    if (user) {
      const permits = await getPermitsForUser(user.id)
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
        permits: permits,
        deleted: user.deleted,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

//Minimal users
router.get('/min', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllMinUsers()
    const formattedUsers = []
    for (const user of users) {
      const permits = await getPermitsForUser(user.id)
      formattedUsers.push({
        id: user.id,
        memberNumber: user.memberNumber,
        lastname: user.lastname,
        firstname: user.firstname,
        hcp: user.hcp,
        homeclub: user.homeclub,
        permits: permits,
      })
    }
    res.json(formattedUsers)
  } catch (err) {
    next(err)
  }
})

//Add new user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lastname = req.body.lastname
    const firstname = req.body.firstname
    const memberNumber = req.body.memberNumber
    const hcp = req.body.hcp
    const email = req.body.email
    const homeclub = req.body.homeclub
    const result = await insertUser(
      lastname,
      firstname,
      memberNumber,
      hcp,
      email,
      homeclub
    )
    if (result) {
      const users = await getAllUsers()
      res.json({
        ok: result,
        users: users,
      })
    }
  } catch (err) {
    next(err)
  }
})

//Soft delete user
router.put(
  '/delete',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await softDeleteUser(Number(req.query.id))
      if (result) {
        res.json({
          ok: result,
        })
      } else {
        res.status(404).json({ ok: false })
      }
    } catch (err) {
      next(err)
    }
  }
)

//Hard delete user
router.delete(
  '/deletehard',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await hardDeleteUser(Number(req.query.id))
      if (result) {
        res.json({
          ok: result,
        })
      } else {
        res.status(404).json({ ok: false })
      }
    } catch (err) {
      next(err)
    }
  }
)

//Update user
router.put(
  '/update',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = {
        id: req.body.id as number,
        lastname: req.body.lastname as string,
        firstname: req.body.firstname as string,
        memberNumber: req.body.memberNumber as number,
        hcp: req.body.hcp as number,
        email: req.body.email as string,
        homeclub: req.body.homeclub as number,
      }

      const result = await updateUser(updatedUser)
      if (result) {
        const user = await getUserById(updatedUser.id)
        res.json({
          ok: result,
          user: user,
        })
      }
    } catch (err) {
      next(err)
    }
  }
)

//Update user password
//TODO

//Set user inactive
router.put(
  '/inactive',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await setUserInactive(Number(req.query.id))
      if (result) {
        res.json({
          ok: result,
        })
      } else {
        res.status(404).json({ ok: false })
      }
    } catch (err) {
      next(err)
    }
  }
)

//Set user active
router.put(
  '/active',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await setUserActive(Number(req.query.id))
      if (result) {
        res.json({
          ok: result,
        })
      } else {
        res.status(404).json({ ok: false })
      }
    } catch (err) {
      next(err)
    }
  }
)

export default router
