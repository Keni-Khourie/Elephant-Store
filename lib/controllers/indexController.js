"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotFound = exports.getRegister = exports.getLogin = exports.getHome = void 0;
const getHome = (req, res) => {
    res.render("home");
};
exports.getHome = getHome;
const getLogin = (req, res) => {
    //Might want to pass in an object with error messages
    res.render("login.ejs");
};
exports.getLogin = getLogin;
const getRegister = (req, res) => {
    res.render("register.ejs");
};
exports.getRegister = getRegister;
const getNotFound = (req, res) => {
    res.render("404.ejs");
};
exports.getNotFound = getNotFound;
