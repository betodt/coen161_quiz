var score =
{
  'right' : 0,
  'wrong' : 0
};
var totalTime = 30; //initial time allotment
var time = totalTime +1; //correction factor
var barColor = '#0000FF';
var steps = 8; //number of steps that colorUpdate performs before barColor rolls over
var ctimer;
// The Quest being taken
var currentQuest;
// The Problems Already Taken
var problemTaken = [];

var quest =
[
  [ // Section 1 (Index 0)
    { // Metadata (Index 0)
      'topic' : 'The Frugal Innovation Lab Quiz!'
      // add more things if necessary
    },
    { // Problem 1 (Index 1)
      'question' : 'Which of the following words are included in the definition/derivation of the word \'Frugal?\'',
      'choices' : ['A. Virtuous', 'B. To Enjoy' , 'C. Cheap', 'D. Of The Essence', 'E. A, B, & D'],
      'answer' : 'E. A, B, & D',
      'explanation' : 'Frugal is derived from the same root word as fruit, giving it the same sense of enjoyment and virtue as the essential nutrient.'
    },
    { // Problem 2 (Index 2)
      'question' : 'In what year is it estimated that the cumulative GDP of emerging markets (excluding China) will surpass that of the developed world?',
      'choices' : ['A. 2014', 'B. 2016', 'C. 2022', 'D. 2031'],
      'answer' : 'B. 2016',
      'explanation' : 'Experts predict that in 2016, the developing world (excluding China) will hold a majority of the world\'s GDP.'
    },
    { // Problem 3 (Index 3)
      'question' : 'Which of the following is the first step of the Design Innovation Process?',
      'choices' : ['A. Define', 'B. Prototype', 'C. Ideate', 'D. Empathize', 'E. Test'],
      'answer' : 'D. Empathize',
      'explanation' : 'Empathy is the first step into recognizing the needs that need to be met during the design process.'
    },
    { // Problem 4 (Index 4)
      'question' : 'What percentage of the world now has access to a mobile phone?',
      'choices' : ['A. 28%', 'B. 46%', 'C. 59%', 'D. 81%', 'E. 97%'],
      'answer' : 'D. 81%',
      'explanation' : 'With mobile technology getting cheaper and cheaper, more of the world has access to the same technologies we have enjoyed in the last decade.'
    },
    { // Problem 5 (Index 5)
      'question' : 'What is \'reverse innovation\'?',
      'choices' : ['A. Learning how to design a product by breaking it apart and seeing how it was built.', 
          'B. Engineering for the emerging market consumer before the developed world consumer.',
          'C. An innovation that is developed in an emerging market and is eventually utilized in a mature market.'],
      'answer' : 'C. An innovation that is developed in an emerging market and is eventually utilized in a mature market.',
      'explanation' : 'Through frugal design, we can develop a product that is truly efficient and takes advantage of the scarce resources available in the emerging markets, so when the product is brought to a mature market, it is much more stable.'
    }
  ],
  [ // Section 2 (Index 1)
    { // Metadata (Index 0)
      'topic' : 'The Geography Quiz!'
    },
    { // Problem 1 (Index 1)
      'question' : 'How many continents are there on planet Earth?',
      'choices' : ['A. 8', 'B. 7', 'C. 6', 'D. 5', 'E. B, C, & D'],
      'answer' : 'E. B, C, & D',
      'explanation' : 'The seven-continent model is usually taught in China, India, parts of Western Europe and most English-speaking countries.\nThe six-continent combined-Eurasia model is preferred by the geographic community[citation needed], Russia, Eastern Europe, and Japan.\nThe six-continent combined-America model is used in Spanish-speaking countries and in some parts of Europe including Greece.\nThe UN uses a 5 continent model where they separate Europe from Asia, and ignore Antarctica for not having a permanent population. The 5 continents would be: America, Europe, Africa, Asia and Australia/Oceania/Australasia'
    },
    { // Problem 2 (Index 2)
      'question' : 'What is the largest continent in the World?',
      'choices' : ['A. Europe', 'B. Australia', 'C. Asia', 'D. Antarctica'],
      'answer' : 'C. Asia',
      'explanation' : 'Asia covers 43,820,000 square kilometers, which accounts for 29.5% of Earth\'s landmass. It has 60% of the total population at 4,164,252,000 people.'
    },
    { // Problem 3 (Index 3)
      'question' : 'Which of the following is NOT a lake?',
      'choices' : ['A. Michigan', 'B. Tahoe', 'C. Chihuahua', 'D. Erie', 'E. Ontario'],
      'answer' : 'C. Chihuahua',
      'explanation' : 'Michigan, Erie, and Ontario are part of the Great Lakes. Lake Tahoe is found in the Sierra Nevada.'
    },
    { // Problem 4 (Index 4)
      'question' : 'What percentage of the world now has never seen snow?',
      'choices' : ['A. 28%', 'B. 46%', 'C. 59%', 'D. 81%', 'E. 95%'],
      'answer' : 'B. 46%',
      'explanation' : 'From a sample of 10 regions, including China, India, USA, South America, and Africa, of a total population of around 4,026,005,000, about 1,869,606,000 people haven\'t seen snow.'
    },
    { // Problem 5 (Index 5)
      'question' : 'What is \'global warming\'?',
      'choices' : ['A. An increase in global temperature due to the greenhouse effect caused by carbon dioxide pollution.',
          'B. The time of year when people buy puffy jackets and ugly sweaters for the winter.',
          'C. An invention of car manufacturers to sell more hybrids.'],
      'answer' : 'A. An increase in global temperature due to the greenhouse effect caused by carbon dioxide pollution.',
      'explanation' : 'While little we are still learning more about the causes of global warming, we do know that Earth\'s temperature is rising. Also B and C are just silly.'
    }
  ],
  [ // Section 3 (Index 2)
    { // Metadata (Index 0)
      'topic' : 'The U.S. History Quiz!'
    },
    { // Problem 1 (Index 1)
      'question' : 'Who wrote the Declaration of Independence?',
      'choices' : ['A. Thomas Jefferson', 'B. John Adams', 'C. James Madison', 'D. John Hancock', 'E. Thomas Lynch'],
      'answer' : 'A. Thomas Jefferson',
      'explanation' : 'While many people had their hand in the writing the declaration, Thomas Jefferson was the primary author.'
    },
    { // Problem 2 (Index 2)
      'question' : 'Who wrote the US Constitution?',
      'choices' : ['A. Thomas Jefferson', 'B. John Adams', 'C. James Madison', 'D. John Hancock', 'E. Thomas Lynch'],
      'answer' : 'C. James Madison',
      'explanation' : 'James Madison is hailed as the "Father of the Constitution" for drafting the constitution and also championing the Bill of Rights.'
    },
    { // Problem 3 (Index 3)
      'question' : 'What was the first set of laws in the United States?',
      'choices' : ['A. The Constitution', 'B. Articles of Confederation', 'C. Declaration of Independence', 'D. Bill of Rights'],
      'answer' : 'B. Articles of Confederation',
      'explanation' : 'The articles were a first attempt at a legislative structure for the new country but ultimately failed because they delegated too much power to the states and didn\'t give the federal government enough power to enforce the laws it established.'
    },
    { // Problem 4 (Index 4)
      'question' : 'What year was the United States founded?',
      'choices' : ['A. 1492', 'B. 1585', 'C. 1776', 'D. 1865', 'E. 2014'],
      'answer' : 'C. 1776',
      'explanation' : 'The Declaration of Independence was signed and ratified on July 4th, 1776 marking the birth of a new nation.'
    },
    { // Problem 5 (Index 5)
      'question' : 'What is the national bird?',
      'choices' : ['A. Turkey', 'B. Eagle', 'C. Bear'],
      'answer' : 'B. Eagle',
      'explanation' : 'Benjamin Franklin sought to make the turkey the national bird, but was the bald headed eagle was a more popular pick.'
    }
  ]
];

// for testing: alert(quest[0][0].question);