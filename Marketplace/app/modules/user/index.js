var express = require('express'),
    mongoose = require('mongoose'),
    User = require('../../models/User'),
    router = express.Router(),
    config = require('../../config'),
    jwt = require('express-jwt')

var userAuth = jwt({
    secret: config.signString,
    userProperty: 'payload'
})

// Users API
router.get('/users', async (req, res) => {
    try {
        let filter = {
            password: 0,
            salt: 0,
            confirm_token: 0,
            reset_token: 0,
            reset_exp: 0,
            confirm_exp: 0,
            created_at: 0,
            updated_at: 0,
            confirmed: 0
        }
        let users = await User.find({
            type: 'vendeur'
        }, filter).exec()
        return res.json(users)

    } catch (reason) {
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non essayer de nous contacter sur : contact@marketplace.com"
        })
    }
})



router.get('/users/single/:id', userAuth, async (req, res) => {
    try {
        let filter = {
            password: 0,
            salt: 0,
            confirm_token: 0,
            reset_token: 0,
            reset_exp: 0,
            confirm_exp: 0,
            created_at: 0,
            updated_at: 0,
            confirmed: 0
        }
        let user = await User.findById(req.params.id, filter).exec()
        if (user) {
            return res.json(user)
        } else {
            return res.status(502).json({
                message: 'Request error'
            })

        }
    } catch (reason) {
        res.status(502).json({
            "message": "Une erreur est survenue. Merci d'essayer à nouveau ultérieurement , si non essayer de nous contacter sur : contact@marketplace.com"
        })
    }
})

router.put('/users/:id', userAuth, async (req, res) => {
    try {
        let filter = {
            password: 0,
            salt: 0,
            confirm_token: 0,
            reset_token: 0,
            reset_exp: 0,
            confirm_exp: 0,
            created_at: 0,
            updated_at: 0,
            confirmed: 0
        }
        let user = await User.findById(req.params.id).exec()
        console.log(user)
        if (user) {
            Object.assign(user, req.body)
            if (req.body.password)
                user.setPassword(req.body.password)
            let done = await user.save()
            if (done) {
                let user = await User.findById(req.params.id, filter).exec()
                return res.status(201).json({
                    message: 'Vos informations ont été mises à jour avec succès',
                    data: user
                })
            } else {
                return res.status(502).json({
                    message: 'veuillez vérifier votre données.'
                })
            }
        } else {
            return res.status(502).json({
                message: 'Request error'
            })
        }
    } catch (reason) {
        console.log(reason)
        res.status(502).json(reason)
    }
})


module.exports = router
