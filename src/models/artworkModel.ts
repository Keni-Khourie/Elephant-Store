import mongoose from 'mongoose';
import { Schema, model, connect } from 'mongoose'


// const { Schema } = mongoose;
/*
interface artworkInterface {
  title: string,
  artist: string,
  image: string,
  price: number,
  category: string,
  description: string
}
*/

const artworkSchema = new Schema({
  title: {type:String, required:true},
  artist: {type:String, required:true},
  image: {type:String, required:true},
  price: {type:Number, required:true},
  category: {type:String, required:true},
  description: {type:String, required:false},
  user:{
    type: mongoose.SchemaTypes.ObjectId,
    ref:"User",
    // required: true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: ()=>{return Date.now()},
  },
  updatedAt: {
    type: Date,
    defualt: ()=>{return Date.now()}
  }

});

const Artwork = mongoose.model("Artwork", artworkSchema)
export default Artwork