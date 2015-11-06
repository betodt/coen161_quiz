
/////////////////////
// Initialization
/////////////////////

// Choose Random Quiz
currentQuest = Math.floor(Math.random()*(quest.length));
document.getElementById('quizTitle').innerHTML = quest[currentQuest][0].topic;



//////////////////////
// Event Registeration
//////////////////////
document.getElementById('start').addEventListener('click', clickStart, false);
