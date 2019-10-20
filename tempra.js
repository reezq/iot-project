const express = require('express'),
      app = express(),
      server = require( 'http' ).Server(app),
      io = require('socket.io')(server),
      net = require('net'),
      //r = require('rethinkdb'),
      cons = require('consolidate'),
      bodyParser = require('body-parser'),
      //sessions = require('express-session'),
      config = require(__dirname+"/config.js");
      //nodemailer = require('nodemailer'),
      //transporter = nodemailer.createTransport(config.nodemailer),
      //htmlToText = require('nodemailer-html-to-text').htmlToText,
      //message = require(__dirname+"/function.js");

/* Routing */
//untuk menerima post data dari arduino
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
//defined folder view dan file2 didalamnya
//app.use('/components', express.static(__dirname +  '/assets/components'))
app.use('/js', express.static(__dirname +  '/assets/js'))
app.use('/fonts', express.static(__dirname +  '/assets/fonts'))
app.use('/css', express.static(__dirname +  '/assets/css'))
app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.get('/', function(req, res){
  res.redirect('/home');
})

app.route('/home')
.get(function(req, res, next){
res.render('homepage2',{});
})

//var session;

//var messageText = "";
//var airClient = new net.Socket();
var feed = io.of('/feed');

//airClient.connect(80, '192.168.197.102', function(){
    //console.log('Connected!');
  //})
//airClient.on('error', function(err){
  //console.log(err);
//})

//function sendDataToAC(data){

  //airClient.connect(80, '192.168.197.102', function(){
    //airClient.write(data);
    //console.log('Connected!');
  //})

//}

app.route('/temphumi')
.get(function(req,res, next){
    var sense_value = req.body;
    var dnow = new Date();

    io.emit('temphumi', sense_value);
	console.log('testing get ='+sense_value);
  })
.post(function(req,res, next){
    var sense_value = req.body;
    //var dnow = new Date();

    //io.emit('temphumi', sense_value);
	console.log(sense_value);
  })
// akhir testing

server.listen(config.express.port, function(){
  console.log('HTTP server run at port '+config.express.port+'....');
});
