
describe('Service: POST /users', function () {

    let userRequest;

    describe('status 200', function () {
        before(function (done) {

            userRequest = {
                name: "Fernando",
                email: "fernando@qaninja.io",
                password: "191817"
            }

            request
                .delete('/delorean/' + userRequest.email)
                .end(function (err, res) {
                    done(err);
                });
        })

        it('cadastrar novo usuário', function (done) {
            request
                .post('/users')
                .send(userRequest)
                .end(function (err, res) {
                    expect(res.statusCode).to.eql(200);
                    expect(res.body.name).to.eql(userRequest.name);
                    expect(res.body.email).to.eql(userRequest.email);
                    done(err);
                });
        });
    })

    describe('status 409', function () {

        before(function (done) {

            userRequest = {
                name: "Tony Stark",
                email: "tony@stark.com",
                password: "191817"
            }

            request
                .delete('/delorean/' + userRequest.email)
                .end(function (err, res) {
                    request
                        .post('/users')
                        .send(userRequest)
                        .end(function (err, res) {
                            expect(res.statusCode).to.eql(200);
                            done(err);
                        });
                });
        });

        it('usuário ja está cadastrado', function (done) {
            request
                .post('/users')
                .send(userRequest)
                .end(function (err, res) {
                    expect(res.statusCode).to.eql(409);
                    expect(res.body.msg).to.eql("Oops. Looks like you already have an account with this email address.");
                    done(err);
                });
        });
    });

    describe('status 412', function () {
        it('Email invalido', function(done){
        userRequest = {
            name: "email invalido",
            email: "emailinvalido",
            password: "191817"
        }
        request
            .post('/users')
            .send(userRequest)
            .end(function(err, res) {
                expect(res.statusCode).to.eql(412);
                expect(res.body.msg).to.eql("Oops. The email you entered is invalid.")
                done(err);
            });
        });

        it('Campo nome não preenchido', function() {
            userRequest = {
                name: "",
                email: "teste@teste.com",
                password: "123456"
            }
            request
                .post('/users')
                .send(userRequest)
                .end(function(err, res) {
                    expect(res.code).to.eql(412);
                    expect(res.body.msg).to.eql("Validation notEmpty failed")
                    done(err);
                });

        });

        it('Campo email não preenchido', function() {
            userRequest = {
                name: "TesteZava",
                email: "",
                password: "123456"
            }
            request
                .post('/users')
                .send(userRequest)
                .end(function(err, res) {
                    expect(res.code).to.eql(412);
                    expect(res.body.msg).to.eql("Validation notEmpty failed")
                    done(err);
                });

        });

        it('Campo senha não preenchido', function() {
            userRequest = {
                name: "TesteZava",
                email: "abc@fff.com",
                password: ""
            }
            request
                .post('/users')
                .send(userRequest)
                .end(function(err, res) {
                    expect(res.code).to.eql(412);
                    expect(res.body.msg).to.eql("Validation notEmpty failed")
                    done(err);
                });

        });
    });


});