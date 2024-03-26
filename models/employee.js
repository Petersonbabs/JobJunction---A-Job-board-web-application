const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const employeeSchema = new mongoose.Schema({
  
    fullName: {
        type: String,
        required: [true, "Your name is required."],
        trim: true,
        maxLength: 42
    },

    about: {
      type: String
    },

    age: {
      type: String
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        unique: [true, "Email already exist"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Provide a valid email address."]
    },

    password: {
        type: String,
        required: [true, "Password if required."],
        minLength: [8, "Password must be at least 8 characters."],
        select: false
    },

    profession: {
      type: String,
      default: "No profession"
    },

    website: {
      type: String
    },

    role: {
      type: String,
      default: "employee"
    },

    phoneNumber: {
      type: Number
    },

    featuredImg: {
      type: String,
    },
    gender: {
      type: String
      
    },
    location: {
      type: String
    },

    qualification: {
      type: String
      
    },
    experience: {
      type: String
    },
   


    
    
}, { timestamps: true })


// Middleware to hash the password before saving
employeeSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    
    try {
      const hashedPassword = await bcrypt.hash(this.password, 12);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = mongoose.model("employees", employeeSchema)