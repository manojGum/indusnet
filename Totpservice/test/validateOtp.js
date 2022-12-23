let chai = require("chai");
let server = require("../src/server");
let chaiHttp = require("chai-http");
chai.should();

var assert = chai.assert;
var expect = chai.expect;
chai.use(chaiHttp);

describe(".....Aspect check...", function () {
  let userName = "manoj kumar";
  let email = "manojgum@gmail.com";
  it("check string", function () {
    assert.typeOf(userName, "string");
  });
  it("check string", function () {
    assert.typeOf(email, "string");
  });

  // generateOtp
  describe("POST /api/v16.17.0/otp/OtpValidate", () => {
    it("It should POST all the error", (done) => {
      chai
        .request(server)
        .post("/api/v16.17.0/otp/OtpValidate")
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it("It should NOT POST a new task without the Token", (done) => {
      chai
        .request(server)
        .post("/api/v16.17.0/otp/OtpValidate")
        .type("form")
        .send({
          userName: "manoj kumar",
          email: "manojgum@gmail.com",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have
            .property("message")
            .eq("Authorization token not found or incorrect");
          done();
        });
    });

    it("When jwttoken undefined then ", (done) => {
      chai
        .request(server)
        .post("/api/v16.17.0/otp/OtpValidate")
        .type("form")
        .send({
          userName: "manoj kumar",
          email: "manojgum@gmail.com",
          jwttoken: "undefined",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have
            .property("message")
            .eq("Authorization token not found or incorrect");
          done();
        });
    });

    it("It should NOT POST a new task without the email propertiy", (done) => {
      chai
        .request(server)
        .post("/api/v16.17.0/otp/OtpValidate")
        .type("form")
        .send({
          userName: "manoj kumar",
          token: "1235dfdsjflksjdflksjafj.123654712365",
        })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it(" without otp ", (done) => {
      chai
        .request(server)
        .post("/api/v16.17.0/otp/OtpValidate")
        .type("form")
        .send({
          userName: "manoj kumar",
          email: "manojgum@gmail.com",
          jwttoken: "1235dfds jflksjd flksj afj",
        })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("Otp less then 6 digits ", (done) => {
      chai
        .request(server)
        .post("/api/v16.17.0/otp/OtpValidate")
        .auth("jwttoken")
        .type("form")
        .send({
          email: "manojgum@gmail.com",
          jwttoken:
            "be4a2e429c5f14cd1b4f77818f9649f3a74f70be23bf2539d3a61a63f97c2fd8.1669353306765",
          otp: "12345",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.should.have
            .property("message")
            .eq("Enter 6 digit verification code");
          done();
        });
    });

    it(" Email not proper  ", (done) => {
      chai
        .request(server)
        .post("/api/v16.17.0/otp/OtpValidate")
        .type("form")
        .send({
          jwttoken: "1235dfdsjflksjdflksjafj",
          email: "manojgum@.com",
          otp: "123456",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property("message");
          done();
        });
    });

    it(" It should be all viled property avilable  ", (done) => {
      chai
        .request(server)
        .post("/api/v16.17.0/otp/OtpValidate")
        .type("form")
        .auth("jwttoken")
        .send({
          email: "manojgum@gmail.com",
          jwttoken:
            "be4a2e429c5f14cd1b4f77818f9649f3a74f70be23bf2539d3a61a63f97c2fd8.1669353306765",
          otp: "123456",
          token: "1235dfdsjflksjdflksjafj.1254568545898",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a(`object`);
          response.body.should.have
            .property("message")
            .eq("successfully Login");
          done();
        });
    });
  });
});
