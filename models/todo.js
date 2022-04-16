const mangoose = require('mongoose');

const todoSchema = new mangoose.Schema({
    todo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    },
    status: {
        type: String,
        default: "unchecked"
    }
});




const Todo = mangoose.model('Todo', todoSchema);
module.exports = Todo;