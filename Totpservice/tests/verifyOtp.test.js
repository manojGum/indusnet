const request = require('supertest')
require("dotenv").config();
const api = process.env.ApI_URL;

const app = require('../src/index')

test('Should verify the otp and send successful message', async()=>{

    await request(app).post(`${api}/Otpvalidate`)
    .send({
        email:"manoj.kumar@indusnet.co.in",
        otp:" 233649"
        
    }).expect(400)
})

test('sdd',()=>{

})