const  mongoose  = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET ALL BLOGS
exports.getAllBlogsController=async(req,res)=>{
    try {
        const blogs=await blogModel.find({}).populate("user");
        if(!blogs)
        {
            return res.status(200).send({
                success:false,
                message:"Blogs not foumd"
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount:blogs.length,
            message:"All blogs are fetched",
            blogs
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error while getting blog"
        })
    }
}

//createblog
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        // Validate required fields
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields",
            });
        }

        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).send({
                success: false,
                message: "Invalid user ID",
            });
        }

        // Check if user exists
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "User not found",
            });
        }

        // Create new blog
        const newBlog = new blogModel({ title, description, image, user });

        // Start transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).send({
            success: true,
            message: "Blog created successfully",
            newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while creating blog",
            error,
        });
    }
};


//delete blog by id
exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid blog ID",
            });
        }

        // Find the blog by ID and populate the user
        const blog = await blogModel.findById(id).populate("user");
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        // Remove the blog from the user's blogs array
        const user = blog.user;
        if (user) {
            user.blogs.pull(blog._id);
            await user.save();
        }

        // Delete the blog
        await blogModel.findByIdAndDelete(id);

        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error while deleting blog",
            error,
        });
    }
};


//update blog by id
exports.updateBlogController=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,description,image}=req.body
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:"blog updated",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"Error while editing blog"
        })
    }
}

//get blog by id
exports.getBlogByIdController=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await blogModel.findById(id)
        if(!blog)
        {
            return res.status(404).send({
                success:false,
                message:"Error while getting blog by id",
                
            })
        }
        return res.status(200).send({
            success:true,
            message:"Blog fetched successfully",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"Error while getting blog"
        })
    }
}

exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "User blogs not found", // Updated to be more descriptive
            });
        }

        return res.status(200).send({
            success: true,
            message: "User blogs retrieved successfully", // Updated message for clarity
            userBlog, // Send the populated user blogs data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ // Changed to 500 for internal server errors
            success: false,
            message: "Error while fetching user blogs", // Updated message for better understanding
            error: error.message || error, // Send the error message for debugging purposes
        });
    }
};

