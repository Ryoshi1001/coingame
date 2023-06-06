
    let scorenumber = JSON.parse(localStorage.getItem('scorenumber')) || {
      wincoins: 0, 
      losecoins: 0,  
      samecoins: 0
    };

  updateElementScore(); 
  let isComputerPlay = false; 
  let gametime; 

  
  document.querySelector('.js-computer-play-btn')
    .addEventListener('click', () => {
      autoPlay(); 
    }); 
  

 // function autoPlay = () => {}
  function autoPlay() {
    if (!isComputerPlay) {
     gametime = setInterval(() => {
        const playerMove = computerTurn(); 
        playGame(playerMove); 
      }, 1300); 
      isComputerPlay = true; 
      document.querySelector('.js-computer-play-btn')
      .innerHTML = 'Stop Computer Play'; 
    } else {
      clearInterval(gametime); 
      isComputerPlay = false; 
      document.querySelector('.js-computer-play-btn')
      .innerHTML = 'Computer Play'; 
    }
  }

  document.querySelector('.js-rock-btn') 
    .addEventListener('click', () => {
    playGame('rock'); 
  }); 

  document.querySelector('.js-paper-btn')
    .addEventListener('click', () => {
      playGame('paper'); 
    }); 

  document.querySelector('.js-scissors-btn') 
    .addEventListener('click', () => {
      playGame('scissors'); 
    });

  document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock'); 
      } else if (event.key === 'p') {
        playGame('paper'); 
      } else if (event.key === 's') {
        playGame('scissors'); 
      } else if (event.key === 'a') {
        autoPlay(); 
      } else if (event.key === 'Backspace') {
        // 12w scorereset(); 
        //12x 
        rstcoinspara(); 
      }; 
  });

  function playGame(playerMove) {
    let computerPick = computerTurn(); 

    let result = ''; 

    if (playerMove === 'scissors') {
      if (computerPick === 'rock') {
        result = 'can lose coins';
      } else if (computerPick === 'paper') {
        result = 'can win coins';
      } else if (computerPick === 'scissors') {
        result = 'samecoins';
      }

    } else if (playerMove === 'paper') {
      if (computerPick === 'rock') {
        result = 'can win coins'; 
      } else if (computerPick === 'paper') {
        result = 'samecoins';
      } else if (computerPick === 'scissors') {
        result = 'can lose coins';
      }
      
    } else if (playerMove === 'rock') {
      if (computerPick === 'rock') {
        result = 'samecoins'; 
      } else if (computerPick === 'paper') {
        result = 'can lose coins'; 
      } else if (computerPick === 'scissors') {
        result = 'can win coins';
      }
    }

    if (result === 'can win coins') {
      scorenumber.wincoins += 1; 
    } else if (result === 'can lose coins') {
      scorenumber.losecoins += 1; 
    } else if (result === 'samecoins') {
      scorenumber.samecoins += 1; 
    }

    localStorage.setItem('scorenumber', JSON.stringify(scorenumber)); 

    
  updateElementScore(); 

  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-moves').innerHTML = `You 
  <img src="${playerMove}-emoji.png" alt="" class="picturedrawing">
  <img src="${computerPick}-emoji.png" alt="" class="picturedrawing">
  computer`; 
    }

  function updateElementScore() {
    document.querySelector('.js-score')
      .innerHTML = `Wincoins: ${scorenumber.wincoins}, Losecoins: ${scorenumber.losecoins}, Samecoins: ${scorenumber.samecoins}`;
  }

  function computerTurn() {

    const computerNumber = Math.random();

    let computerPick = ''; 

    if (computerNumber >= 0 && computerNumber < 1 / 3 ) {
    computerPick= 'rock';
    } else if (computerNumber >= 1 / 3 && computerNumber < 2 / 3) {
    computerPick= 'paper';
    } else if (computerNumber >= 2 / 3 && computerNumber < 1) {
    computerPick= 'scissors'; 
    }

    return computerPick;
  }; 

  function scorereset() {
    scorenumber.wincoins = 0;
    scorenumber.losecoins = 0;
    scorenumber.samecoins = 0; 
    localStorage.removeItem('scorenumber'); 
    updateElementScore(); 
  }; 

 
  document.querySelector('.score-btn')
    .addEventListener('click', () => {
      //12v
      // scorereset(); 
      autoPlay(); 
      rstcoinspara(); 
    }); 

    function rstcoinspara() {
      document.querySelector('.resetquestion').innerHTML =  `Can want coins start again play game from start?
      <button class="scorebtny">yes</button>
      <button class="scorebtnn">no</button>`;

      document.querySelector('.scorebtny')
        .addEventListener('click', () => {
          scorereset(); 
          erasecoinspara(); 
          autoPlay(); 
        }); 

      document.querySelector('.scorebtnn')
        .addEventListener('click', () => {
          erasecoinspara(); 
          autoPlay(); 
        }); 
    }; 

    function erasecoinspara() {
      document.querySelector('.resetquestion').innerHTML = ''; 
    }


