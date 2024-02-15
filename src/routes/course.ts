import { Response, Request, Router, NextFunction } from 'express'
import {
  getAllCourses,
  getCourseById,
  hardDeleteCourse,
  insertCourse,
  updateCourse,
} from '../queries/course'

const router = Router()

//All courses
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await getAllCourses()
    const formattedCourses = []
    for (const course of courses) {
      formattedCourses.push({
        id: course.id,
        coursename: course.coursename,
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
        coursename: course.coursename,
        holes: course.holes,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

//Add course
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubId = req.body.clubId
    const coursename = req.body.coursename
    const holes = req.body.holes
    const result = await insertCourse(clubId, coursename, holes)
    if (result) {
      const courses = await getAllCourses()
      res.json({
        ok: result,
        courses: courses,
      })
    }
  } catch (err) {
    next(err)
  }
})

//Update course
router.put(
  '/update',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedCourse = {
        id: req.body.id as number,
        clubId: req.body.clubId as number,
        coursename: req.body.coursename as string,
        holes: req.body.holes as number,
      }

      const result = await updateCourse(updatedCourse)
      if (result) {
        const course = await getCourseById(updatedCourse.id)
        res.json({
          ok: result,
          course: course,
        })
      }
    } catch (err) {
      next(err)
    }
  }
)

//Delete course
router.delete(
  '/deletehard',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await hardDeleteCourse(Number(req.query.id))
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
