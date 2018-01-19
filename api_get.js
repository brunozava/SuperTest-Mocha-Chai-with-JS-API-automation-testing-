
describe('Service: GET /', function () {
    it('deve estar online', function (done) {
        request
            .get('/')
            .expect(200)
            .end(function (err, res) {
                expect(res.body.status).to.eql('Ninja Task API');
                done(err);
            });
    });
});