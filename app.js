var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/js', express.static('public/js'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
	socket.on('message', function (msg) {
		io.emit('message', msg);
	});
});

http.listen(3000, function () {
	console.log('Escuchando puerto 3000');
});