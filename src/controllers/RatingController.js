import log from 'winston-logger-setup'
import Rating from '../models/Rating'
import Movies from '../models/Movie'
import CollectClass from '../foundations/CollectClass'

exports.collectToInsert = (req, res, next) => {
  let collectInstance = new CollectClass()
  collectInstance.setBody([
    'movieId',
    'ratingValue'
  ])
  collectInstance.setMandatoryFields({
    movieId: 'Movie id not provided',
    ratingValue: 'Rating value is not provided'
  })
  collectInstance.collect(req).then((data) => {
    req.postData = data
    next()
  }).catch((err) => {
    next(err)
  })
}

exports.insertRating = (req, res, next) => {
  try {
    Movies.findOne({category: req.params.category}, (err, category) => {
      if (err) {
        log.error(err, {})
        next(new Error('No such movie category'))
      } else if (category) {
        Movies.findOne({
          movieId: req.postData.movieId
        }, (err, movie) => {
          if (movie) {
            let newRating = new Rating(req.postData)
            newRating.save((err, data) => {
              if (err || !data) {
                log.error(err, {})
                next(err || new Error('Ratings not Saved'))
              } else {
                req.cdata = {
                  success: 1,
                  message: 'Rating saved successfully',
                  data
                }
                next()
              }
            })
          } else if (err) {
            log.error(err, {})
            next(err || new Error('No movie available in this category'))
          } else {
            next(new Error('No movie available in this category'))
          }
        })
      } else {
        next(new Error('Category not found'))
      }
    })
  } catch (err) {
    let error = new Error(err)
    log.error(error, {})
    next(error)
  }
}
