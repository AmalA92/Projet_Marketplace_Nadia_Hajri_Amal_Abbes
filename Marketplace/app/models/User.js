'use strict'


var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema,
    signString = require('../config').signString,
    mongoosePaginate = require('mongoose-paginate')


var UserSchema = new Schema({
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    genre: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    boutique: {
        type: String
    },
    rebrique: {
        type: String
    },
    telephone: {
        type: String
    },
    adresse: {
        type: String
    },
    ville: {
        type: String
    },
    code_postal: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirm_token: {
        type: String,
        required: false
    },

    confirm_exp: {
        type: Date,
        required: false
    },
    reset_token: {
        type: String,
        required: false
    },
    reset_exp: {
        type: Date,
        required: false
    },
    created_at: Date,
    updated_at: Date
})

UserSchema.plugin(mongoosePaginate)
UserSchema.methods.setPassword = function (password) {
    let user = this
    user.salt = crypto.randomBytes(16).toString('hex')
    user.password = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha1').toString('hex')
}
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex')
    return this.password === hash
}
UserSchema.methods.generateJwt = function () {
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 7) // token expire after 7 days
    return jwt.sign({
        _id: this._id,
        email: this.email,
        type: this.type,
        exp: parseInt(expiry.getTime() / 1000),
    }, signString)
}

UserSchema.pre("save", function (next) {
    var date = Date()
    this.updated_at = date
    if (!this.created_at) this.created_at = date

    next()

})


var User = mongoose.model("User", UserSchema)

module.exports = User
