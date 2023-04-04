const express = require('express')
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const app = express()
const port = 3000

const coworkings = require('./mock-coworkings');

// const logger = (req, res, next) => {
//     console.log(`URL : ${req.url}`)
//     next();
// }

app
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/favicon.ico'))

app.get('/api/coworkings', (req, res) => {
    // Renvoyer tous les coworkings au format json, uniquement ceux dont la surface est supérieure à 500
    const limit = req.query.limit || 200
    const result = coworkings.filter(element => element.superficy > limit);

    const msg = `La liste des coworkings a bien été retournée.`
    res.json({ message: msg, data: result })
})

app.get('/api/users', (req, res) => {
    res.json({})
})

app.get('/api/reviews', (req, res) => {
    res.json({})
})

app.get('/api/reviews/:id', (req, res) => {
    res.json({})
})

app.get('/api/coworkings/:id', (req, res) => {
    // Afficher le nom du coworking qui correspond à l'id en paramètre
    let myCoworking = coworkings.find((coworking) => { return coworking.id === Number(req.params.id) })

    let result;
    if (myCoworking) {
        const msg = `Le coworking n°${myCoworking.id} a bien été trouvé.`
        result = { message: msg, data: myCoworking }
    } else {
        const msg = `Aucun coworking ne correspond à l'identifiant ${req.params.id}.`
        result = { message: msg, data: {} }
    }

    res.json(result)
})

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})