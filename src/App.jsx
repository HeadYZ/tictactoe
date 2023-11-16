import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations.js'
const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
]

const deriveActivePlayer = gameTurns => {
	let currentPlayer = 'X'
	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O'
	}
	return currentPlayer
}

function App() {
	const [gameTurns, setGameTurns] = useState([])

	const activePlayer = deriveActivePlayer(gameTurns)

	let gameBoard = initialGameBoard

	for (const turn of gameTurns) {
		const { square, player } = turn
		const { row, col } = square
		gameBoard[row][col] = player
	}

	for(const combination of WINNING_COMBINATIONS){
		const firstSquareCombination = gameBoard
		const secondSquareCombination = gameBoard
		const thirdSquareCombination = gameBoard
	}
	
	const selectSquareHandler = (rowIndex, colIndex) => {
		setGameTurns(prevTurns => {
			const currentPlayer = deriveActivePlayer(prevTurns)
			const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
			return updatedTurns
		})
	}
	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player initalName='Player 1' symbol='X' isActive={activePlayer === 'X'}></Player>
					<Player initalName='Player 2' symbol='O' isActive={activePlayer === 'O'}></Player>
				</ol>
				<GameBoard onSelectSquare={selectSquareHandler} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	)
}

export default App
