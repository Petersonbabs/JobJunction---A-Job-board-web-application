const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category title is required"],
        unique: [true, "This category already exists."]
    }, 
    
    description: {
        type: String,
        required: [true, "Category description is required."]
    }


})

module.exports = mongoose.model("categories", categorySchema)