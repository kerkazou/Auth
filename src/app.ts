import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import cookieSession from 'cookie-session';
//import cors from 'cors';


import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV != "test"
}));

/*app.use(cors({ credentials: true, 
  origin:["www.ticketing.test", "http://www.ticketing.test", "ticketing.test", "http://ticketing.test"],
  allowedHeaders:  "Content-Type",
  methods: "GET, POST, PUT, DELETE, OPTIONS"

})) */

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

export { app };