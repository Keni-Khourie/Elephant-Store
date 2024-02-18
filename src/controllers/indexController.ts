import { Request, Response, NextFunction } from "express"

const homeImages = [
  {
    title:"Feathery Ears",
    artist:"FreePik",
    image:"https://img.freepik.com/free-photo/elephant-with-feathers-its-head-is-shown_188544-9613.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708041600&semt=ais",
    price: 4000,
    category: "Digital",
    description: "A digital image of an elephant with feathers for ears",
  },
  {
    title:"Abstract Elephant",
    artist:"Trend Gallery",
    image:"https://trendgallery.art/cdn/shop/products/1_d3ec9f66-5b0c-41c1-aef1-de90c223686f.png?v=1628086293",
    price: 5000,
    category: "Digital",
    description: "A multi-coloured painting of an elephant",
  },
  {
    title:"Indian Elephant Art",
    artist:"Adriano Diana",
    image:"https://render.fineartamerica.com/images/rendered/default/print/7.5/8/break/images/artworkimages/medium/2/indian-elephant-adriano-diana.jpg",
    price: 2000,
    category: "Print",
    description: "An intricate multi-couloured Indian-styled print of an elephant",
  },
  {
    title:"Blind Men and the Elephant",
    artist:"Andreask84",
    image:"https://images-platform.99static.com/gB1oysmAQWnzFhr_i3vmOEFs8Y4=/0x0:2000x2000/fit-in/590x590/99designs-contests-attachments/101/101394/attachment_101394795",
    price: 30000,
    category: "Print",
    description: "An Illustration about Blind Men and the Elephant",
  },
  {
    title:"Water Colour Baby",
    artist:"Shallu Narula",
    image:"https://images-workbench.99static.com/eOBP_sIJIoJqR5E_PbvActljLkY=/99designs-contests-attachments/141/141248/attachment_141248248",
    price: 10000,
    category: "Water Colour",
    description: "A water color painting of a baby elephant",
  },
  {
    title:"Walking Elephant",
    artist:"Pixel Oasis Studio",
    image:"https://img.freepik.com/premium-photo/elephant-art-elephant-painting-elephant-walking-artwork_933746-1202.jpg?w=360",
    price: 20000,
    category: "Oil on Canvas",
    description: "A painting of a walking elephant staring deeply at the observer.",
  },
  {
    title:"Oil Elephant",
    artist:"Unique Arts Gallery",
    image:"https://cdn03.plentymarkets.com/0oyf0h0zqec7/item/images/68687/full/g97884-68687.jpg",
    price: 15000,
    category: "Oil on Canvas",
    description: "A 80cm x 80cm oil on canvas painting of an African Elephant",
  }
]


const getHome = (req:Request, res:Response)=>{
    res.render("home", {homeImages}) }


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

