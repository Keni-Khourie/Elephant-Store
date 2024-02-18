import { Request, Response, NextFunction } from "express"
import Artwork from "../models/artworkModel"


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET ARTWORK
const getAllArtworks = async (req:Request, res: Response)=>{
    const getMessages = {
        missing: `No Artworks Found`,
        failure: `Problem Loading Artwork`
    }

    try {
       const allArtworks = await Artwork.find({})
       res.render("allArtworksPublic.ejs", {allArtworks})
       /* 
       if (allArtworks.length == 0){
       res.render("artistworks.ejs", {getMessages})
       }else{
        res.render("", {allArtworks})
       }
       */
    } catch (error) {
        console.log(error);
    }
}
//getAllArtworks is for the main products page where all artworks by all artists are displayed


const getSpecificArtwork = async (req:Request, res: Response)=>{
    const getSpecificMessages = {
        missing: `Artwork not found`,
        failure: `Problem Loading Artwork`
    }
    const artworkID = req.params.id

    const specificArtwork = await Artwork.findById(artworkID)

    if(!specificArtwork){
        res.status(404).send(`<h1>ARTWORK NOT FOUND </h1>`)
        // res.render('artistart.ejs', {getSpecificMessages})
        throw new Error(`Artwork not found`)
    }
    res.status(200).render("specificArtwork.ejs", {specificArtwork})

}
//getSpecificArtwork could be used by both artist and all users


//GET SPECIFIC ARTWORK FOR THE PUBLIC VIEW: THIS DOES NOT ALLOW FOR DELETION OR UPDATING OF THE IMAGE

const getSpecificArtworkPublic = async (req:Request, res: Response)=>{
    const getSpecificMessages = {
        missing: `Artwork not found`,
        failure: `Problem Loading Artwork`
    }
    const artworkID = req.params.id

    const specificArtwork = await Artwork.findById(artworkID)

    if(!specificArtwork){
        res.status(404).send(`<h1>ARTWORK NOT FOUND </h1>`)
        // res.render('artistart.ejs', {getSpecificMessages})
        throw new Error(`Artwork not found`)
    }
    res.status(200).render("specificArtworkPublic.ejs", {specificArtwork})

}




//INCLUDE A FUNCTUON THAT WILL RETURN ONLY THE ARTWORKS CREATED BY THAT ARTIST

const getUserArtworks = async(req:Request, res:Response)=>{
    const userID = req.params.id //DO NOT USE req.params.id use cookie/sessions/tokens.
    const allUserArtworks = await Artwork.find({user: userID})
    res.status(200).render("dashboard.ejs", {allUserArtworks})
}
//You might need to use cookies/sessions/tokens for this one because if you use req.params.id, the end point would be "/my-art/:id" which should ideally be reserved for each individaul art work. SO the task is to find a way to get the userID without using req.params.id. this is where cookies/sessions/tokens might be needed.

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE ARTWORK

const createArtwork = async (req:Request, res: Response) =>{
    const createMessages = {
        incomplete: `All Fields are Mandatory`,
        existing: `Artwork Already Exists`,
        success: `Artwork Uploaded`,
        failure: `Problem uploading Artwork`
    }
     const userID = req.params.id
     console.log(`THE USER ID IS:`, userID);
    const {title, artist, image, price, category, description} = req.body
    if(!title || !artist || !image || !price|| !category){
       
        res.status(400).send(`<h1>ALL FIELDS MANDATORY</h1>`)
        // res.render("signup", {createError})
        // throw new Error(`All fields are mandatory`)
    }

    //const existingArt = Artwork.findOne({title: title})
    try {
        const newArtwork = await Artwork.create({
            title,
            artist,
            image,
            price,
            category,
            description,
             user: userID
        }) 
        console.log(`New Artwork Created`);
        console.log(newArtwork); 


       //   res.render("artistworks.ejs", {createError})
    } catch (error) {
        console.log(error);
        throw new Error(`Error creating Artwork`)
        
    }

    res.redirect(`/user/dashboard/${userID}`)    
    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE ARTWORK
const updateArtwork = async (req: Request, res:Response)=>{
    const updateMessages ={
        missing: `Artwork not found`,
        success: `Artwork updated`,
        failure: `Problem updating Artwork`
    }

    const artworkID = req.params.id
    const specificArtwork = await Artwork.findById(artworkID)

    if(!specificArtwork){
        res.status(404).send(`<h1>ARTWORK NOT FOUND</h1>`)
        res.redirect(`artist/my-artworks/${artworkID}`)
       // res.render("artistart.ejs", {updateMessages})
       throw new Error(`Artwork not Found`)
    }
    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE ARTWORK
const deleteArtwork = async (req: Request, res: Response) =>{
    const deleteMessages = {
        missing: `Artwork not found`,
        success: `Artwork deleted`,
        failure: `Problem deleting Artwork`
    }

    const artworkID = req.params.id
    const specificArtwork = await Artwork.findById(artworkID)

    if(!specificArtwork){
        res.status(404).send(`<h1>ARTWORK NOT FOUND</h1>`)
       // res.render("artistart.ejs", {deleteMessages})
       throw new Error(`Artwork not Found`)
    }

    try {
        await specificArtwork.deleteOne()
        res.status(200).send(`<h1>ARTWORK DELETED</h1>`)
        res.redirect("/artist/my-artworks/")
        // res.render("artistworks.ejs", {deleteMessages})
        //if deleted, it should redirect to the page with all of the artist's works.
        //alternatively, you could render the page with delete messages
    } catch (error) {
        console.log(error);
    }
    
}



export {
    getAllArtworks,
    getSpecificArtwork,
    getUserArtworks,
    createArtwork,
    updateArtwork,
    deleteArtwork,
    getSpecificArtworkPublic,
}