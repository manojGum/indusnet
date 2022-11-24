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
        .post("/api/v16.17.0/otp/generateOTP")
        .type('form')
        .send({
            userName:"manoj kumar",
            email:"manojgum@gmail.com",
        })
        .end((err,response)=>{
            response.should.have.status(200)
            response.body.should.be.a(`object`)
            response.body.should.have.property('Email').eq(email);
            response.body.should.have.property('token');
            response.body.should.have.property('success').eq(true);
            response.body.should.have.property('message').eq("OTP  successfully  send in your Email, it will expire in 5 minutes");
            response.body.should.have.property('otp');
            response.body.should.have.property("timestamp")
            done()
        });
    });


    it("It should NOT POST a new task without the email propertiy",(done)=>{
        chai.request(server)
        .post("/api/v16.17.0/otp/generateOTP")
        .type('form')
        .send({
            userName:"manoj kumar"
        })
        .end((err,response)=>{
            response.should.have.status(401)
            response.body.should.have.property("message").eq("Email not provided")
            response.body.should.have.property("timestamp")
            response.body.should.have.property("trackId")
            done()
        });
    });


    it("It should  the email propertiy is not proper ",(done)=>{
        chai.request(server)
        .post("/api/v16.17.0/otp/generateOTP")
        .type('form')
        .send({
            userName:"manoj kumar",
            email:"manojgum"
        })
        .end((err,response)=>{
            response.should.have.status(400)
            response.body.should.have.property("message").eq("Enter valid Email")
            response.body.should.have.property("timestamp")
            response.body.should.have.property("trackId")
            done()
        });
    });




});





// otpValidation

})



