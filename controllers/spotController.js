const Spot = require('../models/spotModel');

exports.createSpot = (req, res) => {
    const spot = new Spot(req.body);

    spot.save()
    .then((spot) => {
        return res.status(201).json({spot})
    })
    .catch((error) => {return res.status(400).json({error}) });
}

