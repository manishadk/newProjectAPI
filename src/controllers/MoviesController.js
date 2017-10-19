import log from 'winston-logger-setup'
import Movies from '../models/Movie'
import CollectClass from '../foundations/CollectClass'

exports.collectToRetrieve = (req, res, next) => {
  console.log(req.category)
  console.log('here')
  let collectInstance = new CollectClass()
  collectInstance.setParams([
    'category'
  ])
  collectInstance.setMandatoryFields({
    category: 'Category not provided'
  })
  collectInstance.collect(req).then((data) => {
    req.postData = data
    next()
  }).catch((err) => {
    next(err)
  })
}

exports.getMovies = (req, res, next) => {
  try {
    Movies.find({
      category: { $in: req.postData.category }
   // category: req.postData.category
    })
    .exec((err, data) => {
      if (err || !data || data.length === 0) {
        log.error(err, {})
        next(err || new Error('No movie available in this category'))
      } else {
        req.cdata = {
          success: 1,
          message: 'Movie(s) retrieved successfully',
          data
        }
        next()
      }
    })
  } catch (err) {
    let error = new Error(err)
    log.error(error, {})
    next(error)
  }
}
