/* The ones below are the ones that will
   be registered to the HTML Code */

/////////////////
// Event Functions
/////////////////

function clickChoice(e)
{
  clearTimeout(ctimer); // stop timer once choice selected
  e.target.style.color = 'magenta';
  updateScore(checkChoice(e));
  if(document.getElementById('next') == null)
    document.getElementById('control').appendChild(getNewButton('Next', 'next', clickNext));
  document.getElementById('next').style.borderColor = 'magenta';
  for(var i=0; i<quest[currentQuest][problemTaken[problemTaken.length-1]].choices.length; i++)
    document.getElementById('label '+i).removeEventListener('click', clickChoice, false);
  var panel = document.getElementById('explain');
  var explanation = document.createElement('span');
  if(checkChoice(e))
    explanation.innerHTML = 'Right. <br />'
  else
    explanation.innerHTML = 'Wrong. <br />'
  explanation.innerHTML += quest[currentQuest][problemTaken[problemTaken.length-1]].explanation;
  explanation.setAttribute('id', 'explanation');
  panel.appendChild(explanation);
}

function clickStart()
{
  var control = document.getElementById('control');
  // Remove Start Button
  control.removeChild(document.getElementById('start'));
  // Create Button for Quit Button
  control.appendChild(getNewButton('Quit', 'quit', clickQuit));
  var theScore = document.getElementById('score');
  var rights = document.createElement('span');
  rights.setAttribute('id', 'right');
  rights.innerHTML = score.right;
  var wrongs = document.createElement('span');
  wrongs.setAttribute('id', 'wrong');
  wrongs.innerHTML = score.wrong;
  theScore.innerHTML = 'Rights: ';
  theScore.appendChild(rights);
  theScore.innerHTML += ' | Wrongs: ';
  theScore.appendChild(wrongs);
  $("#score").prepend("Time: <span id='timer'>"+time+"</span> <div id='timerContainer'><div id='timerBar'></div></div>");//adds timer to score on start
  clickNext();
}

function clickNext()
{
  //reset timer for each set of questions
  time = totalTime;
  barColor = '#0000FF';
  $("#timer").attr('style','color: black;');
  //clickNext implementation
  control = document.getElementById('control');
  var panel = document.getElementById('explain');
  if(document.getElementById('next') !== null)
    control.removeChild(document.getElementById('next'));
  //added to delete explain
  if(document.getElementById('explanation') !== null)
    panel.removeChild(document.getElementById('explanation'));
  deleteAllChildElements(document.getElementById('display'));
  if(quest[currentQuest].length-1 === problemTaken.length)
  {
    var message = document.createElement('p');
    message.innerHTML = 'Quiz Completed';
    display.appendChild(message);
    clickQuit();
  }
  else
  {
    var valid = false;
    var newProblem;
    while( !valid )
    {
      newProblem = Math.floor(Math.random()*(quest[currentQuest].length-1) + 1);
      if(problemTaken.indexOf(newProblem) === -1)
        valid = true;
    }
    problemTaken.push(newProblem);
    updateQuestion(newProblem);
  }
  /* jQuery timer animation */ 
  countDownNow();
}

function clickQuit()
{
  deleteAllChildElements(document.getElementById('score'));
  deleteAllChildElements(document.getElementById('control'));
    deleteAllChildElements(document.getElementById('explain')); //AD: added to delete explain on quit
  document.getElementById('control').appendChild(getNewButton('New Quiz', 'restart', clickRestart));
  deleteAllChildElements(document.getElementById('display'));
  var message = document.createElement('p');
  var total = score.right+score.wrong;
  message.innerHTML = 'Score: ' + score.right + '/' + total;
  document.getElementById('display').appendChild(message);
  var message = document.createElement('p');
  message.innerHTML = 'Quiz' + ( (quest[currentQuest].length-1 === problemTaken.length) ? ' ' : ' Not ' ) + 'Completed';
  document.getElementById('display').appendChild(message);
}

function clickRestart()
{
  location.reload();
}

/* The ones below are the ones that will
   not be registered to the HTML Code */

///////////////////
// Helper Functions
///////////////////

//timer countdown function
function countDownNow()
{
  if(time > 0)
  {
    time--;
    var newWidthPer = ((time/totalTime)*100);
    if(time > 0)
    {
      ctimer = setTimeout(countDownNow, 1000);
      if(time % Math.ceil(totalTime/steps) == 0){barColor = colorUpdate();} //only update once every 10 seconds
      if(time<10){$("#timer").attr('style','color: red;');} //timer turns red last 10 seconds
      $("#timer").html(time); //updates timer
      $("#timerBar").attr('style','width: ' + newWidthPer + '%; background-color: ' + barColor + ';'); //updates timerBar
    }
    else
    {
      //timeout condition
      updateScore(false);
      clickNext();
    }
  }
}

//function to change bar color from blue to red as time decreases
function colorUpdate()
{
  var color = parseInt(barColor.substr(1), 16); 
  var increment = parseInt("0x21FFDE", 16); //red gets to FF in 8 steps
  color = color + increment;
  color = "#" + color.toString(16);
  return color;
}

function checkChoice(arg)
{
  if(arg.target.innerHTML === quest[currentQuest][problemTaken[problemTaken.length-1]].answer)
    return true;
  else
    return false;
}

function updateScore(arg)
{
  if(arg === false)
    document.getElementById('wrong').innerHTML = ++score.wrong; //increments wrong answers
  else
    document.getElementById('right').innerHTML = ++score.right; //increments right answers
}

function deleteAllChildElements(child)
{
  for(var i=child.childNodes.length-1; i>-1; i--)
    child.removeChild(child.childNodes[i]);
}

function getNewButton(value, id, fcn)
{
  var newButton = document.createElement('button');
  newButton.setAttribute('id', id);
  newButton.innerHTML = value;
  newButton.addEventListener('click', fcn, false);
  return newButton;
}

function updateQuestion(newProblem)
{
  var newQuestion = document.createElement('p');
  newQuestion.innerHTML = quest[currentQuest][newProblem].question;
  newQuestion.setAttribute('id', 'question')
  document.getElementById('display').appendChild(newQuestion);
  var newList = document.createElement('ul');
  newList.setAttribute('id', 'choices');
  var newChoice;
  var newLabel;
  for(var i=0; i<quest[currentQuest][newProblem].choices.length; i++)
  {
    newChoice = document.createElement('li');
    //newChoice.innerHTML = quest[currentQuest][newProblem].choices[i];
    //newChoice.addEventListener('click', clickChoice, false);
    newChoice.setAttribute('id', 'choice '+ i);
    newChoice.setAttribute('class', 'choiceList');
    newList.appendChild(newChoice);
  
    //create labels for the list items
    newLabel = document.createElement("label");
    newLabel.addEventListener('click', clickChoice, false);
    newLabel.setAttribute('id', 'label '+ i);
      newLabel.setAttribute('class', 'choice');
    newLabel.htmlFor = newChoice.id;
    var newLabelText = document.createTextNode(quest[currentQuest][newProblem].choices[i]);
    newLabel.appendChild(newLabelText);
    newChoice.appendChild(newLabel);
  }
  document.getElementById('display').appendChild(newList);
}






















