import log from 'winston-logger-setup'
import User from '../models/User'
import CollectClass from '../foundations/CollectClass'
import password from '../helpers/passwordModule'
import jwtsign from '../helpers/jwtsign'
exports.collectToRegister = (req, res, next) => {
  // console.log(req.body)
  let collectInstance = new CollectClass()
  collectInstance.setBody([
    'firstName',
    'lastName',
    'phone',
    'country',
    'password'
  ])
  collectInstance.setFiles(['profilePic'])
  collectInstance.setMandatoryFields({
    firstName: 'First name not provided',
    lastName: 'Last name not provided',
    phone: 'Phone number is not provided',
    country: 'Country is not provided',
    password: 'Password not provided'
  })
  collectInstance.collect(req).then((data) => {
    req.userData = data
    next()
  }).catch((err) => {
    next(err)
  })
}

exports.register = (req, res, next) => {
  try {
      // newUser.validateSync()
    password.generate(req.userData.password).then((hash) => {
      req.userData.password = hash
      // console.log(req.userData.email)
      let newUser = new User(req.userData)
      newUser.save((err, data) => {
        if (err) {
          next(err)
        } else {
          req.cdata = {
            success: 1,
            message: 'User is registered successfully ! ',
            data
          }
          next()
        }
      })
    }).catch((e) => {
      throw e
    })
  } catch (err) {
    let error = new Error(err)
    log.error(error, {})
    next(error)
  }
}

exports.list = (req, res, next) => {
  try {
    User.find({}, {password: 0}, (err, data) => {
      if (err) {
        throw err
      } else {
        req.cdata = {
          success: 1,
          message: "Users' retrieved successfully",
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

exports.collectToLogin = (req, res, next) => {
  let collectInstance = new CollectClass()
  collectInstance.setBody(['phone', 'password'])
  collectInstance.setMandatoryFields({
    'phone': 'Phone number not provided',
    'password': 'Password not provided'
  })
  collectInstance.collect(req).then((data) => {
    req.loginData = data
    next()
  }).catch((err) => {
    next(err)
  })
}

exports.authenticate = (req, res, next) => {
  try {
    password.compare(req.loginData, User).then((data) => {
      delete data.password
      jwtsign.generateAccessToken(data).then((accessToken) => {
        jwtsign.generateRefreshToken(data).then((refreshToken) => {
          res.setHeader('authorization', 'Bearer ' + accessToken)
          res.setHeader('refreshtoken', 'Bearer ' + refreshToken)
          req.cdata = {
            success: 1,
            message: 'Login successful'
          }
          next()
        }).catch((e) => {
          throw e
        })
      }).catch((e) => {
        throw e
      })
    }).catch((e) => {
      let error = new Error(e)
      log.error(error, {})
      next(error)
    })
  } catch (err) {
    let error = new Error(err)
    next(error)
  }
}
