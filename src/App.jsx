import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations.js'
import GameOver from './components/GameOver.jsx'
const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
]

const deriveActivePlayer = gameTurns => {
	let currentPlayer = 'X'
	if (gameTurns.length > 0 && gameTurns[0].symbol === 'X') {
		currentPlayer = 'O'
	}
	return currentPlayer
}
const deriveGameBoard = gameTurns => {
	let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])]

	for (const turn of gameTurns) {
		const { square, symbol } = turn
		const { row, col } = square
		gameBoard[row][col] = symbol
	}
	return gameBoard
}

const deriveWinner = (gameBoard, players) => {
	let winner

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareCombination = gameBoard[combination[0].row][combination[0].column]
		const secondSquareCombination = gameBoard[combination[1].row][combination[1].column]
		const thirdSquareCombination = gameBoard[combination[2].row][combination[2].column]
		if (
			firstSquareCombination &&
			firstSquareCombination === secondSquareCombination &&
			firstSquareCombination === thirdSquareCombination
		) {
			winner = players[firstSquareCombination]
		}
	}
	return winner
}

function App() {
	const [players, setPlayers] = useState({ X: 'Player 1', O: 'Player 2' })
	const [gameTurns, setGameTurns] = useState([])

	const activePlayer = deriveActivePlayer(gameTurns)
	const gameBoard = deriveGameBoard(gameTurns)
	const winner = deriveWinner(gameBoard, players)

	const hasDraw = gameTurns.length === 9 && !winner

	const selectSquareHandler = (rowIndex, colIndex) => {
		setGameTurns(prevTurns => {
			const currentPlayer = deriveActivePlayer(prevTurns)
			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: players[currentPlayer], symbol: currentPlayer },
				...prevTurns,
			]
			return updatedTurns
		})
	}

	const handleRestart = () => {
		setGameTurns([])
	}

	const handlePlayerNameChange = (symbol, newName) => {
		setPlayers(prevPlayers => {
			return { ...prevPlayers, [symbol]: newName }
		})
	}
	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initalName='Player 1'
						symbol='X'
						isActive={activePlayer === 'X'}
						onChangeName={handlePlayerNameChange}
					></Player>
					<Player
						initalName='Player 2'
						symbol='O'
						isActive={activePlayer === 'O'}
						onChangeName={handlePlayerNameChange}
					></Player>
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
				<GameBoard onSelectSquare={selectSquareHandler} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	)
}

export default App
