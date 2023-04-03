const express = require('express')
const app = express()
const port = 3005

app.get('/monChemin', (req, res) => {
    console.log(`Je viens de faire une requête get sur mon app`)
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})