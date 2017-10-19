import {mongoose} from '../foundations/mongodb'
import MovieSchema from './schemas/MoviesSchema'

MovieSchema.pre('save', function (next) {
  next()
})

let Location = mongoose.model('movies', MovieSchema)

export default Location
