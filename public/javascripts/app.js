$(document).on('ready',function(){
    var currentQuizIndex = 0;


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

        $.ajax({
            data: {word: $('#answerForm').val(), index: currentQuizIndex},
            type: 'post',
            url: '/quizTest'
        }).done(function(data){
            $('#answerValidate').html(data.message)
            $('#answerValidate').html(data.failMessage)
        })

    $('#nextQuestion').css('visibility','visible')

    });



        $('#nextQuestion').on('click',function(e){
        e.preventDefault()

        $('#answerValidate').empty();
        $('#answerForm').val('');

            $.ajax({
                data: {currentWord: $('#question').text(),
                        index: currentQuizIndex},
                type: 'post',
                url: '/next'
            }).done(function(data){
                $('#question').text(data.message)
                $('#answerValidate').text(data.results)
                currentQuizIndex = data.index
            })

        })


})