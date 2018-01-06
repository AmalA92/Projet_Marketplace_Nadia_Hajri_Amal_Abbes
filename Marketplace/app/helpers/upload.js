var multer = require('multer')
module.exports.diskStorage = () => {

    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)

        }
    })
}

module.exports.storage = () => {
    return multer({
        storage: this.diskStorage()
    })

}

module.exports.images = [{
        name: 'photo_principale'
},
    {
        name: 'photo1'
},
    {
        name: 'photo2'
},
    {
        name: 'photo3'
},
    {
        name: 'photo4'
}]
