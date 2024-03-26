const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: [true, "Category title is required"],
        unique: [true, "This category already exists."]
    },

    description: {
        type: String,
        required: [true, "Category description is required."]
    },

    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "jobs"
        }
    ]

})

module.exports = mongoose.model("categories", categorySchema)