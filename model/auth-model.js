const mongoose = require('mongoose')

const authSchema =new mongoose.Schema({
    displayName:{
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    email:{
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    password:{
        type:String,
        required:true,
        min: 8,
        max: 50
    },
    confirmPassword:{
        type:String,
        required:true,
        min: 8,
        max: 50
    }
})

module.exports = mongoose.model('authenticate-data',authSchema)