const env = require("./config/env.json");

var app = require('express')();

app.use('/api', require('./routes/api'));

app.listen(env.port);
