const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');

const app = express();

//DB Config
const db = require('./config/keys').mongoURL;

//Connect to MongoDB
mongoose.connect(db).then(()=>console.log('MongoDB Connected !')).catch(err=>console.log(err));

app.get('/', (req, res)=> res.send('Hello!'));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));