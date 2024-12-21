const userModel=require('../models/userModel')
const bcrypt=require('bcryptjs')
//get all user
exports.getAllUsers=async (req,res)=>{
try {
    const users=await userModel.find({});
    return res.status(200).send({
        userCount:users.length,
        success:"true",
        message:"all users data",
        users
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        message:"Error  in getall users",
        success:"false",
        error
    })
}
};

//create registeruser
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).send({
                message: "Please fill all fields",
                success: false,
            });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: "Email already exists",
                success: false,
            });
        }

        // Hash the password using bcryptjs (use await to resolve the Promise)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the resolved hashed password
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword, // Use the resolved hashed password
        });

        // Save the user
        await user.save();

        return res.status(201).send({
            message: "New user created",
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Error in registration",
            success: false,
            error: error.message,
        });
    }
};

//login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please enter both email and password",
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered yet",
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Success response
        return res.status(200).send({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Login failed due to server error",
            error: error.message,
        });
    }
};


