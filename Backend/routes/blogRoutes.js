import express from 'express';

import { addBlog, deleteBlog, getAllBlogs, getByUserId, getbyId, updateBlog } from "../controllers/blogController";
const blogrouter = express.Router();

blogrouter.get("/",getAllBlogs);
blogrouter.post("/addblog",addBlog)
blogrouter.put("/updateblog/:id",updateBlog);
blogrouter.get("/:id",getbyId);
blogrouter.delete("/:id",deleteBlog)
blogrouter.get('/user/:id',getByUserId)

export default blogrouter;