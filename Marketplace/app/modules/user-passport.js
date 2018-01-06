var passport = require('passport'),
    User = require('../models/User'),
    LocalStrategy = require('passport-local').Strategy


passport.use('user-local', new LocalStrategy({
        usernameField: 'email'
    },
    function (email, password, done) {
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) {
                return done(err)
            }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'veuillez vérifier votre adresse mail'
                })
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'veuillez vérifier votre mot de passe'
                })
            }
            if (!user.confirmed) {
                return done(null, false, {
                    message: "veuillez consulter votre boîte mail pour confirmer votre inscription ! Si vous n'avez pas reçu l'email de confirmation, vous pouvez essayez de le faire envoyer.",
                    resend: true

                })
            }

            // If credentials are correct, return the user object
            return done(null, user)
        })
    }
))

module.exports = passport
