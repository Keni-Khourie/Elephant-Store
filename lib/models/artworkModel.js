"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
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
const artworkSchema = new mongoose_2.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: false },
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        // required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => { return Date.now(); },
    },
    updatedAt: {
        type: Date,
        defualt: () => { return Date.now(); }
    }
});
const Artwork = mongoose_1.default.model("Artwork", artworkSchema);
exports.default = Artwork;
