const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { ReviewModel } = require('../db/sequelize')

exports.findAllReviews = (req, res) => {
    ReviewModel.findAll() 
        .then(results => {
            const message = "La liste des avis a bien été récupérée"
            res.json({message, data: results})
        }).catch(error => {
            const message = "La liste des avis n'a pas pu être récupérée"
            res.status(500).json({message, data: error})
        })
}

exports.createReview = (req, res) => {
    ReviewModel.create({
        content: req.body.content,
        rating: req.body.rating,
        UserId: req.body.UserId,
        CoworkingId: req.body.CoworkingId
    }) 
        .then(result => {
            const message = "L'avis a bien été créé"
            res.json({message, data: result})
        }).catch(error => {
            if(error instanceof UniqueConstraintError || error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            } 
            const message = "L'avis n'a pas pu être créé"
            res.status(500).json({message, data: error})
        })
}