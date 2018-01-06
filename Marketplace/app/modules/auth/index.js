var express = require('express'),
    mongoose = require('mongoose'),
    User = require('../../models/User'),
    Article = require('../../models/Article'),
    router = express.Router(),
    config = require('../../config'),
    hat = require('hat'),
    mailer = require('../../helpers/mailer'),
    jwt = require('express-jwt')

var userPassport = require('../user-passport')

var transporter = mailer.create()

var userAuth = jwt({
    secret: config.signString,
    userProperty: 'payload'
})

// Auth API

router.post('/register', async (req, res) => {
    try {
        let test = await User.findOne({
            email: req.body.email
        }).exec()
        if (test)
            return res.status(502).json({
                message: 'Adresse e-mail déjà utilisée.'
            })

        var user = new User(req.body)
        user.setPassword(req.body.password)
        user.confirmed = false
        user.confirm_token = hat()
        user.confirm_exp = new Date()
        user.confirm_exp.setDate(user.confirm_exp.getDate() + 1)
        var mailOptions = mailer.mailOptions(user.email, user.confirm_token, 'confirmation')
        await transporter.sendMail(mailOptions)
        user.save((err) => {
            if (err)
                return res.status(502).json(err)
            res.status(200).json({
                message: 'Merci pour votre inscription ! veuillez consulter votre boîte mail pour confirmer votre inscription.'
            })

        })

    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non merci de nous contacter sur : contact@marketplace.com"
        })
    }
})


router.post('/login', (req, res) => {
    try {
        userPassport.authenticate('user-local', function (err, user, info) {
            var token
            if (err) {
                return res.status(401).json(err)
            }
            // If a user is found
            if (user) {
                token = user.generateJwt()
                return res.status(200).json({
                    "token": token
                })
            } else {
                // If user is not found
                res.status(401).json(info)
            }
        })(req, res)

    } catch (reason) {
        res.status(501).json({
            message: reason.message
        })
    }
})


router.get('/confirm/:token', (req, res) => {
    try {
        User.findOne({
            confirm_token: req.params.token,
            confirmed: false,

        }, (err, user) => {
            if (err)
                res.json(err)
            else {
                var date = new Date()
                if (user && user.confirm_exp >= date) {
                    user.confirmed = true
                    user.save((err) => {
                        if (err)
                            res.json(err)
                        else {
                            res.status(200).json({
                                'message': 'Done'
                            })


                        }
                    })
                } else {
                    res.status(502).json({
                        'message': 'Request error'
                    })


                }
            }
        })


    } catch (reason) {
        res.status(501).json({
            message: reason.message
        })
    }
})
router.get('/resend/:email', (req, res) => {
    try {

        User.findOne({
            email: req.params.email
        }, async (err, user) => {
            if (err)
                return res.json(err)
            var mailOptions = mailer.mailOptions(user.email, user.confirm_token, 'confirmation')
            await transporter.sendMail(mailOptions)
            return res.status(200).json({
                message: 'Veuillez consulter votre boîte mail pour confirmer votre inscription.'
            })



        })

    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci de nous contacter sur : contact@marketplace.com"
        })
    }
})
router.get('/reset/:email', (req, res) => {
    try {
        User.findOne({
            email: req.params.email
        }, async (err, user) => {
            if (err)
                return res.status(502).json(err)
            if (user) {
                user.reset_token = hat()
                user.reset_exp = new Date()
                user.reset_exp.setDate(user.reset_exp.getDate() + 1)
                var mailOptions = mailer.mailOptions(user.email, user.reset_token, 'reset')
                await transporter.sendMail(mailOptions)
                user.save((err) => {
                    if (err)
                        return res.status(502).json(err)
                    return res.status(200).json({
                        message: 'Veuillez consulter votre boîte mail pour réinitialiser votre mot de passe.'
                    })
                })
            } else {
                return res.status(502).json({
                    "message": "veuillez vérifier votre adresse mail"
                })
            }
        })

    } catch (reason) {
        console.log(reason)
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non essayer de nous contacter sur : contact@marketplace.com"
        })
    }
})
router.post('/reset', (req, res) => {
    try {
        User.findOne({
            reset_token: req.body.token
        }, (err, user) => {
            if (err)
                return res.json(err)
            else {
                var date = new Date()
                if (user && user.reset_exp >= date) {
                    user.setPassword(req.body.password)
                    user.reset_token = null
                    user.save((err) => {
                        if (err)
                            return res.json(err)
                        else {
                            return res.status(200).json({
                                'message': 'Votre mot de passe à été réinitialisé avec succès.'
                            })


                        }
                    })
                } else {
                    res.status(502).json({
                        'message': "Votre lien est invalide ou expiré."
                    })
                }
            }
        })


    } catch (reason) {
        res.status(501).json({
            message: "Une erreur est survenue, merci d'essayer ultérieument."
        })
    }
})


router.post('/contact', async (req, res) => {
    try {

        let mailOptions = mailer.contact(req.body)
        let done = await transporter.sendMail(mailOptions)
        if (done) {
            console.log(done)
            return res.status(200).json({
                message: 'Nous avons bien reçu votre demande et vous contacterons le plus rapidement possible.'
            })
        }
    } catch (reason) {
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non essayer de nous contacter sur : contact@marketplace.com"
        })
    }

})

module.exports = router
