import { Response, Request, Router, NextFunction } from 'express'
import { getAllCourses, getCourseById } from '../queries/course'
import {
  getAllReservations,
  getAllReservationsForUser,
  getReservationById,
  insertReservation,
  softDeleteReservaiton,
  updateReservation,
  updateReservationArrivedStatus,
} from '../queries/reservation'
import { getMinUserById, getUserById } from '../queries/user'

const router = Router()

//All reservations
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await getAllReservations()
    const formattedReservations = []
    for (const reservation of reservations) {
      const player = await getMinUserById(reservation.player_id)
      const creator = await getMinUserById(reservation.creator_id)
      formattedReservations.push({
        id: reservation.id,
        course: reservation.coursename,
        player: player,
        creator: creator,
        creationDate: reservation.creationDate,
        startTime: reservation.startTime,
        arrived: reservation.arrived,
        deleted: reservation.deleted,
      })
    }
    res.json(formattedReservations)
  } catch (err) {
    next(err)
  }
})

//Reservation by id
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await getReservationById(Number(req.query.id))
    if (reservation) {
      const player = await getMinUserById(reservation.player_id)
      const creator = await getMinUserById(reservation.creator_id)
      res.json({
        id: reservation.id,
        course: reservation.coursename,
        player: player,
        creator: creator,
        creationDate: reservation.creationDate,
        startTime: reservation.startTime,
        arrived: reservation.arrived,
        deleted: reservation.deleted,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

//Reservations for user
router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await getAllReservationsForUser(Number(req.query.id))
    const formattedReservations = []
    for (const reservation of reservations) {
      const player = await getMinUserById(reservation.player_id)
      const creator = await getMinUserById(reservation.creator_id)
      formattedReservations.push({
        id: reservation.id,
        course: reservation.coursename,
        player: player,
        creator: creator,
        creationDate: reservation.creationDate,
        startTime: reservation.startTime,
        arrived: reservation.arrived,
        deleted: reservation.deleted,
      })
    }
    res.json(formattedReservations)
  } catch (err) {
    next(err)
  }
})

//Add new reservation for user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.body.courseId
    const creatorId = req.body.creatorId
    const playerId = req.body.playerId
    const startTime = req.body.startTime
    const result = await insertReservation(
      courseId,
      creatorId,
      playerId,
      startTime
    )
    if (result) {
      const reservations = await getAllReservations()
      res.json({
        ok: result,
        reservations: reservations,
      })
    }
  } catch (err) {
    next(err)
  }
})

//Update reservation course for user (course, creator, creationDate, startTime)
router.put(
  '/update',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedReservation = {
        id: req.body.id as number,
        courseId: req.body.courseId as number,
        creatorId: req.body.creatorId as number,
        creationDate: new Date(),
        startTime: req.body.startTime as string,
      }

      const result = await updateReservation(updatedReservation)
      if (result) {
        const reservation = await getReservationById(updatedReservation.id)
        res.json({
          ok: result,
          reservation: reservation,
        })
      }
    } catch (err) {
      next(err)
    }
  }
)

//Set user as arrived or not arrived
router.put(
  '/arrived',
  async (req: Request, res: Response, next: NextFunction) => {
    const status = req.body.arrived
    try {
      const result = await updateReservationArrivedStatus(
        Number(req.query.id),
        status
      )
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

//Soft delete reservation
router.put(
  '/delete',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await softDeleteReservaiton(Number(req.query.id))
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
