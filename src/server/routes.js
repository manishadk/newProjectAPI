import express from 'express'
import UC from '../controllers/UserController'
import MC from '../controllers/MoviesController'
import RC from '../controllers/RatingController'
import mw from '../middlewares/response'

let router = express.Router()

router.post('/register', UC.collectToRegister, UC.register, mw.respond, mw.error)
router.post('/login', UC.collectToLogin, UC.authenticate, mw.respond, mw.error)
router.get('/user/list', UC.list, mw.respond, mw.error)

router.get('/movies/:category', MC.collectToRetrieve, MC.getMovies, mw.respond, mw.error)

router.post('/movies/:category/rating', RC.collectToInsert, RC.insertRating, mw.respond, mw.error)

router.all('/*', (req, res, next) => {
  res.status(400).json({
    success: 0,
    error: 1,
    error_msg: 'Unavailable route'
  })
})

export default router
