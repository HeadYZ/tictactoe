import {useState } from 'react'

const Player = ({ initalName, symbol, isActive }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [playerName, setPlayerName] = useState(initalName)

	let editablePlayerName = <span className='player-name'>{playerName}</span>

	const editingHandler = () => {
		setIsEditing(editing => !editing)
	}
	const changeNameHandler = e => {
		setPlayerName(e.target.value)
	}
	if (isEditing)
		editablePlayerName = <input type='text' required placeholder={playerName} onChange={changeNameHandler} />

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className='player'>
				{editablePlayerName}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={editingHandler}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	)
}

export default Player
