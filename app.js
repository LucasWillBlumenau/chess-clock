const playerOneDiv = document.querySelector('[data-js="player-1"]')
const playerTwoDiv = document.querySelector('[data-js="player-2"]')

let playerOneRemaningTime = 600100
let playerTwoRemaningTime = 600100
let isPlayerOneTime = true
let lastInterval = null


const fromNanoToString = nanoValue => {
    const [minutes, seconds] = [Math.floor( nanoValue / 60000), Math.floor((nanoValue % 60000) / 1000)]
    if (`${seconds}`.length === 1) {
        return `${minutes}:0${seconds}`
    }
    return `${minutes}:${seconds}`
}


const resetGame = () => {
    playerOneRemaningTime = 600000
    playerTwoRemaningTime = 600000
    clearInterval(lastInterval)
    lastInterval = null
}


const discountPlayerOneTime = () => {
    if (playerOneRemaningTime === 0) {
        alert('O jogador dois ganhou')
        resetGame()
    }
    playerOneRemaningTime -= 100
    playerOneDiv.textContent = fromNanoToString(playerOneRemaningTime)
}


const discountPlayerTwoTime = () => {
    if (playerTwoRemaningTime === 0) {
        alert('O jogador um ganhou')
        resetGame()
    }

    playerTwoRemaningTime -= 100
    playerTwoDiv.textContent = fromNanoToString(playerTwoRemaningTime)
}


const swapPlayer = () => {
    isPlayerOneTime = !isPlayerOneTime
    clearInterval(lastInterval)
    lastInterval = setInterval(isPlayerOneTime? discountPlayerOneTime: discountPlayerTwoTime, 100)
}


const handlePlayerClick = event => {
    if (playerOneDiv === event.target && isPlayerOneTime) {
        swapPlayer()
    }

    if (playerTwoDiv === event.target && !isPlayerOneTime) {
        swapPlayer()
    }
}

playerOneDiv.addEventListener('click', handlePlayerClick)
playerTwoDiv.addEventListener('click', handlePlayerClick)
