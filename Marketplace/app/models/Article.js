'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate')

var ArticleSchema = new Schema({
    categorie: {
        type: String,
        required: false
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cylindree: {
        type: String,
        required: false
    },
    prix: {
        type: Number,
        required: false
    },
    titre: {
        type: String,
        required: true
    },
    photo_principale: {
        type: String,
        required: false
    },
    photo1: {
        type: String,
        required: false
    },
    photo2: {
        type: String,
        required: false
    },
    photo3: {
        type: String,
        required: false
    },
    photo4: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: true
    },
    tel_masque: {
        type: Boolean,
        default: false,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }

})
ArticleSchema.index({
    '$**': 'text'
});
ArticleSchema.plugin(mongoosePaginate)
ArticleSchema.pre("save", function (next) {
    var date = Date()
    this.updated_at = date
    if (!this.created_at) this.created_at = date

    next()

})


var Article = mongoose.model("Article", ArticleSchema)

module.exports = Article
