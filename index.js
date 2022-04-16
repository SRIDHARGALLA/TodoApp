const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const methodOverride = require('method-override')



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static('public'));



app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// Connect to MongoDB   
mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected...')
    })
    .catch(err => {
        console.log(err)
        console.log('MongoDB Connection Failed...')
    })


app.get('/todo', async(req, res) => {
    // res.send('Welcome to Todo App');
    const newtodo = await Todo.find({});
    res.render('index', { newtodo });
});
app.get('/todo/:id', async(req, res) => {
    const newtodo = await Todo.findById(req.params.id);

    res.render('show', { newtodo });
})





app.post('/todo', async(req, res) => {
    const newone = new Todo(req.body);
    await newone.save();
    console.log(newone);
    res.redirect('/todo');
});



app.get('/todo/:id/edit', async(req, res) => {

    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.render('edit', { todo });


});
app.put('/todo/:id', async(req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    // console.log(todo);
    res.redirect('/todo');

});

app.delete('/todo/:id/delete', async(req, res) => {
    const { id } = req.params;
    const deletetodo = await Todo.findByIdAndDelete(id);
    // console.log(deletetodo);
    res.redirect('/todo');
});



app.get('/', (req, res) => {
    res.render('header');
});