let millionareGame = document.querySelector('.millionare__game'),
    gameInner = document.querySelector('.millionare__game-inner'),

    startBtn = document.querySelector('.millionare__start-btn'),    
    endBtn = document.querySelector('.millionare__end-btn'),

    actualQuestion = document.querySelectorAll('.millionare__question'),
    btnAnswers = document.querySelectorAll('.millionare__answer'),

    winBlock = document.querySelectorAll('.millionare__wins-block'),
   
    helpBtns = document.querySelectorAll('.millionare__info'),    
    helpFifty = document.querySelector('.fifty-fifty'),
    helpHall = document.querySelector('.hall-help');

// Объект с ответами
const answers = {
  question_1: 'Бразилия',
  question_2: 'Киев',
  question_3: 'Динамо',
  question_4: 'Оранжево-черные',
  question_5: 'Динамо Киев',
  question_6: 'Аргентина',
  question_7: 'Мирча Луческу',
  question_8: 'Криштиану Роналду',
  question_9: 'За удар соперника головой',
  question_10: 'Роман Абрамович',
  question_11: 'Семь',
  question_12: 'Андрей Шевченко',
  question_13: 'Армандо',
  question_14: '28 лет',
  question_15: 'Три',
};


// Кнопка старта игры
// Вешаю обычное событие на кнопку и при нажатии отображаю блок с самой игрой
startBtn.addEventListener('click', () => {
  startBtn.classList.add('animate__animated', 'animate__backOutUp');
  millionareGame.classList.remove('animate__backOutDown');
  setTimeout(() => {
    millionareGame.style.display = 'block';
    millionareGame.classList.add('animate__animated', 'animate__backInUp');
    startBtn.style.display = 'none';
    setTimeout(() => {
      gameInner.classList.add('animate__animated', 'animate__flipInX');
      endBtn.style.left = (actualQuestion[0].offsetWidth - endBtn.offsetWidth) / 2 + 'px';
    }, 1000);
  }, 500);
  setTimeout(() => {
    endBtn.style.opacity = '1';
  }, 1000);
});


// С помощью метода forEach, перебираю правильные ответы и сохраняю их в функцию, чтобы в дальнейшем покрасить правильные ответы
btnAnswers.forEach((btnAnswer) => { 
  btnAnswer.addEventListener('click', (e) => {   
    let numberQuestion = btnAnswer.parentElement.parentElement.classList[1];
    let userAnswer = e.target.innerText;
    let blockAnswer = e.target;

    let blockQuestion = blockAnswer.parentElement;
    // Также запрещаю двойное нажатие с помощью pointer-events: none;
    blockQuestion.classList.add('block-event');

    // Передаем нужные параметры в функцию для проверки правильности ответа
    correctnessAnswer(numberQuestion, userAnswer, blockAnswer, blockQuestion);
  });
});


// Далее функция проверки корректного ответа, с помощью условного оператора if/else 
function correctnessAnswer(numberQuestion, userAnswer, blockAnswer, blockQuestion) {
  // Если ответ правильный, красим блок в зеленый цвет
  if(answers[numberQuestion] === userAnswer) {
    setTimeout(() => {
      blockAnswer.classList.add('green-bg');
    }, 500);
  // Если не правильный - в красный
  } else {
    setTimeout(() => {
      blockAnswer.classList.add('error-answer');
      setTimeout(() => {        
        let blockAnswer = getCorrectAnswer(blockQuestion.children, numberQuestion);
        blockAnswer.classList.add('green-bg');
      }, 1000);
    }, 500);    
    setTimeout(() => {
    }, 3500);
    return;
  }  
  setTimeout(() => {
    getBlockQuestion();
  }, 2000);
}

// Функция добавляет класс к блоку с выигрышем
function getWinBlock(num) {
  let numBlock = (winBlock.length) - num;

  if(numBlock === 10 || numBlock === 5) {
    winBlock[numBlock + 1].classList.remove('wins-active');
    winGuaranteed(numBlock);
  } 
  else if(numBlock === 14) {
    winBlock[numBlock].classList.add('wins-active', 'animate__animated', 'animate__pulse');
  }
  else if(numBlock === 0) {
    winBlock[numBlock + 1].classList.remove('wins-active');
    winBlock[numBlock].classList.add('animate__animated', 'animate__heartBeat', 'win-guaranteed');
    winGuaranteed(numBlock);
    setTimeout(() => {
    }, 200);
  }
  else {
    winBlock[numBlock + 1].classList.remove('wins-active');
    winBlock[numBlock].classList.add('wins-active', 'animate__animated', 'animate__pulse');
  }
}

// Реализация не сгораемой суммы, путем добавления класса
function winGuaranteed(numBlock) {
  if(numBlock === 10) {
    winBlock[10].classList.add('animate__animated', 'animate__tada', 'win-guaranteed');
  }
  if(numBlock === 5) {
    winBlock[10].classList.remove('animate__animated', 'animate__tada', 'win-guaranteed');
    winBlock[5].classList.add('animate__animated', 'animate__tada', 'win-guaranteed');
  }
  if(numBlock === 0) {
    winBlock[5].classList.remove('animate__animated', 'animate__tada', 'win-guaranteed');
  }
}

// Создаем функцию с циклом для отображения актуалього вопроса
function getBlockQuestion() {
  for(let i = 0; i <= actualQuestion.length; i++) {
    if(i ===  actualQuestion.length - 1) {
      getWinBlock(i + 1);
      return;
    }
    if(actualQuestion[i].classList.contains('question-active')) {
      actualQuestion[i].classList.add('animate__fadeOut');
      actualQuestion[i].classList.remove('question-active', 'animate__animated', 'animate__pulse');
      
      setTimeout(() => {
          actualQuestion[++i].classList.add('question-active', 'animate__animated', 'animate__pulse');
          getWinBlock(i);
      }, 200);
      return;
    }
  }
}



// Реализация блока с подсказками

// Для начала находим находим активный вопрос на которым находимся 
function activeQuestion() {
  for(let i = 0; i <= actualQuestion.length; i++) {
    if(actualQuestion[i].classList.contains('question-active')) {
      return actualQuestion[i];
    }
  }
}

// Потом находим правильный ответ
function getCorrectAnswer(corectAnswer, numberQuestion) {
  for(let i = 0; i < corectAnswer.length; i++) {
    if(corectAnswer[i].innerText === answers[numberQuestion]) {
      return corectAnswer[i];
    }
  }
}

// Cоздаем фукнцию с циклом неправильных ответов
function randomAnswer(blockWrongAnswer, blockCorrectAnswer, numRandom) {
  for(let i = 0; i < blockWrongAnswer.length; i++) {
    // Проверяем если случайный блок совпал с блоком правильный ответ, то меняем его на другой
    if(blockWrongAnswer[numRandom] === blockCorrectAnswer) {
      if(numRandom === blockWrongAnswer.length - 1) {
        numRandom -= 1;
      } else if (numRandom === 0) {
        numRandom += 1;
      } else {
        numRandom += 1;
      }
    }

    // Возвращаем случайный блок с ответом
    return blockWrongAnswer[numRandom];
  }
}

// Подсказка 50/50
helpFifty.addEventListener('click', function removeTwoBlocks() {
  // Вызываем функцию для получения блока с вопросом на котором находится пользователь
  let blockActiveQuestion = activeQuestion();
  
  let numRandom = Math.floor(Math.random() * blockActiveQuestion.children[1].children.length);

  // blockWrongAnswer - объект с ответами
  let blockWrongAnswer = blockActiveQuestion.children[1].children;

  // nameQuestion - имя вопроса(string)
  let nameQuestion = blockActiveQuestion.classList[1];

  // Вызываем функцию для получения блока с правильным ответом
  let blockCorrectAnswer = getCorrectAnswer(blockWrongAnswer, nameQuestion);
  blockCorrectAnswer.classList.add('fifty-active');

  // Вызываем функцию для получения случайного блока с ответом
  let blockRandom = randomAnswer(blockWrongAnswer, blockCorrectAnswer, numRandom);
  blockRandom.classList.add('fifty-active');
 
  removeBlocks(blockWrongAnswer);  
  helpFifty.classList.add('millionare__info_spent', 'block-event');
});

// Создаем функцию с циклом на проверку правильного ответа 
function getActiveBlockLength(parentChild) {
  
  let arrActiveAnswer = [];
  // Цикл проверяет наличие класса в каждом блоке
  for(let i = 0; i < parentChild.children.length; i++) {
    if(parentChild.children[i].classList.contains('fifty-active')) {
      arrActiveAnswer.push(i);
    }
  }
  if(arrActiveAnswer.length > 0) {
    // Возвращаем случайное число из массива
    let numIndexRandom = Math.floor(Math.random() * arrActiveAnswer.length);
    return arrActiveAnswer[numIndexRandom];
  }
  // Возвращаем случайное число от 0 - 3
  return Math.floor(Math.random() * parentChild.children.length);
}

// Убираем ненужные блоки
function removeBlocks(blockWrongAnswer) {
  for(let i = 0; i < blockWrongAnswer.length; i++) {
    if(!blockWrongAnswer[i].classList.contains('fifty-active')) {
      blockWrongAnswer[i].classList.add('animate__animated', 'animate__zoomOut');
    }
  }
}

// Подсказка помощь зала
helpHall.addEventListener('click', function getHelpHall() {
  let blockActiveQuestion = activeQuestion();
  
  let blockActiveQuestionChild = blockActiveQuestion.children[1];
  checkCorrectAnswer(blockActiveQuestionChild);

  // Вызываем цикл, который показывает рандомное значение предполагаемого правильного ответа
  for(let i = 0; i < blockActiveQuestionChild.children.length; i++) {    
    let percentageRandom = Math.floor(Math.random() * 101);    
    blockActiveQuestionChild.children[i].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
    
    setTimeout(() => {
      blockActiveQuestionChild.children[i].children[0].style.width = percentageRandom + '%';      
    }, 1000);
  }

  // Блокируем повторное использование фукнции, добавляя специальный класс
  helpHall.classList.add('millionare__info_spent', 'block-event');
});


// Создаем функцию с циклом на проверку правильного ответа 
function checkCorrectAnswer(parentBlock) {
  for(let i = 0; i < parentBlock.children.length; i++) {
    if(parentBlock.children[i].children[0]) {
      parentBlock.children[i].children[0].style.width = 0;     
      setTimeout(() => {
        parentBlock.children[i].children[0].remove();
      }, 1000);
    }
  }
}




//Кнопка конец игры
endBtn.addEventListener('click', () => {
  millionareGame.classList.remove('animate__backInUp');
  gameInner.classList.remove('animate__flipInX');
  millionareGame.classList.add('animate__animated', 'animate__backOutDown');
  setTimeout(() => {
    millionareGame.style.display = 'none';
    startBtn.style.display = 'block';
    startBtn.classList.remove('animate__backOutUp');
    startBtn.classList.add('animate__backInDown');
  }, 1000);
  setTimeout(() => {
    startBtn.classList.remove('animate__backInDown');
  }, 2000); 

  startNewGame();
});

// Обнуляю блок с вопросами
function getStartQuestions() {
  for(let i = 0; i < actualQuestion.length; i++) {
    actualQuestion[i].children[1].classList.remove('block-event');
    actualQuestion[i].classList.remove('animate__fadeOut');
    if(actualQuestion[i].classList.contains('question-active')) {
      actualQuestion[i].classList.remove('question-active');
    }
    actualQuestion[0].classList.add('question-active');
  }
}

// Обнуляю блок с ответами
function getStartBlockAnswers() {
  for(let i = 0; i < btnAnswers.length; i++) {
    if(btnAnswers[i].children[0]) {
      btnAnswers[i].children[0].remove();
    }
    btnAnswers[i].classList.remove('green-bg', 'error-answer', 'fifty-active', 'animate__zoomOut');
  }
}

// Обнуляю блок с выигрышем
function getStartBlockWins() {
  for(let i = 0; i < winBlock.length; i++) {
    winBlock[i].classList.remove('wins-active', 'animate__animated', 'animate__pulse', 'win-guaranteed', 'animate__tada', 'animate__heartBeat');
  }
}

// Обнуляю блок подсказок
function getStartBlocksHelp() {
  for(let i = 0; i < helpBtns.length; i++) {
    helpBtns[i].classList.remove('block-event', 'millionare__info_spent');
  }
}

// Функция обнуляет настройки игры и запускает игру сначала
function startNewGame() {
  getStartQuestions();
  getStartBlockAnswers();
  getStartBlockWins();
  getStartBlocksHelp();
}

