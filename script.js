var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var action = ['up', 'down', 'left', 'right'];
var grammar = '#JSGF V1.0; grammar action; public <action> = ' + action.join(' | ') + ' ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dx = 50;
var dy = 50;
var boxx = 225;
var boxy = 225;
ctx.beginPath();
ctx.fillRect(225, 225, 150, 150);
var diagnostic = document.getElementById("diagnostic");
function start(){
    recognition.start();
}
function move(act){
    if(act == "up"){
        if(boxy - dy <= 0){
            boxy = 0;
        }else{
            boxy -= dy;
        }
        ctx.clearRect(0, 0, 600, 600);
        ctx.fillRect(boxx, boxy, 150, 150);
    }else if(act == "down"){
        if(boxy + dy >= 450){
            boxy = 450;
        }else{
            boxy += dy;
        }
        ctx.clearRect(0, 0, 600, 600);
        ctx.fillRect(boxx, boxy, 150, 150);
    }else if(act == "left"){
        if( boxx - dx <= 0){
            boxx = 0;
        }else{
            boxx -= dx;
        }
        ctx.clearRect(0, 0, 600, 600);
        ctx.fillRect(boxx, boxy, 150, 150);
    }else if(act == "right"){
        if( boxx + dx >= 450){
            boxx = 450;
        }else{
            boxx += dx;
        }
        ctx.clearRect(0, 0, 600, 600);
        ctx.fillRect(boxx, boxy, 150, 150);
    }else{
        console.log("Not recognised");
    }
}
recognition.onresult = function(event) {
    var act = event.results[0][0].transcript;
    diagnostic.textContent = act;
    move(act);
}
recognition.onspeechend = function() {
    recognition.stop();
    diagnostic.textContent = "Click Start";
}
recognition.onnomatch = function(event) {
    diagnostic.textContent = 'I didnt recognise that action.';
}
recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}