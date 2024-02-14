import { Response, Request, Router, NextFunction } from 'express'
import { getAllClubs, getClubById } from '../queries/club'
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
        clubname: club.name,
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
      res.json({
        id: club.id,
        clubname: club.name,
        nickname: club.nickname,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

export default router
