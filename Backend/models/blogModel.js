const mongoose= require('mongoose')

const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        require:[true,"Title is required"]
    },
    description:{
        type:String,
        require:[true,"Description is required"]
    },
    image:{
        type:String,
        require:[true,"Description is required"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
    }
},{timestamps:true})

const blogModel=mongoose.model('Blog',blogSchema)
module.exports=blogModel;