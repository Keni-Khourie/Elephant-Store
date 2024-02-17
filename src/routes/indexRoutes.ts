import express from "express"
import { getHome, getLogin, getRegister, getNotFound } from "../controllers/indexController"
import { createUser, loginUser } from "../controllers/userController"

const router = express.Router()


router.get("/", getHome)
router.get("/login", getLogin)
router.post("/login", loginUser)
router.get("/register", getRegister)
router.post("/register", createUser )
// router.get("*", getNotFound)

export default router