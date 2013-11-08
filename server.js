var express = require('express')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, messages = [{
		name: "Neil",
    	message: "Inital Message"
    }]
	, sockets = [];

app.use( express.static(__dirname + '/public') );

server.listen(4000);

io.sockets.on('connection', function(socket) {
	sockets.push(socket);

	socket.emit('message-available', messages);

	socket.on('add-message', function(data) {
		messages.push(data);

		sockets.forEach(function(s) {
			s.emit('message-added', data);
		});
	})
});
