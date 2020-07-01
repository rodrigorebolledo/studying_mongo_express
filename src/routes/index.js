const express = require('express')
const router = express.Router();
const Task = require('../models/task')
const path = require('path')

router.get('/api/getList', async (req, res, next) => {
    try {
        const tasks = await Task.find()
        res.json(tasks); 
    } catch (error) {
        console.log(`error: ${error}`);
        next();
    }
});

router.post('/add', async (req, res, next) => {
    const task = new Task(req.body)
    try {
        await task.save();
        res.json(task);
        console.log(`Elemento guardado con exito: ${task}`)
    } catch (error) {
        console.log(`error: ${error}`);
        next();
    }
});


router.get('/delete/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Task.remove({ _id : id });
        console.log('Elemento eliminado con exito');       
    } catch (error) {
        console.log(`error: ${error}`);
        next();
    }
});

router.post('/edit/:id', async (req, res) => {
    req.setTimeout(0)
    const { id } = req.params;
    try {
            await Task.updateOne({ _id: id }, req.body);
            res.sendStatus(200)
    } catch (error) {
        console.log(`error: ${error}`);
        res.error(error);
        return;
    }
});



router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../../client/build/index.html'));
});








module.exports = router;




