import { Response, Request, Router, NextFunction } from 'express'
import {
  getAllClubs,
  getClubById,
  hardDeleteClub,
  insertClub,
  updateClub,
} from '../queries/club'
import { getAllCoursesByClubId } from '../queries/course'

const router = Router()

//All clubs
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubs = await getAllClubs()
    const formattedClubs = []
    for (const club of clubs) {
      const courses = await getAllCoursesByClubId(club.id)
      formattedClubs.push({
        id: club.id,
        clubname: club.clubname,
        nickname: club.nickname,
        courses: courses,
      })
    }
    res.json(formattedClubs)
  } catch (err) {
    next(err)
  }
})

//Club by id
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const club = await getClubById(Number(req.query.id))
    if (club) {
      const courses = await getAllCoursesByClubId(club.id)
      res.json({
        id: club.id,
        clubname: club.clubname,
        nickname: club.nickname,
        courses: courses,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

//Add new club
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubname = req.body.clubname
    const nickname = req.body.nickname
    const result = await insertClub(clubname, nickname)
    if (result) {
      const clubs = await getAllClubs()
      res.json({
        ok: result,
        clubs: clubs,
      })
    }
  } catch (err) {
    next(err)
  }
})

//Update club
router.put(
  '/update',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedClub = {
        id: req.body.id as number,
        clubname: req.body.clubname as string,
        nickname: req.body.nickname as string,
      }

      const result = await updateClub(updatedClub)
      if (result) {
        const club = await getClubById(updatedClub.id)
        res.json({
          ok: result,
          club: club,
        })
      }
    } catch (err) {
      next(err)
    }
  }
)

//Hard delete club
router.delete(
  '/deletehard',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await hardDeleteClub(Number(req.query.id))
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
