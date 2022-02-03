const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURL;

//Connect to MongoDB
mongoose.connect(db).then(()=>console.log('MongoDB Connected !')).catch(err=>console.log(err));

app.get('/', (req, res)=> res.send('Hello!'));

// app routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));