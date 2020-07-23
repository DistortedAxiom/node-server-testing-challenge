const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    add,
    findById,
    remove
}

function find() {
    return db('users')
            .select('id', 'username', 'password')
}

function findBy(filter) {
    return db('users')
        .where(filter)
        .orderBy('id')
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id')

    return findById(id)
}

function findById(id) {
    return db('users')
            .where({id})
            .first()
}

function remove(id) {
    let toBeDeleted = findById(id).then((item) => {
        return item
    })

    return db('users')
        .where({id})
        .del()
        .then(() => {
            return toBeDeleted
        })
}
