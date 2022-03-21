const express = require('express');
const app = express();

// Route API
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routeUtilisateurs = require('./router/userRouter');
const routeTeam = require('./router/teamRouter');
const routeSport = require('./router/sportRouter');
const routeSpot = require('./router/spotRouter');

mongoose.connect('mongodb+srv://admin:XTAX6SHgpdz7emUh@sportimeapi.eybb5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connexion success !")
}).catch((error) => {
    console.log(error);
});

app.use(bodyParser.json());
app.use('/api/utilisateur/', routeUtilisateurs);;
app.use('/api/team/', routeTeam);
app.use('/api/sport/', routeSport);
app.use('/api/spot/', routeSpot);

module.exports = app;