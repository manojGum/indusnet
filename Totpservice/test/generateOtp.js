let chai = require('chai')
let server = require("../src/server")
let chaiHttp=require('chai-http');
chai.should();

var assert=chai.assert;
var expect = chai.expect;
chai.use(chaiHttp)



describe('.....Aspect check...',function(){
    let userName="manoj kumar";
    let email="manojgum@gmail.com";
    it("check string",function(){
        assert.typeOf(userName,'string');
       
    })
    it("check string",function(){
        assert.typeOf(email,'string')
    })

// generateOtp
describe('POST /api/v16.17.0/otp/generateOTP',()=>{
    // it("It should POST all the requirement",(done)=>{
    //     chai.request(server)
    //     .post("/api/v16.17.0/otp/generateOTP")
    //     .end((err,response)=>{
    //         response.should.have.status(200);
    //         response.body.should.be.a['array'];
    //         response.body.length.should.be.eq(3);
    //         done();
    //     });
    // });

    it("It should POST all the error",(done)=>{
        chai.request(server)
        .post("/api/v16.17.0/otp/generateOTP")
        .end((err,response)=>{
            response.should.have.status(401);
            done();
        });
    });

it("It should POST all the requirement",(done)=>{
        chai.request(server)
        const task={
            userName:"manoj kumar",
            email:"manojgum@gmail.com",
        }
        const  trackId=Math.floor(new Date())
        const timestamp=new Date()
        .post("/api/v16.17.0/otp/generateOTP")
        .send(task)
        .end((err,response)=>{
            response.should.have.status(200)
            response.body.should.be.a(`String`)
            response.body.should.have.property('timestamp').eq(timestamp);
            response.body.should.have.property('TraceID').eq(trackId);
            response.body.should.have.property('Email').qu(email);
            response.body.should.have.property('token');
            response.body.should.have.property('success').eq(true);
            response.body.should.have.property('message');
            response.body.should.have.property('otp');
            done()
        })
    })


})





// otpValidation

})



// describe('.....post check...',function(){

//     it('it post generate otp',function(done){
//         .post('/api/v16.17.0/otp/generateOTP')
//         .send({ userName: 'manoj kumar',  email:'manojgum@gmail.com', })
//         .end((err,response)=>{
//             expect(res).to.have.status(200);
//             done();
//         })
//     })
// })



// var agent = chai.request.agent()
// agent
//   .post('/api/v16.17.0/otp/generateOTP')
//   .send({ username: 'me', password: '123' })
//   .then(function (res) {
//     expect(res).to.have.cookie('sessionid');
//          expect(res).to.have.status(200);
//   });