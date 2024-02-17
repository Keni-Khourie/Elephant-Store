import createError from 'http-errors';
import express, {NextFunction, Request, Response, Errback, ErrorRequestHandler} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from "./routes/indexRoutes"
import userRouter from "./routes/userRoutes"

// import indexRouter from '../routes/index';
// import usersRouter from '../routes/users';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../','views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

app.use("/", indexRouter)
app.use("/user", userRouter)




// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
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
