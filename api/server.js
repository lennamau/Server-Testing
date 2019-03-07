const express = require('express');

const Users = require('../user/usersModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'running' });
});


server.post('/', async (req, res) => {
    try {
        const { id } = await Users.insert(req.body)
        const newUser = await Users.getCard(id);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Users.remove(id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = server;