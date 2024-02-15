import { Response, Request, Router, NextFunction } from 'express'
import { getAllCourses, getCourseById } from '../queries/course'
import {
  getAllReservations,
  getAllReservationsForUser,
  getReservationById,
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
        deleted: reservation.deleted,
      })
    } else {
      res.status(404).json({ ok: false })
    }
  } catch (err) {
    next(err)
  }
})

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
        deleted: reservation.deleted,
      })
    }
    res.json(formattedReservations)
  } catch (err) {
    next(err)
  }
})

export default router
