var express = require('express'),
    router = express.Router()

// API v1
router.use('/v1', require('./modules/auth/index.js'))
router.use('/v1', require('./modules/user/index.js'))
router.use('/v1', require('./modules/article/index.js'))


router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401)
        return res.json("u got an error and you know why :/ have fun with that");
    }
})
module.exports = router
