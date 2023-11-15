import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'

function App() {
	const [activePlayer, setActivePlayer] = useState('X')

	const selectSquareHandler = () => {
		setActivePlayer(curActivePlayer => (curActivePlayer === 'X' ? 'O' : 'X'))
	}
	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player initalName='Player 1' symbol='X' isActive={activePlayer === 'X'}></Player>
					<Player initalName='Player 2' symbol='O' isActive={activePlayer === 'O'}></Player>
				</ol>
				<GameBoard onSelectSquare={selectSquareHandler} />
			</div>
		</main>
	)
}

export default App
