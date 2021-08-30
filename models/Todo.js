const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Todo = mongoose.model('todo', TodoSchema)

module.exports = Todo