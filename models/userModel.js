var mongoose = require('mongoose');

// var find: function(object){
// 	db.questions.find()
// }

var userSchema = new mongoose.Schema({
	totalQuizzes: Number,
	passedQuizzes: Number,
	failedQuizzes: Number,
	percentPassed: Number,
	totalAnswered: Number,
	totalCorrect: Number,
	totalFailed: Number,
	percentCorrectWords: Number,
	bestTen: Number,
	worstTen: Number,
	id: Number
	
});

var userModel = module.exports = mongoose.model('quizUser' , userSchema)