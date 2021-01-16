const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const nock = require('nock');

chai.use(chaiHttp);

describe( "auth", () => {
    before(() => {
        nock('http://www.chat.com')
            .post('/api/v1/auth/login', {
                email: "test91@gmail.com",
                password: "12345678"
            })
            .reply(200, {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q5MUBnbWFpbC5jb20iLCJpZCI6IlRUaGp3NktUbiIsImlhdCI6MTYwNjA1ODgyOSwiZXhwIjoxNjA2MDk0ODI5fQ.7w4NBeCraemc7Wwb1E2DQs8EVRKZj6oMb1bVpdk7jhI',
                success: true,
                user: {
                    id: "TThjw6KTn",
                    firstName: "test3",
                    lastName: "last",
                    email: "test91@gmail.com"
                }
            })
    });

    describe('POST /login', () => {
        it('should return a user data and token when called', done => {
            let user = {
                email: "test91@gmail.com",
                password: "12345678"
            };
            chai
                .request('http://www.chat.com')
                .post('/api/v1/auth/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.deep.include({
                        success: true,
                        user: {
                            id: "TThjw6KTn",
                            firstName: "test3",
                            lastName: "last",
                            email: "test91@gmail.com"
                        }
                    });
                    expect(res.body.token).to.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
                    done();
                });
        });
    });
});
