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

    hiringNum: {
        type: Number,
    },

    // todo: add feedback
    // feedback: {
        
    // }
})

module.exports = mongoose.model("Jobs", jobSchema)