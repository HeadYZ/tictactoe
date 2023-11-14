import { useRef, useState } from 'react'

const Player = ({ name, symbol }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [playerName, setPlayerName] = useState(name)
	const userInput = useRef()

	const editingHandler = () => {
		if (isEditing) {
			changeNameHandler()
			setIsEditing(false)
			return
		}
		setIsEditing(true)
	}
	const changeNameHandler = () => {
		setPlayerName(userInput.current.value)
	}

	return (
		<li>
			<span className='player'>
				{isEditing ? <input type='text' ref={userInput} required /> : <span className='player-name'>{playerName}</span>}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={editingHandler}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	)
}

export default Player
