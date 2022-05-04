// API Routes -> used for giving url

const express = require('express')
const router = express.Router()
const Controller = require('../controller/controller')

//router.get('/', (req,res) => {
//    res.send("Running Node API")
//})
//Default Route
router.get('/',Controller.showIndex)

router.post('/add-products',Controller.addProducts)

module.exports = router