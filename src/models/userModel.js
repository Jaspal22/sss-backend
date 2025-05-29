
import mongoose from "mongoose";
import { Schema } from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userScheema = new Schema({
    userName:{
        type: String,
        required: [true, 'Name is required'],
        minlength: [5,'Name must be at least 5 characters'],
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role:{
        type: String,
        enum : ['USER','ADMIN','TEACHER'],
        default: 'TEACHER',
    },
   
},{
    timestamps:true
});

userScheema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userScheema.methods = {
    generateJWTToken: async function(){
        return JWT.sign(
            {id:this._id , email:this.username , role:this.role},
            process.env.SECRET,
            {expiresIn : "24h"},
        )
    },
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password);
    },
    generatePasswordResetToken: async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 ;  //15 minutes from now

        return resetToken;
    },
    
}

const user = mongoose.model("user",userScheema);
export default user;


// #################


// models/User.js
// import mongoose from "mongoose";
// const { Schema } = mongoose;
// import JWT from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import validator from 'validator';

// const userSchema = new Schema({
//   userName: {
//     type: String,
//     required: [true, 'Username is required'],
//     minlength: [5, 'Username must be at least 5 characters'],
//     lowercase: true,
//     trim: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [8, 'Password must be at least 8 characters'],
//     select: false,
//   },
//   role: {
//     type: String,
//     enum: ['USER', 'ADMIN', 'TEACHER', 'STUDENT'],
//     default: 'STUDENT',
//   },
//   email: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     validate: [validator.isEmail, 'Please enter a valid email address'],
//   },
//   fullName: {
//     type: String,
//     trim: true,
//   },
//   teacherDetails: {
//     type: Schema.Types.ObjectId,
//     ref: 'Teacher',
//     description: "Reference to teacher details (if role is teacher)",
//   },
//   studentDetails: {
//     type: Schema.Types.ObjectId,
//     ref: 'Student',
//     description: "Reference to student details (if role is student)",
//   },
//   forgotPasswordToken: String,
//   forgotPasswordExpiry: Date,
// }, {
//   timestamps: true,
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods = {
//   generateJWTToken: function () {
//     return JWT.sign(
//       { id: this._id, userName: this.userName, role: this.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" },
//     );
//   },
//   comparePassword: async function (plainTextPassword) {
//     return await bcrypt.compare(plainTextPassword, this.password);
//   },
//   generatePasswordResetToken: function () {
//     const resetToken = crypto.randomBytes(20).toString('hex');

//     this.forgotPasswordToken = crypto
//       .createHash('sha256')
//       .update(resetToken)
//       .digest('hex');
//     this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

//     return resetToken;
//   },
// };

// const User = mongoose.model("User", userSchema);
// export default User;

