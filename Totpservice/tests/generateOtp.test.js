const request = require('supertest')
require("dotenv").config();
const api = process.env.ApI_URL;

const app = require('../src/index')

test('Should generate the otp and send otp to the user', async()=>{

    await request(app).post(`${api}/generateotp`)
    .send({
        userName:"manoj kumar",
        email:"manoj.kumar@indusnet.co.in"
    }).expect(201)
})