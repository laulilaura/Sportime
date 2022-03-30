
var favicon = require('serve-favicon');
const express = require('express');
const path = require("path");
const app = express();

// Route API
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routeUtilisateurs = require('./router/userRouter');
const routeTeam = require('./router/teamRouter');
const routeSport = require('./router/sportRouter');
const routeSpot = require('./router/spotRouter');
const routePratique = require('./router/pratiqueRouter');
const routePresent = require('./router/estpresentRouter');

// body-parser
app.use(bodyParser.urlencoded ({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:Pol060592873ca@sportimeapi.eybb5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connexion mongoose success !")
}).catch((error) => {
    console.log(error);
});

app.use(bodyParser.json());
app.use('/api/utilisateur/', routeUtilisateurs);
app.use('/api/team/', routeTeam);
app.use('/api/sport/', routeSport);
app.use('/api/spot/', routeSpot);
app.use('/api/pratique/', routePratique);
app.use('/api/estpresent/', routePresent);

app.use(express.static(path.join(__dirname, 'views')));

module.exports = app;
