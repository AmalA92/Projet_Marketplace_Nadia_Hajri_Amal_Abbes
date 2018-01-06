var express = require('express'),
    mongoose = require('mongoose'),
    User = require('../../models/User'),
    Article = require('../../models/Article'),
    router = express.Router(),
    secret = require('../../config').signString,
    jwt = require('express-jwt'),
    upload = require('../../helpers/upload'),
    userPassport = require('../user-passport'),
    paginator = require('../../helpers/paginator'),
    queryCreator = require('../../helpers/filters').searchQuery

var userAuth = jwt({
    secret: secret,
    userProperty: 'payload'
})

var uploader = upload.storage(),
    images = upload.images


// Articles API



router.get('/articles/:page', async (req, res) => {
    try {
        let articles = await Article.find({}).populate('_user').exec()
        articles = paginator.paginate(articles, 10, req.params.page)

        return res.status(200).json(articles)
    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})

//by categorie
router.get('/articles/categories/:categorie/:page', async (req, res) => {
    try {

        let articles = await Article.find({
            categorie: req.params.categorie,
        }).populate('_user').exec()
        articles = paginator.paginate(articles, 10, req.params.page)

        return res.status(200).json(articles)
    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})
//by state (ville)
router.get('/articles/villes/:ville/:page', async (req, res) => {
    try {
        let articles = await Article.find({
            ville: req.params.ville,
        }).populate('_user').exec()
        articles = paginator.paginate(articles, 10, req.params.page)

        return res.status(200).json(articles)

    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})

router.get('/articles/boutiques/:boutique/:page', async (req, res) => {
    try {
        let articles = await Article.find({
            deposeur: req.params.boutique,
        }).populate('_user').exec()
        articles = paginator.paginate(articles, 10, req.params.page)

        return res.status(200).json(articles)

    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})

router.post('/articles', userAuth, uploader.fields(images), async (req, res) => {
    try {
        let article = new Article(req.body)
        article.photo_principale = req.files && req.files.photo_principale && req.files.photo_principale[0] && req.files.photo_principale[0].filename || article.photo_principale
        article.photo1 = req.files && req.files.photo1 && req.files.photo1[0] && req.files.photo1[0].filename || article.photo1
        article.photo2 = req.files && req.files.photo2 && req.files.photo2[0] && req.files.photo2[0].filename || article.photo2
        article.photo3 = req.files && req.files.photo3 && req.files.photo3[0] && req.files.photo3[0].filename || article.photo3
        article.photo4 = req.files && req.files.photo4 && req.files.photo4[0] && req.files.photo4[0].filename || article.photo4
		article._user = req.payload._id
        await article.save()
        return res.status(200).json({
            'message': 'Article a été ajouté avec succès',
			'article' : article
        })

    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})
router.get('/articles/single/:id', async (req, res) => {
    try {
        let article = await Article.findOne({
            _id: req.params.id
        }).populate('_user').exec()
        return res.status(200).json(article)

    } catch (reason) {
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})
router.put('/articles/:id', userAuth, uploader.fields(images), async (req, res) => {
    try {
        let article = await Article.findOne({
            _id: req.params.id,
            _user: req.payload._id
        }).exec()
        Object.assign(article, req.body)
        article.photo_principale = req.files && req.files.photo_principale && req.files.photo_principale[0] && req.files.photo_principale[0].filename || article.photo_principale
        article.photo1 = req.files && req.files.photo1 && req.files.photo1[0] && req.files.photo1[0].filename || article.photo1
        article.photo2 = req.files && req.files.photo2 && req.files.photo2[0] && req.files.photo2[0].filename || article.photo2
        article.photo3 = req.files && req.files.photo3 && req.files.photo3[0] && req.files.photo3[0].filename || article.photo3
        article.photo4 = req.files && req.files.photo4 && req.files.photo4[0] && req.files.photo4[0].filename || article.photo4
        await article.save()
        res.status(200).json({
            'message': 'Article a été modifié avec succès !'
        })

    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})
router.delete('/articles/:id', userAuth, async (req, res) => {
    try {

        let article = await Article.findOneAndRemove({
            _id: req.params.id,
            _user: req.payload._id
        }).exec()
        return res.status(200).json({
            'message': 'Votre Article a été supprimé avec succès !'
        })
    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})

router.post('/articles/search', async (req, res) => {
    try {
        let query = queryCreator(req.body)
        let articles = await Article.find(query).populate('_user').exec()
        articles = paginator.paginate(articles, 10, req.body.page)
        return res.status(200).json(articles)

    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})


module.exports = router
