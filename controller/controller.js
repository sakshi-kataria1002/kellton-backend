//GET Controller -> this file is used for request and response

//Includes Schema
const ProductsModel = require('../model/product_model')

//Default Response Throughout the Controller
exports.showIndex = (req, res) => {
    res.send("Running Node API")
}

exports.addProducts = (req,res) => {
    const product = new ProductsModel({
        id:req.body.id,
        title:req.body.title,
        routeName:req.body.routeName,
        items:req.body.items
    })
    product.save()
    .then(
        data => {
            res.send(data)
    })
    .catch(error => {res.send(error)})
}

exports.showProducts = (req,res) => {
    ProductsModel.find() //fetch all the
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        res.send(400).send(error)
    })
}

exports.getCategoryItems = (req,res) => {
    ProductsModel.findById(req.params.id)
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        res.send(error)
    })
}

exports.updateCategory = (req,res) => {
    ProductsModel.findById(req.params.id, (error, category) => {
        if(error)
        res.send(error)
        category.title = req.body.title ? req.body.title: category.title
        category.routeName = req.body.routeName ? req.body.routeName: category.routeName

        category.save((error) => {
            if(error)
            res.send(error)   
            res.json({
                message: "Category Updated Successfully",
                data: category
            })
        })
    })   
}

exports.deleteCategory = (req,res) => {
    ProductsModel.deleteOne({
        _id:req.params.id
    }, (error) => {
        if(error)
        res.send(error)

        res.json({
            status:"Success",
            message:`Successfully deleted the category with ID: ${req.params.id}`
        })
    })
}

//Another Method to delete category
//exports.deleteCategory = (req,res) => {
//ProductsModel.findById(req.params.id, (error, category) => {
//    if(error)
//    res.send(error)

//    category.remove( {
//        _id:req.params.id
//    }, (error) => {
//        if(error)
//        res.send(error)

//            res.json({
//                status: "Success",
//                message:"Categoty"
//            })
//        })
//    })
//}