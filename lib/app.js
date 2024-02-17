"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// import indexRouter from '../routes/index';
// import usersRouter from '../routes/users';
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.get("/", async(req:Request, res:Response)=>{
//   res.render("home.ejs")
// })
// app.get("/login", (req:Request, res: Response)=>{
//   res.render("login.ejs")
// })
// app.get("/register", (req:Request, res: Response)=>{
//   res.render("register.ejs")
// })
// app.get("/this", (req:Request, res:Response)=>{
//   res.render("dashboard.ejs")
// })
app.use("/", indexRoutes_1.default);
app.use("/user", userRoutes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
/*
// error handler
app.use(function(err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

*/
// app.get("*", (req, res)=>{
//   res.status(404).redirect("/notfound")
// })
module.exports = app;
