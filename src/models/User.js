import {mongoose} from '../foundations/mongodb'
import UserSchema from './schemas/UserSchema'

UserSchema.pre('save', function (next) {
  mongoose.models['users'].findOne({phone: this.phone}, (err, result) => {
    if (err) {
      next(err)
    } else if (result) {
      this.invalidate('phone', 'This phone number is already registered')
      next(new Error('This phone number is already registered'))
    } else {
      next()
    }
  })
})

let User = mongoose.model('users', UserSchema)

export default User
