var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var User = require('../models/user-model');
var Codefile = require('../models/codefile-model');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

// Testing for Users Endpoint
describe('Users: Get', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    after(function(done) {
        User.remove(function() {
            done();
        });
    });
    
     it('should list users on GET', function(done) {
        chai.request(app)
            .get('/users')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(1);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('username');
                res.body[0]._id.should.be.a('string');
                res.body[0].firstName.should.equal('Bob');
                res.body[0].lastName.should.equal('Ross');
                done();
            });
    });
});

describe('Users: Post', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    after(function(done) {
        User.remove(function() {
            done();
        });
    });
    
     it('should add a user on POST', function(done) {
        chai.request(app)
            .post('/users')
            .send({'firstName': 'Jim', 'lastName': 'Morisson', 'email': 'jimmy@morisson.com', 'username': 'jimbo', 'password': 'irock'})
            .end(function(err, res) {
                should.equal(err, null);
                res.body.should.be.a('object');
                done();
            });
    });
    
    it('should GET users, including user just added', function(done) {
        chai.request(app)
            .get('/users')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(2);
                res.body[1].should.be.a('object');
                res.body[1].should.have.property('_id');
                res.body[1].should.have.property('username');
                res.body[1]._id.should.be.a('string');
                res.body[1].firstName.should.equal('Jim');
                res.body[1].lastName.should.equal('Morisson');
                res.body[0].firstName.should.equal('Bob');
                res.body[0].lastName.should.equal('Ross');
                done();
            });
    });
});

// Testing for Codefiles Endpoint
describe('Codefiles: Post', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    after(function(done) {
        User.remove(function() {
            done();
        });
    });

     it('should add a codefile on POST', function(done) {
        chai.request(app)
            .post('/codefiles')
            .send({
                'chosenHeader': {color: "#8E2800", font: {category: "sans-serif", family: "Roboto", forCSS: "Roboto", forLink:"Roboto"}, size: "60px"},
                'chosenParagraph': {font: {category: "serif", family: "Lora", forCSS: "Lora", forLink:"Lora"}, size: "12px"},
                'headerLink': "<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>",
                'paragraphLink': "<link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>",
                'username': 'testuser',
                'projectName': 'Test Project'
            })
            .end(function(err, res) {
                should.equal(err, null);
                res.body.should.be.a('object');
                done();
            });
    });
    
    it('should GET codefiles, including codefile just added', function(done) {
        chai.request(app)
            .get('/codefiles')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(1);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('user');
                res.body[0]._id.should.be.a('string');
                res.body[0].headerLink.should.equal('<link href=\'https://fonts.googleapis.com/css?family=Roboto\' rel=\'stylesheet\' type=\'text/css\'>');
                res.body[0].chosenParagraph.font.family.should.equal('Lora');
                res.body[0].chosenHeader.font.family.should.equal('Roboto');
                done();
            });
    });
});
    
describe('Codefiles: Put', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    after(function(done) {
        User.remove(function() {
            done();
        });
    });
    
    after(function(done) {
        Codefile.remove(function() {
            done();
        });
    });
    
    var codefileList = [];
    it('should get codefiles', function(done) {
    chai.request(app)
    	    .get('/codefiles')
    	    .end(function(err, res) {
    	        should.equal(err, null);
    	        codefileList = res.body;
    	        console.log("id", codefileList[0]._id);
            done();
    	    });
    });
    
    it('should edit a codefile on put', function(done) {
    	var id = codefileList[0]._id;
    	var chosenHeaderFont = {category: "sans-serif", family: "Roboto", forCSS: "Roboto", forLink:"Roboto"};
    	var chosenHeader = {color: "#8E2800", font: chosenHeaderFont , size: "60px"};
    	var chosenParagraphFont = {category: "serif", family: "Lora", forCSS: "Lora", forLink:"Lora"};
    	var chosenParagraph = {font: chosenParagraphFont, size: "14px"};
    	var changedCodefile = {
                        'chosenHeader': chosenHeader,
                        'chosenParagraph': chosenParagraph,
                        'headerLink': "<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>",
                        'paragraphLink': "<link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>",
                        'username': 'testuser',
                        'projectName': 'Test Project'
                        };
    	chai.request(app)
            .put('/codefiles/'+ id)
            .send({'id': id, 'chosenHeader': chosenHeader, 'chosenParagraph': chosenParagraph, 'headerLink': "<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>", 'paragraphLink': "<link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>" })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.be.json;
                 console.log("After changed file", res.body);
                // res.body.should.be.a('object');
                done();
            });
    });

        it('should Get codefiles, including codefile just changed', function(done) {
        chai.request(app)
            .get('/codefiles')
            .end(function(err, res) {
                console.log("After changed file", res.body);
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(1);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('user');
                res.body[0]._id.should.be.a('string');
                res.body[0].headerLink.should.equal('<link href=\'https://fonts.googleapis.com/css?family=Roboto\' rel=\'stylesheet\' type=\'text/css\'>');
                res.body[0].chosenParagraph.font.family.should.equal('Lora');
                res.body[0].chosenParagraph.size.should.equal('14px');
                res.body[0].chosenHeader.font.family.should.equal('Roboto');
                done();
            });
    });

});

