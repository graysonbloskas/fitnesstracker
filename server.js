const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const db = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(require('./controllers'));

mongoose.connect(process.env.MONGODB_URI || 'mongoddb://localhose/fitness_db', 
{
useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false 
});

app.listen(PORT, () => {
    console.log(`Now listening at localhost:${PORT}`);
});


