import { useState } from "react";
import PropTypes from "prop-types";

export default function Player({
	initialName,
	symbol,
	isActive,
	onChangeName,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	function handleEditClick() {
		// setIsEditing(!isEditing); // schedules a state update to true
		// setIsEditing(!isEditing); // schedules a state update to true
		setIsEditing((isEditing) => !isEditing); // gets update value
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	}

	function handleChange(event) {
		setPlayerName(event.target.value);
	}

	let editablePlayerName = <span className="player-name">{playerName}</span>;

	if (isEditing) {
		editablePlayerName = (
			<input
				type="text"
				required
				defaultValue={playerName}
				onChange={handleChange}
			/>
		);
	}

	return (
		<li className={isActive ? "active" : undefined}>
			<span className="player">
				{editablePlayerName}
				<span className="player-symbol">{symbol}</span>
			</span>

			<button onClick={handleEditClick}>
				{isEditing ? "Save" : "Edit"}
			</button>
		</li>
	);
}

Player.propTypes = {
	initialName: PropTypes.string,
	symbol: PropTypes.string,
	isActive: PropTypes.bool,
	onChangeName: PropTypes.func,
};
