const http = require('http')
    .createServer();
const io = require('socket.io')(http, { cors: { origin: '*' } });
const { authenticateJWT } = require('./services/authService');
const { set, get } = require('./services/db');

io.sockets
    .use((socket, next) => {
        const header = socket.handshake.headers['authorization'];
        const user = authenticateJWT(header);

        if (user) {
            socket.user = user;
            return next();
        }

        const err = new Error('Not authorized');
        err.data = { content: "Please retry later" };
        next(err);
    })
    .on('connection', function(socket) {
        socket.broadcast.emit('join', (`${socket.user.email} entered to the chat`));
        socket.emit('messages', get());

        socket.on('message', message => {
            let sid = socket.handshake.sid;
            const newMessage = set(message, socket.user, sid);
            io.emit('message', newMessage);
        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('leave', `${socket.user.email} left the chat`);
        })

    });

let port = process.env.PORT || 8000;
http.listen(port, function(){
    console.log('listening on *:' + port);
});

