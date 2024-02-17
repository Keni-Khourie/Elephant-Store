"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    telephone: { type: String, required: true },
    address: { type: String, required: true },
    password: {
        type: String,
        required: true,
    },
    artworks: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Artwork"
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
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
