let coworkings = require('../mock-coworkings');
const { Coworking } = require('../db/sequelize')


exports.findAllCoworkings = (req, res) => {
    // Renvoyer tous les coworkings au format json, uniquement ceux dont la surface est supérieure à 500
    const limit = req.query.limit || 200
    // const result = coworkings.filter(element => element.superficy > limit);

    // utiliser le model Coworking pour lister tous les coworkings existants dans la bdd... findAll()
    Coworking.findAll()
        .then((elements)=>{
            const msg = 'La liste des coworkings a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.json({message: msg})
        })
}

exports.findCoworkingByPk = (req, res) => {
    // Afficher le coworking correspondant à l'id en params, en le récupérant dans la bdd     findByPk()
    Coworking.findByPk(req.params.id)
        .then(() => {
            const msg = `Le coworking n° a bien été récupéré.`
            res.json({message: msg})
        })
        .catch(() => {
            const msg = `Aucun coworking ne correspond à l'id n°${req.params.id}.`
            res.json({message: msg})
        })
}

exports.updateCoworking = (req, res) => {
    // Modifier le coworking en base de données qui correspond à l'id spécifé dans les params
    Coworking.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((coworking) => {
        if(coworking === null){
            const msg = "Le coworking demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le coworking a bien été modifié."
            res.json({message: msg, data: coworking})
        }
    }).catch(() => {
        const msg = "Impossible de mettre à jour le coworking."
        res.json({message: msg})
    })
}

exports.deleteCoworking = (req, res) => {
    // 1. Récupère dans le tableau le coworking qui correspond à l'id en paramètre
    const coworkingToDelete = coworkings.find(el => el.id == req.params.id)

    // 2. S'il n'existe pas, erreur 404
    if (!coworkingToDelete) {
        return res.status(404).json({ message: `Aucun coworking ne correspond à l'id ${req.params.id}` })
    }

    // 3. On renvoie un nouveau tableau qui ne contiendra plus l'élément qui correspond à l'id
    let coworkingsUpdated = []
    coworkings.forEach((el) => {
        if (el.id != coworkingToDelete.id) {
            coworkingsUpdated.push(el)
        }
    })

    coworkings = coworkingsUpdated;
    res.json(coworkings)
}

exports.createCoworking = (req, res) => {
    let newCoworking = req.body;
    console.log(req.body);
    // let newId = coworkings[coworkings.length - 1].id + 1;

    // newCoworking.id = newId;
    // coworkings.push(newCoworking);

    Coworking.create({
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        picture: req.body.picture,
        superficy: req.body.superficy,
        capacity: req.body.capacity
    }).then(() => {
        const msg = 'Un coworking a bien été ajouté.'
        res.json({ message: msg, data: newCoworking })
    }).catch(error => res.json(error))
}