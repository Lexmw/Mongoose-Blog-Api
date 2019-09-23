const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(res.status(404).send('Users cannot be retrieved.'))
});

router.get('/:id', (req, res)=> {
    User   
        .findById(req.params.id)
        .then(user => {
            if(user){ res.status(200).json(user)
            console.log(`I found the user ${user}`);
            }
        })
        .catch(res.status(404).send('This user was not found.'))
});

router.post('/', (req, res) => {
    const newUser = new User(req.body)
        newUser.save()
        
        .then(newUser => {
            res.status(201).json(newUser);
            console.log(newUser)
        }).catch(error => console.log(error))
    
});

router.put('/:id', (req, res) => {
    User    
        .findByIdAndUpdate(req.params.id, req.body)
        .then(user => {
            if(user){res.status(204).json(user)
                console.log('User updated!');
            }
    })
    .catch(res.status(404).send('Unable to update the user.'))
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
                console.log(`Successfully deleted ${user}`)
            }
        })
        .catch(res.status(500).send('Cannot delete the user.'))
})

module.exports = router;