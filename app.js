const express = require('express')
const app = express()
const port = 3000

const coworkings = require('./mock-coworkings');

app.get('/api/coworkings', (req, res) => {
    let sentence = ''
    // coworkings.forEach((coworking) => {
    //     sentence += coworking.name + ' '
    // })

    coworkings.map((coworking) => {
        sentence += coworking.name + ' '
    })
    console.log(`Je viens de faire une requête get sur mon app`)
    res.send(sentence)
})

app.get('/api/coworkings/:id', (req, res) => {
    // Afficher le nom du coworking qui correspond à l'id en paramètre
    console.log(coworkings[0].id, req.params.id)
    let myCoworking = coworkings.find((coworking) => { return coworking.id === Number(req.params.id) })
    res.send(`Nom du coworking : ${myCoworking.name}`)
})

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})