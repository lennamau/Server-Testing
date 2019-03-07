const express = require('express');

const Cards = require('../user/usersModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'running' });
});