const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//app configuration 
app.set('port', (process.env.PORT || 5000));

//setup our express app
app.use(morgan('dev')); //log every request to console
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


//app routes
require('./routes/webhook_verify')(app);

//server start
app.listen(app.get('port'), function() {
    const url = 'http://localhost:' + app.set('port');
    console.log('app running on port: ' + app.get('port'));
})