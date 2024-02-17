import { Request, Response, NextFunction } from "express"


const getHome = (req:Request, res:Response)=>{
    res.render("home") }


const getLogin = (req:Request, res:Response)=>{
    //Might want to pass in an object with error messages
    res.render("login.ejs" )
}

const getRegister = (req:Request, res:Response)=>{

    res.render("register.ejs")
  }

const getNotFound = (req:Request, res:Response)=>{
  res.render("404.ejs")
}
 
    export {getHome, getLogin, getRegister, getNotFound}

