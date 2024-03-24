import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import blogrouter from "./routes/blogRoutes.js";
import cors from 'cors';


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user",router);
app.use("/api/blog",blogrouter)

mongoose
.connect(
    'mongodb+srv://aleenavincent4u:nPyxA97FBWHP6dQq@cluster0.wgfcnru.mongodb.net/')
.then(() => app.listen(5000))
.then(() => console.log("connected to database"))
.catch((err) => console.log(err));

app.use("/api", (req, res, next) => {
    res.send("helloo");
})


