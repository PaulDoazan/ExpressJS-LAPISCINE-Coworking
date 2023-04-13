const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
//

exports.findAllReviews = (req, res) => {
    //
    res.json("Tous les avis.")
}
