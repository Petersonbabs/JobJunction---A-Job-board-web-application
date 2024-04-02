const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Job Title is required"],
        maxLength: 71
    }, 

    description: {
        type: String,
        required: [true, "Job description is required"],
    },

    location: {
        type: String,
        reqiured: true
    },
    experience: {
        type: String
    },

    company: {
        // todo: reference compnay collection
        type: mongoose.Schema.ObjectId,
        ref: "Companies",
        required: true
    },

    salary: {
        type: String,
        required: [true, "Job salary is required"],
        
    },

    requirements: {
        type: Array,
        required: [true, "Job salary is required"],
    },
    // todo
    // applicationDEadline: {

    // },

    category: {
        // todo
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Job must belong to a category"],
        ref: "categories"
    },

    jobType: {
        type: String
    },

    hiringNum: {
        type: Number,
    },

    gender: {
        type: String
    },

    status: {
        type: String,
        default: "open" // closed
    }

    // todo: add feedback
    // feedback: {
        
    // }
}, {timestamps: true})

module.exports = mongoose.model("Jobs", jobSchema) 