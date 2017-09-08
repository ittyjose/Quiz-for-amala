// Array of all the questions and choices to populate the questions. This might be saved in some JSON file or a database and we would have to read the data in.
var numberOfQuestions=5;
var quizName="Amala";
//in milliseconds
var quizTime=60000;
var warningTime=6000;
var current_question_index=0;


var all_questions=[];
//Certificate Heads
var head1="Certificate of Completion";
var head2="This is to certify that";
var name;
var head3="has completed the course";
var head4="Nursing Quiz Competition";
var head5="With score of"; 
var scorePrint;
var scoreOutOf=numberOfQuestions;
var head6="Dated";
var date;
var flag=0;
// An object for a Quiz, which will contain Question objects.
var Quiz = function(quiz_name) {
  // Private fields for an instance of a Quiz object.
  this.quiz_name = quiz_name;

  
  // This one will contain an array of Question objects in the order that the questions will be presented.
  this.questions = [];
}

// A function that you can enact on an instance of a quiz object. This function is called add_question() and takes in a Question object which it will add to the questions field.
Quiz.prototype.add_question = function(question) {
  // Randomly choose where to add question
  var index_to_add_question = Math.floor(Math.random() * this.questions.length);
  this.questions.splice(index_to_add_question, 0, question);
}

// A function that you can enact on an instance of a quiz object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the quiz in.
Quiz.prototype.render = function(container) {
  // For when we're out of scope
  var self = this;
  var m_names = new Array("Jan", "Feb", "Mar", 
"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
"Oct", "Nov", "Dec");

var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
 date=curr_date + "-" + m_names[curr_month] 
+ "-" + curr_year;

  // Hide the quiz results modal
  $('#print').hide(); 
  $('#home').hide();
  $('#quiz-results').hide();
  $('#prev-question-button').prop('disabled',current_question_index==0);
  $('#next-question-button').prop('disabled',current_question_index==0);
  $('#submit-button').prop('disabled',current_question_index==0);
 
  // Write the name of the quiz
  $('#quiz-name').attr('class','animated fadeInUp').text(this.quiz_name);

  
  // Create a container for questions
  var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');
  function input(container) {
  // For when we're out of scope
var self=this;
  
  // Fill out the question label
  var question_string_h2;
  if (container.children('h2').length === 0) {
    question_string_h2 = $('<h2>').attr('class','animated zoomIn').appendTo(container);
  } else {
    question_string_h2 = container.children('h2').first();
  }
  question_string_h2.html("Name: <input type=text id='name'>")
}
 input(question_container); 
 function certificate(){
  $('#quiz').hide();
  
  $('#certificate').html('<div  style="width:1200px; height:800px; padding-top:100px;  text-align:center; ><div style="width:1150px; height:600px; padding:20px; text-align:center; ><span style="font-size:80px; font-weight:bold">'+head1+'</span><br><br><span style="font-size:35px; font-weight:italics;">'+head2+'</span><br><br><span style="font-size:40px; font-weight:bold; text-transform: uppercase; ">'+name+'</span><br/><br/><span style="font-size:25px">'+head3+'</span> <br/><br/><span style="font-size:40px">'+head4+'</span> <br/><br/><span style="font-size:25px"><b>'+head5+'</b></span><br/><br/><span style="font-size:30px; font-weight:bold">'+scorePrint+'/'+scoreOutOf+'</span><br/><br/><span style="font-size:25px"><i>'+head6+'</i></span><br><span style="font-size:30px">'+date+'</span></div></div>');
  $('#certificate').slideDown();
  $('#print').slideDown();
  
 }
  // Helper function for changing the question and updating the buttons
  function change_question() {

    $('#start').hide("slideUp");
    self.questions[current_question_index].render(question_container);
    $('#prev-question-button').prop('disabled', current_question_index === 0);
    $('#next-question-button').prop('disabled', current_question_index === numberOfQuestions - 1);
    // Determine if all questions have been answered
    var all_questions_answered = true;
    for (var i = 0; i < numberOfQuestions; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  }
  
  // Render the first question
  $('#start').click(function() {
    name = $("input#name").val();
   
  change_question();
  var countDownDate = new Date().getTime()+quizTime;

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
   
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML =  hours + "h "
    + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < warningTime) {
        
        document.getElementById("timer").innerHTML = '<div id="timer" class="animated shake">'+hours + "h "
    + minutes + "m " + seconds + "s "+'</div>';
    }
    if(distance<0)
    {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "";
  }
}, 1000);
 setTimeout(function() {
    // Determine how many questions the user got right
    var score = 0;
    for (var i = 0; i < numberOfQuestions; i++) {
      if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
        score++;
      }
    }
    scorePrint=score;
    // Display the score with the appropriate message
   var percentage = score / numberOfQuestions;
    var message;
      if (percentage >= .8) {
         certificate();
      
    } else if (percentage >= .5) {
      message = 'Better luck next time.'
    } else {
      message = 'Maybe you should try a little harder.'
    }

    $('#quiz-results-message').text(message);
    $('#quiz-results-score').html(name+', got <b>' + score +'/' + numberOfQuestions + '</b> questions correct.');
    $('#quiz-results').slideDown();
    $('#quiz button').slideUp();
    $('#home').slideDown();
    if(flag==0)
    {
    var xmlhttp = new XMLHttpRequest();
var url = "https://script.google.com/macros/s/AKfycbwek3XaeXw1IkTKIFYgW2D8OVIBxbBHgAgDQH00Wb7SzOLmvLQ/exec?date="+date+"&name="+name+"&score="+scorePrint;

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         var all = this.responseText;
        
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}
  },quizTime);
  }); 
  // Add listener for the previous question button
  $('#prev-question-button').click(function() {
    if (current_question_index > 0) {
      current_question_index--;
      change_question();
    
    }
  });
  
  // Add listener for the next question button
  $('#next-question-button').click(function() {
    if (current_question_index < numberOfQuestions - 1) {
      current_question_index++;
      change_question();
    }
  });


 
  // Add listener for the submit answers button
  $('#submit-button').click(function() {
    $('#home').slideDown();
    flag=1;
    // Determine how many questions the user got right
    var score = 0;
    for (var i = 0; i < numberOfQuestions; i++) {
      if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
        score++;
      }
    }
    scorePrint=score;
    // Display the score with the appropriate message
   var percentage = score / numberOfQuestions;
    var message;
     if (percentage >= .8) {
      certificate();
    } else if (percentage >= .5) {
      message = 'Better luck next time.'
    } else {

      message = 'Maybe you should try a little harder.'
    }
    $('#quiz-results-message').text(message);
    $('#quiz-results-score').html(name+',got <b>' + score + '/' + numberOfQuestions + '</b> questions correct.');
    $('#quiz-results').slideDown();
    $('#quiz button').slideUp();
     var xmlhttp = new XMLHttpRequest();
var url = "https://script.google.com/macros/s/AKfycbwek3XaeXw1IkTKIFYgW2D8OVIBxbBHgAgDQH00Wb7SzOLmvLQ/exec?date="+date+"&name="+name+"&score="+scorePrint;

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         var all = this.responseText;
        
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

  });
  
  // Add a listener on the questions container to listen for user select changes. This is for determining whether we can submit answers or not.
  question_container.bind('user-select-change', function() {
    var all_questions_answered = true;
    for (var i = 0; i < numberOfQuestions; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  });
}

// An object for a Question, which contains the question, the correct choice, and wrong choices. This block is the constructor.
var Question = function(question_string, correct_choice, wrong_choices) {
  // Private fields for an instance of a Question object.
  this.question_string = question_string;
  this.choices = [];
  this.user_choice_index = null; // Index of the user's choice selection
  
  // Random assign the correct choice an index
  this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);
  
  // Fill in this.choices with the choices
  var number_of_choices = wrong_choices.length + 1;
  for (var i = 0; i < number_of_choices; i++) {
    if (i === this.correct_choice_index) {
      this.choices[i] = correct_choice;
    } else {
      // Randomly pick a wrong choice to put in this index
      var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
      this.choices[i] = wrong_choices[wrong_choice_index];
      
      // Remove the wrong choice from the wrong choice array so that we don't pick it again
      wrong_choices.splice(wrong_choice_index, 1);
    }
  }
}

// A function that you can enact on an instance of a question object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the question in. This question will "return" with the score when the question has been answered.
Question.prototype.render = function(container) {
  // For when we're out of scope
  var self = this;
  
  // Fill out the question label
  var question_string_h2;
  if (container.children('h2').length === 0) {
    question_string_h2 = $('<h2>').appendTo(container);
  } else {
    question_string_h2 = container.children('h2').first();
  }
  question_string_h2.text(current_question_index+1+") "+this.question_string);
  
  // Clear any radio buttons and create new ones
  if (container.children('input[type=radio]').length > 0) {
    container.children('input[type=radio]').each(function() {
      var radio_button_id = $(this).attr('id');
      $(this).remove();
      container.children('label[for=' + radio_button_id + ']').remove();
    });
  }
  for (var i = 0; i < this.choices.length; i++) {
    // Create the radio button
    var choice_radio_button = $('<input>')
      .attr('id', 'choices-' + i)
      .attr('type', 'radio')
      .attr('name', 'choices')
      .attr('value', 'choices-' + i)
      .attr('checked', i === this.user_choice_index)
      .appendTo(container);
    
    // Create the label
    var choice_label = $('<label>')
      .text(this.choices[i])
      .attr('for', 'choices-' + i).attr('class','animated fadeInUp')
      .appendTo(container);
  }
  
  // Add a listener for the radio button to change which one the user has clicked on
  $('input[name=choices]').change(function(index) {
    var selected_radio_button_value = $('input[name=choices]:checked').val();
    
    // Change the user choice index
    self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));
    
    // Trigger a user-select-change
    container.trigger('user-select-change');
  });
}

function home(){
  window.open("quiz.html");
}
// "Main method" which will create all the objects and render the Quiz.
$(document).ready(function() {

  $(document).bind("contextmenu",function(e) {
 e.preventDefault();
});
$(document).keydown(function(e){
    if(e.which === 123){
       return false;
    }
    if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
});

var res;
var xmlhttp = new XMLHttpRequest();
var url = "https://script.google.com/macros/s/AKfycbxFQJiVI5nA2Koc1RS-Ph9ruOSF8uRFUjlDIIlU874hwDRJ-1Y/exec";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         var all = JSON.parse(this.responseText);
         quizStart(all.question);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

 function quizStart(all_questions)
 {
    var quiz = new Quiz(quizName);
  
  // Create Question objects from all_questions and add them to the Quiz object
  for (var i = 0; i < all_questions.length; i++) {
    // Create a new Question object
    var question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);
    
    // Add the question to the instance of the Quiz object that we created previously
    quiz.add_question(question);
  }
    var quiz_container = $('#quiz');
  quiz.render(quiz_container);

}
  // Create an instance of the Quiz object
  
  
  // Render the quiz
  
});