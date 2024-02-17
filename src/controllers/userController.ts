import { Request, Response, NextFunction } from "express"
import User from "../models/userModel"
import Artwork from "../models/artworkModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import {createNewArtist} from "./artistController"
// import {createNewCollector} from "./collectorContoller"
// import {createNewDualUser} from "./dualUserController"




////////////////////////////////////////////////////////////////////////////////////////////////
//CREATING USER
const createUser = async(req:Request, res:Response) =>{
const createUserMessages = {
        missing: `All Fields are Required`,
        existing: `User Already exists`,
        success: `User created`,
        failure: `Problem creating User`
}

const {fullName, email, telephone, address, password, confirmPassword} = req.body

if(!fullName|| !email|| !telephone|| !address|| !password|| !confirmPassword){
    res.status(400).send(`<h1>ALL FIELDS ARE MANDATORY</h1>`)
   // res.render("register.ejs", {createUserMessages})
   throw new Error(`All Fields are Mandatory`)
}

const existingUser = await User.findOne({email: email})
if(existingUser){
    res.status(400).send(`<h1>USER ALREADY EXISTS</h1>`)
    // res.render("register2", {createUserMessages, value:`existing`})
   //  throw new Error(`User Already exists`)
}

if(! password === confirmPassword){
    res.status(400).send(`<h1>PASSWORDS DO NOT MATCH</h1>`)
    // res.render("register", {createUserMessages})
    throw new Error(`Passwords do not match`)
}


// const salt = await bcrypt.genSalt(10)
const hashedpassword = await bcrypt.hash(password, 10)




//INSERT VALIDATION FOR EMAIL(SEND VERIFICATION) AND TELEPHONE(SEND OTP)


try {
    const newUser = await User.create({
        fullName,
        email,
        telephone, 
        address,  
        password: hashedpassword
    })
      newUser.save() 
} catch (error) {
    res.status(400).send(`<h1>USER NOT ADDED</h1>`)
    console.log(error);
    throw new Error(`User not added`)
}
res.redirect("/login")
}


////////////////////////////////////////////////////////////////////////////////////////////////
//LOGIN USER
const loginUser = async(req:Request, res:Response) =>{
    const loginMessages = {
        incomplete: `Email and Password required`,
        missing: `User not found`,
        incorrect: `Incorrect Password`,
        success: `Login in successful`,
        failure: `Problem logging in`
    }
    const email = req.body.email
    const password = req.body.password
    
    if(!email || !password){
        res.status(400).send(`<h1>Email and password required</h1>`)
        //res.render("login", {loginMessages, value: `incomplete`})
        throw new Error (`Both email and password are required`)
    }

    const existingUser = await User.findOne({email: email})
    if(!existingUser){
        res.status(400).send(`<h1>User not found</h1>`)
        // res.render("login", {loginMessages, value: `missing`})
        throw new Error (`User not found`)
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password )

    if(passwordMatch){
        
        /*
       const token = jwt.sign(existingUser, "elephantSecret")
       // res.header('x-auth-token', token)
       console.log(token);
       
       res.header('x-auth-token', token).redirect("/user/dashboard")
       */
       res.redirect(`/user/dashboard/${existingUser._id}`)

       
    } else{
       res.status(400).send(`<h1>INCORRECT PASSWORD</h1>`)
         // res.render("login", {loginMessages, value: `incorrect`},)
        throw new Error (`Incorrect password`)
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////
//DELETING USER
const deleteUser = async(req:Request, res:Response)=>{
    const deleteUserMessages = {
        missing: `User does not exist`,
        
    }


}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTING DASHBOARD
const getDashboard = async (req:Request, res:Response)=>{
    const userID = req.params.id
    const specificUser =  await User.findById(userID)
    if(!specificUser){
        res.status(400).redirect("/error")
    }
    const allUserArtworks = await Artwork.find({user: userID})

    res.render("dashboard.ejs", {specificUser, allUserArtworks})
  }
export {
    createUser, deleteUser, loginUser, getDashboard
}