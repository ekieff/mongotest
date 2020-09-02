var router = require('express').Router()

const db = require('../models')

//get rsvp
router.get('/', (req, res) =>{
    db.RSVP.find()
    .then(foundRsvp =>{
        console.log(foundRsvp)
        res.send(foundRsvp)
    })
    .catch(err =>{
        console.log(err)
        res.status(503).send({message: 'Database issues'})
    })
})

//post rsvp
router.post('/', (req, res) =>{
    db.RSVP.create(req.body)
    .then(createdRsvp =>{
        console.log(createdRsvp)
        res.status(201).send(createdRsvp)
    }).catch(err =>{
        console.log(`Error while creaing new rsvp`, err)
        if(err.name === 'Validation error'){
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: 'Database or server error'})
        }
    })
})
//get by id
router.get('/:id', (req, res) =>{
    db.RSVP.findById(req.params.id)
    .then(foundRsvp =>{
        if(foundRsvp){
            res.send(foundRsvp)
        } else {
            res.status(404).send({message: 'resource not located'})
        }
    }).catch(err =>{
        console.log(err)
        res.status(503).send({message: 'Service Unavailable'})
    })
})

//edit
router.put('/:id', (req, res) =>{
    db.RSVP.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    }).then(updatedRsvp =>{
        res.send(updatedRsvp)
    }).catch(err =>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})

//delete
router.delete('/:id', (req, res) =>{
    db.RSVP.findByIdAndDelete(req.params.id)
    .then(() =>{
        res.status(204).send()
    })
    .catch(err =>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})

module.exports = router