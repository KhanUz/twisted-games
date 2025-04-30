const gridContainer = document.getElementById("gridContainer");
const infoSpan = document.getElementById('infoField');
const modalBtn = document.getElementById('modalBTN');
const replayYesBtn = document.getElementById("replayYes"); // Corrected selector
const replayNoBtn = document.getElementById("replayNo");
let isRunning = false;
let bgPrimary = 'bg-primary';
let bgDraw = 'bg-primary-subtle'
let bgBody = 'bg-body';
let xColor = 'text-danger';
let oColor = 'text-success';
let oBorderColor = 'border-success';
let xBorderColor = 'border-danger'
let defaultBorderColor = 'border-primary'
let borderColor = 'border-primary';
let btnStyle = 'btn-outline-primary';
let borderInitialize = 'border';
let borderThickness = 'border-1';
let x = `<span class="${xColor} z-n1"> <i class="bi bi-x-lg"></i></span>`;
let o = `<span class="${oColor} z-n1"><i class="bi bi-circle"></i></span>`;

const oSide = document.getElementById("oSide")
const xSide = document.getElementById("xSide")

let player1 = 1;
let player2 = 0;
let playerSides = {
    1: x,
    0: o
};

replayYesBtn.addEventListener('click', () => {
    runGame()
})

runGame()


function runGame() {
    let cells, cellContainer;
    setToDefault()
    function setToDefault() {
        gridContainer.innerHTML = ''
        gridContainer.innerHTML = populateGrid(9, borderColor, borderThickness, borderInitialize, bgBody, btnStyle)
        cellContainer = gridContainer.children[0];
        cells = cellContainer.children;

        xSide.children[0].classList.add(bgPrimary)
    }
    function disableElement(element) {
        element.classList.add('disabled')
        element.setAttribute("disabled", '')
    }
    function lightSide() {
        xSide.children[0].classList.toggle(bgPrimary)
        oSide.children[0].classList.toggle(bgPrimary)
    }
    function endGame(winner) {
        Array.from(cells).forEach(el => disableElement(el))
        xSide.children[0].classList.remove(bgPrimary)
        oSide.children[0].classList.remove(bgPrimary)
        disableElement(xSide.children[0])
        disableElement(oSide.children[0])

        if (winner === 0) {
            infoSpan.innerHTML = o + " wins"
            colorGrid(oBorderColor, bgBody, winner)
        }
        else if (winner === 1) {
            infoSpan.innerHTML = x + " wins"
            colorGrid(xBorderColor, bgBody, winner)
        }
        else {
            infoSpan.innerHTML = 'Draw'

            colorGrid(defaultBorderColor, bgDraw, winner)
        }

        modalBtn.click()
    }
    controlGrid()
    function controlGrid() {
        let cellValues = Array(9).fill(undefined)
        let currentPlayer = 1;
        const handleClick = (e) => {

            if (e.target.hasAttribute('cell')) {
                let cell = e.target
                console.log(cell);
                let cellNumber = cell.getAttribute('cell');
                cellValues[cellNumber] = currentPlayer;
                cell.innerHTML = playerSides[currentPlayer]
                disableElement(cell)
                lightSide()
                currentPlayer = Number(!currentPlayer);
                let state = checkSquares(cellValues);
                if (state !== -1) {
                    endGame(state)
                    cellContainer.removeEventListener('click', handleClick)
                    return;
                }


            }

        }
        cellContainer.addEventListener('click', handleClick)
    }
    function colorGrid(borderColor, bgColor, winner) {

        Array.from(cells).forEach(cell =>
            cell.classList.add(borderColor, bgColor)
        )

        cellContainer.classList.add(borderColor, bgColor)

    }

}



function checkSquares(array) {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const [a, b, c] of wins) {
        if (array[a] === array[b] && array[b] === array[c] && array[c] !== undefined) {
            return array[a];
        }
    }
    if (array.includes(undefined)) {

        return -1;
    }

    console.log();

    return 2;
}

function populateGrid(n, borderColor, borderThickness, border, bgColor, cellStyle) {
    let str = `<div class = "cellContainer ${bgColor} ${border} ${borderThickness} ${borderColor}" id="grid">`;
    for (let index = 0; index < n; index++) {
        str += `<div
                    cell="${index}"
                    class="btn ${border} ${borderThickness} ${borderColor} ${cellStyle} rounded-0 p-0 cell"
                    ></div>
        `;
    }
    str += '</div>';
    return str
}
