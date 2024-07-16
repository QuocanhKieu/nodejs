const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Vui lòng nhập email"],
        minLength: 6,
        unique: true,
        validate: {
            validator: (v) => {
                const regex = /^\S+@\S+\.\S+$/ ;
                return v.match(regex);
            },
            message: (t)=> `${t.value} không phải định dạng email`
        }

    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        default: ""
    },
    resetPasswordExpires: {
        type: Date,
        default: Date.now
    },
    role: { 
        type: String, 
        enum: ['user', 'staff','editor', 'admin'], // Define allowed roles
        default: 'user' // Default role
    }
})
module.exports = mongoose.model("User",user_schema);