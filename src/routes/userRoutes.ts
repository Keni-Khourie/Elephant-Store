import express from "express"
import { getLogin, getRegister } from "../controllers/indexController"
import { getDashboard } from "../controllers/userController"
import { createArtwork, getAllArtworks, getSpecificArtwork, getUserArtworks, deleteArtwork, updateArtwork } from "../controllers/artworkController"

const router = express.Router()


router.get("/dashboard/:id", getDashboard)
router.post("/dashboard/:id/upload", createArtwork)
router.post("/dashboard/:id/update", updateArtwork)
router.get("/my-art/:id", getSpecificArtwork)
// router.get("/my-art", getUserArtworks) //Moght need to use cookies/sessions/tokens for this specific one



export default router