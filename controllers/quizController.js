var languageModel = require('../models/languageModel')
var userModel = require('../models/userModel')

var async = require('async');

var BeGlobal = require('node-beglobal');

var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'to8Qp3sn88IibzvsJG1Psg%3D%3D'
});

var mongoose = require('mongoose')



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
		userModel.update({id:1},{$inc:{totalQuizzes:1}},function (err,docs){})

		translateFunctionArray = [];

		languageModel.english.map(function(i){
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






	testWord: function(req,res){
		var answerCount = [];
		var wrongCount= [];
		var currentIndex = parseInt(req.body.index)

		userModel.update({id:1},{$inc:{totalAnswered:1}},function (err,docs){})

		if(req.body.word === languageModel.french[currentIndex]){
			res.send({message:'Correct answer!', index: currentIndex})
			answerCount.push(req.body.word)

			userModel.update({id:1},{$inc:{totalCorrect:1}},function (err,docs){})
		} else {
			res.send({
				message: 'Sorry, this is not the correct answer. The correct answer is ' + '<b>'+ languageModel.french[currentIndex]+ '</b>',
				index: currentIndex
			})

			userModel.update({id:1},{$inc:{totalFailed:1}},function (err,docs){})
		}

	}
};