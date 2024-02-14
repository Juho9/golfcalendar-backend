import { Response, Request, Router, NextFunction } from 'express'
import { getAllCourses, getCourseById } from '../queries/course'

const router = Router()

//All courses
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await getAllCourses()
    const formattedCourses = []
    for (const course of courses) {
      formattedCourses.push({
        id: course.id,
        coursename: course.name,
        holes: course.holes,
      })
    }
    res.json(formattedCourses)
  } catch (err) {
    next(err)
  }
})

//Course by id
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await getCourseById(Number(req.query.id))
    if (course) {
      res.json({
        id: course.id,
        coursename: course.name,
        holes: course.holes,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

export default router
