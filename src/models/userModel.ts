import mongoose from 'mongoose';
import Artwork from './artworkModel'
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {type:String, required:true},
  email: {type:String, required:true, lowercase: true, unique: true },
  telephone: {type:String, required:true},
  address: {type:String, required:true},
  password: {
    type:String,
    required:true,
  },
  artworks:{
    type: mongoose.SchemaTypes.ObjectId,
    ref:"Artwork"
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


const User = mongoose.model('User', userSchema)
export default User
