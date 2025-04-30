const RPS = ['✊', '✋', '✌']

const wins = {
    '✊': '✌',
    '✋': '✊',
    '✌': '✋',

}

const pcSide = document.getElementById('pcSide');
const userSide = document.getElementById('userSide');
const confirmationBtn = document.getElementById('confirm')
const userChoiceInput = document.getElementById('userChoice')
confirmationBtn.addEventListener('click'

    , () => {
        let userInput = RPS[userChoiceInput.value - 1];
        let pcInput = RPS[Math.floor(Math.random() * 3)];
        getChoiceDisplay(userInput, pcInput)
    }
)
function getChoiceDisplay(userInput, pcInput) {

    if (wins[userInput] === pcInput) {
        userSide.style.fontSize = 25 + 'rem';
        pcSide.style.fontSize = 15 + 'rem';
    } else if (wins[pcInput] === userInput) {
        userSide.style.fontSize = 15 + 'rem';
        pcSide.style.fontSize = 25 + 'rem';
    } else {
        pcSide.style.fontSize = 20 + 'rem';
        userSide.style.fontSize = 20 + 'rem';

    }

    userSide.textContent = userInput
    pcSide.textContent = pcInput

}
