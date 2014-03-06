$(document).on('ready',function(){

	$('#langForm').on('submit', function(e){
		e.preventDefault();
		console.log('test');

		$.post('/translate', $('#langForm').serialize(),function(data){
			console.log(data);
			$('#coolWord').val(data.translation);
			$('#origLang').val(data.to);
			$('#newLang').val(data.from);
		});
	});

	$('#quizForm').on('submit', function(e){
		e.preventDefault();
		console.log('test');

		$.post('/quizanswers', $('#quizForm').serialize(),function(data){
			console.log(data);
		});
	});








})