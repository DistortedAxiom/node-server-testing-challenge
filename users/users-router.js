const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.send(err)
        });
});

router.get("/:id", (req, res) => {
    const {id} = req.params

    Users.findById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({message: `Cannot find user with the id of ${id}`})
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.post('/', (req, res) => {
    const userData = req.body;

    Users.add(userData)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted });
              } else {
                res.status(404).json({ message: 'Could not find user with given id' });
              }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
})

module.exports = router;
