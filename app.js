const express = require('express')
const app = express()
const port = 3000

const coworkings = require('./mock-coworkings');

app.get('/api/coworkings', (req, res) => {
    // Renvoyer tous les coworkings au format json, uniquement ceux dont la surface est supérieure à 500
    console.log(req.query)
    const limit = req.query.limit || 200
    const result = coworkings.filter(element => element.superficy > limit);

    res.json(result)
})

app.get('/api/coworkings/:id', (req, res) => {
    // Afficher le nom du coworking qui correspond à l'id en paramètre
    let myCoworking = coworkings.find((coworking) => { return coworking.id === Number(req.params.id) })
    res.json(myCoworking)
})

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})