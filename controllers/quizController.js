var model = require('../models/languageModel')

var async = require('async');

var BeGlobal = require('node-beglobal');

var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'to8Qp3sn88IibzvsJG1Psg%3D%3D'
});


var Quiz = function (fromLang, toLang){
	this.fromLang = fromLang;
	this.toLang = toLang;
	this.score = 0;
	this.iteration = 0;  //1-based
	this.nextQuestion = function (){};


};





var translatedArray = []
var finalAnswersArray = [];


module.exports = {
	translate: function (req,res){
		beglobal.translations.translate(
  		{text: req.body.word, from: req.body.originalLang, to: req.body.newLang},
  		function(err, results) {
	    	if (err) {
	      	return console.log(err);
	    	}

    		res.send(results);
  		}
	)},

///////////////////////////////////////////

	checkAnswers: function (req,res){

		var parallelArray = [];
		var answerArray = [];

		req.body.word.map(function(word){
			var translateFunction = function(callback){
			beglobal.translations.translate(
					{text: word, from: 'fra', to: 'eng'},
					function(err, results) {
    				// callback(null,{word:word,result:results});//to do
    				callback(null,results);
				})
			}
			parallelArray.push(translateFunction);
		})

		async.series(parallelArray,function(err,results){
			for(var i=0;i<results.length;i++){
				answerArray.push(results[i].translation)
			}
				console.log(answerArray)
			res.send(answerArray)
		})

	},

////////////////////////////////////


	create: function (req,res){
		translateFunctionArray = [];

		model.english.map(function(i){
			var thisFunction = function(callback){
			beglobal.translations.translate(
					{text: i, from: 'eng', to: req.body.toLang},
					function(err, results) {
    				// callback(null,{word:word,result:results});//to do
    				callback(null,results);
				})
			}
			translateFunctionArray.push(thisFunction);
		})

		async.series(translateFunctionArray,function(err,results){
			for(var i =0;i<results.length;i++){
				finalAnswersArray.push(results[i].translation)
			}
			console.log(finalAnswersArray)
		})

		res.redirect('/quiz');
	},






	test: function(req,res){
		console.log(req.body)
		var currentIndex = parseInt(req.body.index)
		if(req.body.word === model.french[currentIndex]){
			res.send({message:'Correct answer!', index: currentIndex})
		} else {
			res.send({
				message: 'Sorry, this is not the correct answer. The correct answer is ' + '<b>'+ model.french[currentIndex]+ '</b>',
				index: currentIndex
			})
		}

	}
};