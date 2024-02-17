"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = exports.loginUser = exports.deleteUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const artworkModel_1 = __importDefault(require("../models/artworkModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import {createNewArtist} from "./artistController"
// import {createNewCollector} from "./collectorContoller"
// import {createNewDualUser} from "./dualUserController"
////////////////////////////////////////////////////////////////////////////////////////////////
//CREATING USER
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserMessages = {
        missing: `All Fields are Required`,
        existing: `User Already exists`,
        success: `User created`,
        failure: `Problem creating User`
    };
    const { fullName, email, telephone, address, password, confirmPassword } = req.body;
    if (!fullName || !email || !telephone || !address || !password || !confirmPassword) {
        res.status(400).send(`<h1>ALL FIELDS ARE MANDATORY</h1>`);
        // res.render("register.ejs", {createUserMessages})
        throw new Error(`All Fields are Mandatory`);
    }
    const existingUser = yield userModel_1.default.findOne({ email: email });
    if (existingUser) {
        res.status(400).send(`<h1>USER ALREADY EXISTS</h1>`);
        // res.render("register2", {createUserMessages, value:`existing`})
        //  throw new Error(`User Already exists`)
    }
    if (!password === confirmPassword) {
        res.status(400).send(`<h1>PASSWORDS DO NOT MATCH</h1>`);
        // res.render("register", {createUserMessages})
        throw new Error(`Passwords do not match`);
    }
    // const salt = await bcrypt.genSalt(10)
    const hashedpassword = yield bcrypt_1.default.hash(password, 10);
    //INSERT VALIDATION FOR EMAIL(SEND VERIFICATION) AND TELEPHONE(SEND OTP)
    try {
        const newUser = yield userModel_1.default.create({
            fullName,
            email,
            telephone,
            address,
            password: hashedpassword
        });
        newUser.save();
    }
    catch (error) {
        res.status(400).send(`<h1>USER NOT ADDED</h1>`);
        console.log(error);
        throw new Error(`User not added`);
    }
    res.redirect("/login");
});
exports.createUser = createUser;
////////////////////////////////////////////////////////////////////////////////////////////////
//LOGIN USER
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginMessages = {
        incomplete: `Email and Password required`,
        missing: `User not found`,
        incorrect: `Incorrect Password`,
        success: `Login in successful`,
        failure: `Problem logging in`
    };
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(400).send(`<h1>Email and password required</h1>`);
        //res.render("login", {loginMessages, value: `incomplete`})
        throw new Error(`Both email and password are required`);
    }
    const existingUser = yield userModel_1.default.findOne({ email: email });
    if (!existingUser) {
        res.status(400).send(`<h1>User not found</h1>`);
        // res.render("login", {loginMessages, value: `missing`})
        throw new Error(`User not found`);
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
    if (passwordMatch) {
        /*
       const token = jwt.sign(existingUser, "elephantSecret")
       // res.header('x-auth-token', token)
       console.log(token);
       
       res.header('x-auth-token', token).redirect("/user/dashboard")
       */
        res.redirect(`/user/dashboard/${existingUser._id}`);
    }
    else {
        res.status(400).send(`<h1>INCORRECT PASSWORD</h1>`);
        // res.render("login", {loginMessages, value: `incorrect`},)
        throw new Error(`Incorrect password`);
    }
});
exports.loginUser = loginUser;
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//DELETING USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUserMessages = {
        missing: `User does not exist`,
    };
});
exports.deleteUser = deleteUser;
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTING DASHBOARD
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.id;
    const specificUser = yield userModel_1.default.findById(userID);
    if (!specificUser) {
        res.status(400).redirect("/error");
    }
    const allUserArtworks = yield artworkModel_1.default.find({ user: userID });
    res.render("dashboard.ejs", { specificUser, allUserArtworks });
});
exports.getDashboard = getDashboard;
