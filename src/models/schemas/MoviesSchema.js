// import {Schema} from '../../foundations/mongodb'

// let LocationSchema = new Schema({
//   country: String,
//   zip: Number,
//   state: String,
//   nearestBiggestCity: String,
//   city: String,
//   lat: Number,
//   long: Number,
//   streetAddress: String,
//   placeId: String
// }, {
//   toObject: {
//     virtuals: true
//   },
//   toJSON: {
//     virtuals: true
//   }
// })

// export default LocationSchema

import {Schema} from '../../foundations/mongodb'

let MoviesSchema = new Schema({
  movieId: Number,
  name: String,
  showDate: Date,
  contentType: String,
  category: [String],
  banners: [String],
  videoId: String,
  trailerVideoId: String,
  actors: [String],
  producers: [String],
  directors: [String],
  music: [String],
  movieDescription: String,
  movieDuration: Number,
  price: Number,
  rating: Number
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

export default MoviesSchema
