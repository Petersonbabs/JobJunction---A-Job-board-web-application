const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const companySchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        unique: [true, "Email already exist"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Provide a valid email address."]
    },

    firstName: {
        type: String,
        required: [true, "Your first name is required."],
        trim: true,
        maxLength: 42
    },
    lastName: {
        type: String,
        required: [true, "Your last name is required."],
        trim: true,
        maxLength: 42
    },


    companyName: {
        type: String,
        required: [true, "Your compnay name is required."],
        trim: true,
        maxLength: 42
    },

    password: {
        type: String,
        required: [true, "Password is required."],
        minLength: [8, "Password must be at least 8 characters"],
        select: false
    },

    description: {
        type: String,
        required: [true, "Your compnay description is required."]
    },

    industry: {
        type: String,
    },

    featuredImg: {
        type: 
        String,
    },

    location: {
        type: String
    },

    website: {
        type: String
    },

    reviews: {
        type: Array
    },

    jobs: {
        // todo
        type: mongoose.Schema.ObjectId,
        ref: "jobs"
    },

    photos: {
        type: Array
    },

    phoneNumber: {
        type: Number
    },

    foundedDate: {
        type: String
    },

    companySize: {
        type: String
    },

    candidates: {
        type: Array
    },

    role: {
        type: String,
        default: "company"
    }

}, { timestamps: true })

// Middleware to hash the password before saving
companySchema.pre('save', async function (next) {
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

module.exports = mongoose.model("Companies", companySchema)