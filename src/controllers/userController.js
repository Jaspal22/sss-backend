import User from "../models/userModel.js";

export const Register = async (req, res) => {
    const { userName, password} = req.body;
    // console.log(userName, password);
    
    if (!userName || !password) {
        return res.status(401).json({
            message: "Please provide all the fields",
        });        
    }

    const userExist = await User.findOne({ userName });
    if (userExist) {
        return res.status(401).json({
            message: "User already exist",
        });
    }
    try {
        const user = await User.create({
            userName,
            password,
        });

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        // console.log("Error while creating user", error);
        res.status(401).json({
            message: "User not created successfully"
        });
    }
};

export const Login = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(401).json({
            message: "Please provide all the fields",
        });
    };

    const user = await User.findOne({ userName }).select("+password");
    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    };
    const isPasswordMatched = await user.comparePassword(password);
    user.password = undefined; // remove password from user object
    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    };
    const token = await user.generateJWTToken();
    res.status(200).json({
        message: "User logged in successfully",
        token,
    });

};

export const Logout = (req,res,next) => {
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true,
    });

    res.status(200).json({
        success : true,
        message : "User Logged out successfully",
    })
};
