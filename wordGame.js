'use strict';
var wordList = [
    'cat',
    'JavaScript',
    'dog',    
    'document',
    'bed',
    'element',
    'object',
    'property',
    'event',
    'propagation',
    'listener',
    'transition',
    'animation'
];

var index = 0;

var answer = wordList[index];

var guessCounter = 0;

var wrongLetters = '';

var display = displayBlanks(answer);



document.getElementById("display").textContent = display;

document.getElementById("guessbutton").addEventListener("click",update, false);

document.getElementById("restart").addEventListener("click", restart, false);



function displayBlanks(word) {
    var counter;
    // loop counter
    var result = '';
    // string to be returned    
    for (counter = 1; counter <= word.length; counter++) {
        result = result + '-';
    }
    return result;
};


function update(){//get the input letter
    
    var guess = document.getElementById("guess").value;
    
    if (guess !== ''){      
    
    	var newDisplay = checkGuess(guess, answer, display);
    
        document.getElementById("display").textContent = newDisplay;
    
        if (newDisplay !== display){
        
           display = newDisplay;
       }    
        
       document.getElementById("guess").value = null;  
   }     
    
}


function checkGuess(guess, answer, display) {
    
        var lowerAnswer = answer.toLowerCase();
        var lowerGuess = guess.toLowerCase();
        var position;        
        
        // index of one occurence of guess in answer
        position = lowerAnswer.indexOf(lowerGuess);        
        
        if (position < 0){//the letter is wrong
            guessCounter = guessCounter + 1;
            document.getElementById("indicator").value ++;
            wrongLetters = wrongLetters + guess;       
            document.getElementById("wrong").textContent = wrongLetters;
        }
        
        while (position >= 0) {
            display = updateDisplay(display, lowerGuess, position);
            position = lowerAnswer.indexOf(lowerGuess, position + 1);
        }
        
        if (display == lowerAnswer)
            document.getElementById("result").textContent = "Congratulation! You win!";
            
        if  ((display !== lowerAnswer) &&  (guessCounter == 10))
            document.getElementById("result").textContent = 'The rigt answer is "' + answer + '"';
        
        return display;
    };
    
function restart(){	//to restart the game
	
	guessCounter = 0;
	
	if (index == wordList.length - 1)
	    index = 0;
	else   
	    index = index + 1;
	
	answer = wordList[index];
	
	console.log(answer);
	
	wrongLetters = '';
	
	document.getElementById("result").textContent = '';

   display = displayBlanks(answer);
   
   document.getElementById("display").textContent = display;

   document.getElementById("wrong").textContent = wrongLetters;
   
   document.getElementById("indicator").value  = 0;
   
   document.getElementById("guess").value = null;
    
}


function updateDisplay(currentDisplay, guess, position) {
    return currentDisplay.substring(0, position) +
             guess +
             currentDisplay.substring(position + 1);
};

 
