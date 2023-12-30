const express = require('express')
const app = express()
const logger  = (req, res, next) => {
    console.log(req.url)
    console.log(req.params)
    console.log(req.query)
    next()
    //Lors de la création d'un middleware, vous n'êtes pas obligé d'utiliser le next(). 
    //Vous pouvez envoyer votre propre réponse et remplacer/omettre complètement app.get()
    //res.send('Custom About page')
}
const auth  = (req, res, next) => {
    const user = req.query.user
    if (user === 'admin') {
        req.user = {name: 'admin', id: 1 }
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}
//app.use(logger) // execute your middleware for all requests

//Vous pouvez également exécuter votre middleware uniquement pour les requêtes qui se trouvent sous un chemin spécifique
//app.use('/api', logger)
//Plusieurs middleware peuvent être utilisés en même temps

app.use([logger, auth])



//Sans middleware
// app.get('/about', (req, res) => {
//     console.log(req.url)
//     console.log(req.params)
//     console.log(req.query)
//     return res.send('About Page')
// })

//avec middleware


// app.get('/about', (req, res) => {
//     return res.send('About Page')
// })
// app.get('/about', logger, (req, res) => {
//     return res.send('About Page')
// })

//Le middleware peut modifier l'objet req et l'objet res
//app.use(auth)

app.get('/about', (req, res) => {
    console.log(req.user)
    return res.send('About Page')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})