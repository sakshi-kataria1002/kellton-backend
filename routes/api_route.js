// API Routes -> used for giving url

const express = require('express')
const router = express.Router()
const Controller = require('../controller/controller')
const cors = require('cors')

//router.get('/', (req,res) => {
//    res.send("Running Node API")
//})
// Default Route
router.get('/', Controller.showIndex)

// Add Products
router.post('/add-products', Controller.addProducts)

// Get All Category Products
router.get('/get-products',cors(), Controller.showProducts)

// Get Single Category Product
router.get('/get-category/:id', Controller.getCategoryItems)

// Update Single Category Product
router.put('/update-category/:id', Controller.updateCategory)

// Delete Single Category
router.delete('/delete-category/:id', Controller.deleteCategory)

module.exports = router
