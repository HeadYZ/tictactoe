import GameBoard from './components/GameBoard'
import Player from './components/Player'

function App() {
	return (
		<main>
			<div id='game-container'>
				<ol id='players'>
					<Player initalName='Player 1' symbol='X'></Player>
					<Player initalName='Player 2' symbol='O'></Player>
				</ol>
				<GameBoard />
			</div>
		</main>
	)
}

export default App
