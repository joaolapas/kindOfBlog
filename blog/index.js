const express = require('express');
const userRoute = require('./src/routes/user.route.js')
const app = express();

app.use ('/soma', userRoute);

app.listen(3000)