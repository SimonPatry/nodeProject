import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import mongoose from"mongoose";
import MongoStore from "connect-mongo";
import route from "./routes/router.js";
import flash from "connect-flash";


dotenv.config();

const { APP_HOSTNAME, APP_PORT,APP_DB, APP_SECRET} = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const dbUrl = `mongodb://${APP_HOSTNAME}:${APP_DB}/users`;
app.set("view engine", "pug");

mongoose.connect(dbUrl, { useNewUrlParser: true }).then(init);

app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  name: "user",
  secret: APP_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbUrl}), cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route);

async function init (){
  app.listen(APP_PORT, () => {
    console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
  });
}
