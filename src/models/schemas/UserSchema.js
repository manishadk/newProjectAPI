import {Schema} from '../../foundations/mongodb'

let UserSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: {
    type: Number,
    unique: true
  },
  password: String,
  country: String,
  moviesWatched: [{
    movie: {
      type: Schema.ObjectId,
      ref: 'movies',
      default: null
    }
  }],
  moviesRecommended: [{
    movie: {
      type: Schema.ObjectId,
      ref: 'movies',
      default: null
    }
  }],
  dateCreated: {type: Date, default: Date.now}
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

export default UserSchema
