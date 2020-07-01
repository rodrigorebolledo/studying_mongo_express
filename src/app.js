const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const indexRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 5000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../client/build')));
app.use(bodyParser.json());
app.use(indexRoutes);
app.use(cors());
// connecting to db

mongoose.connect('mongodb://localhost/crud-mongo', { useNewUrlParser: true, useUnifiedTopology: true  }  )
.then((db) => {
    console.log('Base de datos conectada correctamente');
})
.catch((err) => {
    console.log(`ha ocurrido el siguiente error: ${err}`);
});

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en: http://localhost:${app.get('port')}`);
})