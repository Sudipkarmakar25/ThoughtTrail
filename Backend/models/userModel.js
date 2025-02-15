const mongoose=require('mongoose')

const userSchemas=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"]

    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    blogs: {
        type: [mongoose.Types.ObjectId],
        ref: 'Blog',
        default: [],
    }
},{timestamps:true})
const userModel=mongoose.model("User",userSchemas)
module.exports=userModel
