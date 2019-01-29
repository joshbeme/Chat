const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');

const PORT = process.env.PORT || 3000;

const mongoURI = "mongodb+srv://joshbeme:P2pmwVe9afAStAQ@cluster0-mo167.gcp.mongodb.net/chatApp?retryWrites=true"

mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true});
const db = mongoose.connection;



app.use(session({
    secret: "Im not sure what to put",
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes )

io.on('connection', (socket)=>{
    console.log('A client has joined on', socket.id)
})
io.on('message', (socket)=>{
    console.log(socket)
})

//error handling

app.use(function(req, res, next){
    var err = new Error('Theres a problem');
    err.status = 404;
    next(err)
})



http.listen(PORT, console.log('Listening on', PORT));
