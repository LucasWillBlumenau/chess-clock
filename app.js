const playerOneDiv = document.querySelector('[data-js="player-1"]')
const playerTwoDiv = document.querySelector('[data-js="player-2"]')
const resetButton = document.querySelector('[data-js="reset-button"]')
const pauseButton = document.querySelector('[data-js="pause-button"]')


const gameInfo = (() => {
    let playerOneRemaningTime = 600100
    let playerTwoRemaningTime = 600100
    let isPlayerOneTime = true
    let lastInterval = null
    let isGamePaused = false

    const discountPlayerOneTime = () => {
        if (isGamePaused) {
            return
        }
    
        if (playerOneRemaningTime === 0) {
            alert('O jogador dois ganhou')
            resetGame()
        }
        playerOneRemaningTime -= 100
        playerOneDiv.textContent = fromNanoToString(playerOneRemaningTime)
    }
    
    const discountPlayerTwoTime = () => {
        if (isGamePaused) {
            return
        }
        if (playerTwoRemaningTime === 0) {
            alert('O jogador um ganhou')
            resetGame()
        }
    
        playerTwoRemaningTime -= 100
        playerTwoDiv.textContent = fromNanoToString(playerTwoRemaningTime)
    }

    const changePlayerTime = () => isPlayerOneTime = !isPlayerOneTime

    const getIsPlayerOneTime = () => isPlayerOneTime

    const changeGamePaused = () => isGamePaused = !isGamePaused

    const getIsGamePaused = () => isGamePaused

    const resetGame = () => {
        isGamePaused = false
        playerOneRemaningTime = 600100
        playerTwoRemaningTime = 600100
    }

    const setLastInterval = (newLastInterval) => {
        lastInterval = newLastInterval
    }

    const getLastInterval = () => lastInterval

    return {
        discountPlayerOneTime,
        discountPlayerTwoTime,
        changePlayerTime,
        getIsPlayerOneTime,
        changeGamePaused,
        getIsGamePaused,
        resetGame,
        setLastInterval,
        getLastInterval
    }
})()


const pauseGame = () => {
    gameInfo.changeGamePaused()
    pauseButton.textContent = gameInfo.getIsGamePaused()? 'Retomar': 'Pausar'
}


const fromNanoToString = nanoValue => {
    const [minutes, seconds] = [Math.floor( nanoValue / 60000), Math.floor((nanoValue % 60000) / 1000)]
    if (`${seconds}`.length === 1) {
        return `${minutes}:0${seconds}`
    }
    return `${minutes}:${seconds}`
}


const resetGame = () => {
    gameInfo.resetGame()
    clearInterval(gameInfo.getLastInterval())
    gameInfo.setLastInterval(null)
    playerOneDiv.textContent = '10:00'
    playerTwoDiv.textContent = '10:00'
}


const swapPlayer = () => {
    gameInfo.changePlayerTime()
    clearInterval(gameInfo.getLastInterval())
    gameInfo.setLastInterval(setInterval(gameInfo.getIsPlayerOneTime()? gameInfo.discountPlayerOneTime: gameInfo.discountPlayerTwoTime, 100))
}


const handlePlayerClick = event => {
    if (gameInfo.getIsGamePaused()) {
        return
    }

    if (playerOneDiv === event.target && gameInfo.getIsPlayerOneTime()) {
        swapPlayer()
    }

    if (playerTwoDiv === event.target && !gameInfo.getIsPlayerOneTime()) {
        swapPlayer()
    }
}

playerOneDiv.addEventListener('click', handlePlayerClick)
playerTwoDiv.addEventListener('click', handlePlayerClick)
pauseButton.addEventListener('click', pauseGame)
resetButton.addEventListener('click', resetGame)