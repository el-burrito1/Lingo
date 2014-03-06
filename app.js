
/**
 * Module dependencies.
 */

// to8Qp3sn88IibzvsJG1Psg%3D%3D

var express = require('express');
var http = require('http');
var path = require('path');
var languageModel = require('./models/languageModel');
var quizController = require('./controllers/quizController');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req,res){
	res.render('index');
})

app.post('/translate', quizController.translate);

app.get('/quiz', function (req,res){
	res.render('quiz', {words:languageModel});
})

app.post('/quizanswers', quizController.checkAnswers);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
