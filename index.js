var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/src/Index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('conectado na porta:' + port);
});

io.on('connection', function(socket){
  socket.join('some room');
});


// Iniciando Socket.IO
var visitas = 0;
// Evento connection ocorre quando entra um novo usuário.
io.on('connection', function(socket){
  // Incrementa o total de visitas no site.
  visitas++;
  // Envia o total de visitas para o novo usuário.
  socket.emit('visits', visitas);
  // Envia o total de visitas para os demais usuários.
  socket.broadcast.emit('visits', visitas);
  // Evento disconnect ocorre quando sai um usuário.
  socket.on('disconnect', function(){
    visitas--;
    // Atualiza o total de visitas para os demais usuários.
    socket.broadcast.emit('message', visitas);
  });
});
