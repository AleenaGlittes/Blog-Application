import mongoose from "mongoose";
import Blog from "../model/blogModel";
import User from "../model/userModel";

export const getAllBlogs = async (req, res, next) => {
    console.log("kkkk")
    let blogs;
    try {
        blogs = await Blog.find().populate('user');
console.log(blogs)
    } catch (err) {
        return console.log(err)
    }

    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" })
    }
    return res.status(200).json({ blogs })
}

export const addBlog = async (req, res, next) => {

    const { title, description, image, user } = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);

    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to find user byu this id"})
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    })
    try {
       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session})
        existingUser.blogs.push(blog);
       await existingUser.save({session})
       await session.commitTransaction();
    } catch (err) {
         console.log(err)
        return res.status(500).json({message:err})
    }
    return res.status(200).json({ blog })
}

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    console.log(blogId)
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to upate the Blog" })
    }
    return res.status(400).json({ blog });
}


export const getbyId = async (req, res, next) => {
    const id = req.params.id;

    let blog;

    try {
        blog = await Blog.findById(id);

    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Blog not Found" })
    }
    return res.status(200).json(blog)
}



export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    console.log(blogId)
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate("user"); 
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return console.log(err)
    }

    if (!blog) {
        return res.status(400).json({ message: "unable to delete" })
    }
    return res.status(200).json({ message: "Successfully Deleted" })
}

 export const getByUserId = async(req,res,next)=>{
    console.log(req.params.id)
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate('blogs');
        console.log(userBlogs)

    }catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(400).json({message:"No Blog Found"})
    }
    return res.status(200).json({blogs:userBlogs})
}
