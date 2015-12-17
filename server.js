var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var userCounts = 0;

io.on('connection', function (socket) {

	userCounts++;
	console.log("连接数:"+userCounts);
	socket.on('new message', function (data) {
		console.log("new message:"+data);
		io.emit('new message',data);
	});
	socket.on('disconnect',function(){
		userCounts--;
		console.log(socket.id+"断开连接");
		console.log("连接数:"+userCounts);
	})
});