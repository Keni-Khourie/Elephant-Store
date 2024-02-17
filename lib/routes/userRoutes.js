"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const artworkController_1 = require("../controllers/artworkController");
const router = express_1.default.Router();
router.get("/dashboard/:id", userController_1.getDashboard);
router.post("/dashboard/:id/upload", artworkController_1.createArtwork);
router.post("/dashboard/:id/update", artworkController_1.updateArtwork);
router.get("/my-art/:id", artworkController_1.getSpecificArtwork);
// router.get("/my-art", getUserArtworks) //Moght need to use cookies/sessions/tokens for this specific one
exports.default = router;
