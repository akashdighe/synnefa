const mongoose = require("mongoose")

const toDoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [80, "Title can't exceed 80 characters"]
    },
    description: {
        type: String,
        required: true,
        maxLength: [500, "Description can't exceed 500 characters"]
    },
    status: {
        type: String,
        default: "pending"
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('ToDoList', toDoListSchema, 'toDoLists')