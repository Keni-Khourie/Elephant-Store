"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexController_1 = require("../controllers/indexController");
const userController_1 = require("../controllers/userController");
const artworkController_1 = require("../controllers/artworkController");
const router = express_1.default.Router();
router.get("/", indexController_1.getHome);
router.get("/login", indexController_1.getLogin);
router.post("/login", userController_1.loginUser);
router.get("/register", indexController_1.getRegister);
router.post("/register", userController_1.createUser);
router.get("/artworks", artworkController_1.getAllArtworks);
router.get("/artworks/:id", artworkController_1.getSpecificArtworkPublic);
// router.get("*", getNotFound)
exports.default = router;
