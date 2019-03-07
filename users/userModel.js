const db = require('../data/dbConfig.js')

module.exports = {
    insert, 
    getAll,
    getUser,
    remove
}

async function insert(user) {
    const [id] = await db('users').insert(user)
    return db('users').where({id}).first()
}

function getAll() {
    return db('users')
}

function getUser(id) {
    return db('users')
    .where({ id: id })
    .first()
}

function remove(id) {
    return db('cards').del().where({id})
}