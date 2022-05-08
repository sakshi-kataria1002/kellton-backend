//GET Model -> is used for database functionality and queries

const mongoose = require('mongoose')

//const Schema = mongoose.Schema

//Setting Schema what king of data type you are sending it over
const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    routeName:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('shop_data', productSchema)