const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));

//var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/graphics/favicon.ico'));




io.on('connection', (socket) => {
    // poniżej zmienne tylko dla danego użytkownika
    console.log("connected",socket.id);
    let user = {
        isLoggedOn: false
    }

    socket.on('disconnect', () => {
        console.log("disconnected",socket.id);
    });

    socket.on('login', (username,password) =>{
        socket.join("loggedUsers");
        console.log("logowanie",username,password);
        socket.emit('login-result',"Poprawne");
    });
});
server.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port :${process.env.PORT || 3000}`);
});


