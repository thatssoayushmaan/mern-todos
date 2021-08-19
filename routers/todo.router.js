const router = require('express').Router()

const Todo = require('../models/Todo')

router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (error) {
        res.json(error.message)
    }
})

router.post('/todo/new', async (req, res) => {

    try {
        const todo = await new Todo({
            text: req.body.text
        })
        todo.save()
        res.json(todo)
    } catch (error) {
        res.json(error.message)
    }
})

router.delete('/todo/delete/:id', async (req, res) => {
    try {
        const res = await Todo.findByIdAndDelete(req.params.id)
        res.json(res)
    } catch (error) {
        res.json(error.message)
    }
})

router.put('/todo/complete/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        todo.completed = !todo.completed

        todo.save()
        res.json(todo)
    } catch (error) {
        res.json(error.message)
    }
})

router.put('/todo/update/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        todo.text = req.body.text
        todo.save()

        res.json(todo)
    } catch (error) {
        res.json(error.message)
    }
})

module.exports = router