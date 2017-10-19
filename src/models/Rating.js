import {mongoose} from '../foundations/mongodb'
import RatingSchema from './schemas/RatingSchema'

RatingSchema.pre('save', function (next) {
  next()
})

let Post = mongoose.model('ratings', RatingSchema)

export default Post
