var request = require("supertest")
var should = require("should")
var app = require('../index')



var acheteur = {
    email: 'acheteur@gmail.com',
    type: 'acheteur',
    password: '123456'
}
var vendeur = {
    email: 'vendeur@gmail.com',
    type: 'vendeur',
    password: '123456',
    nom: 'test',
    prenom: 'tester',
    boutique: 'boutiqueTEST',
    rebrique: 'VACANCES',
    adresse: 'adresse test 123',
    ville: 'Tunis',
    code_postale: '2345',
    telephone: '12345678'

}
var acheteurUser = {
    email: 'abees.amal@gmail.com',
    password: '123456'
}
var vendeurUser = {
    email: 'nadia.hajri93@gmail.com',
    password: '123456'
}

var article = {
	categorie : 'Informatique',
	titre: 'Article unit test',
	description : 'test unit test',
	prix : 400,
	ville : 'Tunis',
	email : 'nadia.hajri93@gmail.com',
	adresse : 'unit test adresse',
	tel_masque : false,
	telephone : 21345678
}
var editedArticle = {
	
	categorie : 'Informatique',
	titre: 'PC Portable VEGABOOK 10 Quad Core 2Go 32 Go - Gold',
	description : 'EDITED unit test',
	prix : 400,
	ville : 'Tunis',
	email : 'nadia.hajri93@gmail.com',
	adresse : 'unit test adresse',
	tel_masque : false,
	telephone : 21345678
}

var acheteurToken, vendeurToken, articleId


describe("User APIs test", function () {
    
        it("should create new user (Acheteur)", function (done) {
            this.timeout(15000)
            request(app)
                .post('/api/v1/register')
                .send(acheteur)
                .end(function (err, res) {
                    res.status.should.equal(200)
                    done()
                })
        })
        it("should create new user (Vendeur)", function (done) {
            this.timeout(15000)
            request(app)
                .post('/api/v1/register')
                .send(vendeur)
                .end(function (err, res) {
                    res.status.should.equal(200)
                    done()
                })
        })


    it("should login (Vendeur)", function (done) {
        this.timeout(15000)
        request(app)
            .post('/api/v1/login')
            .send(vendeurUser)
            .end(function (err, res) {
                res.status.should.equal(200)
                vendeurToken = res.body.token
                var payload = vendeurToken.split('.')[1]
                done()
            })
    })
    it("should login (Acheteur)", function (done) {
        this.timeout(15000)
        request(app)
            .post('/api/v1/login')
            .send(acheteurUser)
            .end(function (err, res) {
                res.status.should.equal(200)
                acheteurToken = res.body.token
                done()
            })
    })


})

describe("Article APIs test", function () {

    it("should create new article", function (done) {
        request(app)
            .post('/api/v1/articles')
            .set('Authorization', 'bearer ' + vendeurToken)
            .send(article)
            .end(function (err, res) {
                res.status.should.equal(200)
                console.log(res.body.message)
                articleId = res.body.article._id
                console.log(articleId)
                done()
            })
    })
    it("should get all articles", function (done) {
        request(app)
            .get('/api/v1/articles/1')
            .end(function (err, res) {
                res.status.should.equal(200)
                console.log(res.body)
                done()
            })
    })

    it("should edit an article", function (done) {
        request(app)
            .put('/api/v1/articles/' + articleId)
            .set('Authorization', 'bearer ' + vendeurToken)
            .send(editedArticle)
            .end(function (err, res) {
                res.status.should.equal(200)
                console.log(res.body.message)
                done()
            })
    })

    it("should delete the created article", function (done) {
        request(app)
            .delete('/api/v1/articles/' + articleId)
            .set('Authorization', 'bearer ' + vendeurToken)
            .end(function (err, res) {
                res.status.should.equal(200)
                console.log(res.body.message)
                done()
            })
    })


})
