// import {expect} from 'chai'
// import supertest from 'supertest'
// import app from '../server'
// import fs from 'fs'

// describe('User Api test', function () {
//   describe('for register', function () {
//     it('returns an array of errors when mandatory fields are not provided', function (done) {
//       supertest(app)
//       .post('/register')
//       .expect(400)
//       .end(function (err, response) {
//         if (err) {
//           done(err)
//         } else if (response) {
//           let res = JSON.parse(JSON.parse(JSON.stringify(response)).text)
//           expect(res).to.be.an('object')
//           expect(res).to.have.property('success', 0)
//           expect(res).to.have.property('error', 1)
//           // expect(res).to.have.property('errorMsg').that.is.an('array').and.to.include('First name not provided', 'Last name not provided', 'Email not provided', 'Password not provided', 'Device Id not provided', 'Profile picture not provided')
//           done()
//         } else {
//           done('Error in login test')
//         }
//       })
//     })

//     it('registers new user with unique phone number', function (done) {
//       let testUser = {
//         firstName: 'test',
//         lastName: 'tester',
//         phone: '123456',
//         password: 'test123'
//       }
//       supertest(app)
//       .post('/register')
//       .field('firstName', testUser.firstName)
//       .field('lastName', testUser.lastName)
//       .field('phone', testUser.phone)
//       .field('password', testUser.password)
//       // .field('moviesWatched', [{'movie'},{'movie2'}])
//       .expect(200)
//       .end(function (err, response) {
//         if (err) {
//           done(err)
//         }
//         let res = JSON.parse(JSON.parse(JSON.stringify(response)).text)
//         expect(res).to.be.an('object')
//         expect(res).to.have.property('success', 1)
//         expect(res).to.have.property('message', 'User registered successfully')
//         expect(res).to.have.property('data').that.is.an('object')
//         expect(res.data).to.have.property('firstName', testUser.firstName)
//         expect(res.data).to.have.property('lastName', testUser.lastName)
//         expect(res.data).to.have.property('email', testUser.email)
//         expect(res.data).to.have.property('password')
//         done()
//       })
//     })
//   })
// })

