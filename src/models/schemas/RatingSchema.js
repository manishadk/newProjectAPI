import {Schema} from '../../foundations/mongodb'

let RatingSchema = new Schema({
  id: Number,
  movieId: Number,
  ratingValue: Number
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

export default RatingSchema
