const express = require('express');
const app = express();

// Route API
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routeUtilisateurs = require('./router/userRouter');
const routeTeam = require('./router/teamRouter');
const routeSport = require('./router/sportRouter');
const routeSpot = require('./router/spotRouter');
const routePratique = require('./router/pratiqueRouter');
const routePresent = require('./router/EstPresentRouter');

mongoose.connect('mongodb+srv://admin:Pol060592873ca@sportimeapi.eybb5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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
app.use('/api/pratique/', routePratique);
app.use('/api/estpresent/', routePresent);

module.exports = app;