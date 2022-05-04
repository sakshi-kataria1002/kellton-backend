//GET Controller -> this file is used for request and response

//Includes Schema
const ProductsModel = require('../model/post_model')

//Default Response Throughout the Controller
exports.showIndex = (req, res) => {
    res.send("Running Node API")
}

exports.addProducts = (req,res) => {
    const post = new ProductsModel({
        id:req.body.id,
        title:req.body.title,
        routeName:req.body.routeName,
        items:req.body.items
    })
    post.save()
    .then(
        data => {
            res.send(data)
    })
    .catch(error => {res.send(error)})
}