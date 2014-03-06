var async = require('async');

var BeGlobal = require('node-beglobal');

var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'to8Qp3sn88IibzvsJG1Psg%3D%3D'
});


// var translation = function(word, originalLang, newLang, callback){
// 	beglobal.translations.translate(
//   		{text: word, from: originalLang, to: newLang},
//   		function(err, results) {
// 	    	if (err) {
// 	      	return console.log(err);
// 	    	}

//     		callback(results);
//   		}
// };

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

		async.parallel(parallelArray,function(err,results){
			for(var i=0;i<results.length;i++){
				answerArray.push(results[i].translation)
			}
				console.log(answerArray)
			res.send(answerArray)
		})

}
};