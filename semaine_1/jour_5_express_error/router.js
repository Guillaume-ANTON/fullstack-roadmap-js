const express = require("express");
const router = express.Router();
let persons=[
    {id:0,name:'Julie'},
    {id:1,name:'Marc'},
    {id:2,name:'Bob'}
];

function getPerson(id) {
    return persons.find(p => p.id === +id);
}

function insertPerson(p) {
    p.id = persons.length;
    persons.push(p);
    return p;
}

function removePerson(id) {
    persons = persons.filter(p => p.id !== +id);
}

function updatePerson(person) {
    persons = persons.map(p => p.id === +person.id ? person : p);
}

router
   .get("/", (req, res) => {
       res.json(persons);
   })


.get("/persons/:id",(req, res, next)=>{
    const person = getPerson(req.params.id);
        if (!person) {
            const err = new Error("Personne non trouvée");
            err.status = 404;
            return next(err);
        }
        res.json(person);
    })


.post('/persons', (req, res, next) => {
        if(!req.body.name) {
            const err = new Error("Le champ name est requis");
            err.status = 400;
            return next(err)
        }
        const p = insertPerson(req.body);
        res.status(201).set('Location', '/persons/' + p.id).json(p);
    })


.delete('/persons/:id', (req, res, next) => {
    if(!removePerson(req.body.id)) {
        const err = new Error("Personne non trouvé");
        err.status = 404;
        return next(err)
    }
        removePerson(req.params.id);
        res.status(204).end();
    }) 

.patch('/persons/:id', (req, res, next) => {
    if (!updatePerson(req.body)) {
        const err = new Error("Personne non trouvée");
        err.status = 404;
        return next(err);
    }            
        res.status(200).json(req.body);
    })

module.exports = router;