const mongoose= require('mongoose')

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGO DB CONNECTED")
    } catch (error) {
        console.log('monogodb connection error')
    }
}

module.exports=connectDB