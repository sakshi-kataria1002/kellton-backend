const Joi = require('@hapi/joi')
const authModel = require('../model/auth-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signUp = async (req,res) =>{
    const emailExist = await authModel.findOne({email:req.body.email})

    if(emailExist){
        res.status(400).send('Email already exists')
        return;
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    const hashedConfirmPassword = await bcrypt.hash(req.body.confirmPassword,salt)

    try {
        const registrationSchema = Joi.object({
            displayName: Joi.string().min(3).required(),
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required(),
            confirmPassword: Joi.string().min(8).required()
        })

        const {error} = await registrationSchema.validateAsync(req.body)

        if(error) {
            res.status(400).send(error.details[0].message)
            return;
        }else {
            if(hashedPassword === hashedConfirmPassword){
                const user = new authModel({
                    displayName:req.body.displayName,
                    email:req.body.email,
                    password: hashedPassword,
                    confirmPassword: hashedConfirmPassword
                })
        
                const saveUser = await user.save()
                res.status(200).send("User Created Successfully")
            }else {
                res.send("Password not matching")
            }
        }
    }catch (error) {
        res.status(500).send(error)
    }
}

exports.signIn = async (req,res) =>{
    const user = await authModel.findOne({email:req.body.email})

    if(!user) return res.status(400).send('Please SignUp First')

    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    if(!validatePassword) return res.status(400).send('Incorrect Password')
    
    try {
        const loginSchema = Joi.object({
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required()
        })

        const {error} = await loginSchema.validateAsync(req.body)

        if(error) return res.status(400).send(error.details[0].message)
        else{
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
            
            res.header("auth-token", token).send(token)
            res.send("Logged in successfully")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getAllUsers = async (req,res) => {
    const allUsers = await authModel.find()
    try{
        res.status(200).send(allUsers)
    }catch(error){
        res.status(500).send(error)
    }
}
