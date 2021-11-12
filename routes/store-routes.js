const express = require('express')
const router = express.Router()
const {getAllProducts} = require('../controllers/store-controllers')

router.route('/').get(getAllProducts)



module.exports = router