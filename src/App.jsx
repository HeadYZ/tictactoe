import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'

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
				<GameBoard onSelectSquare={selectSquareHandler} turns={gameTurns} />
			</div>
			<Log turns={gameTurns} />
		</main>
	)
}

export default App
