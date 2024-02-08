// import { useState } from "react";
import PropTypes from "prop-types";
export default function GameBoard({ onSelectSquare, gameBoard }) {
	// const [gameBoard, setGameBoard] = useState(initialGameBoard);

	// function handleSelectSquare(rowIndex, colIndex) {
	// 	setGameBoard((prevGameBoard) => {
	// 		const updatedBoard = [
	// 			...prevGameBoard.map((innerArrays) => [...innerArrays]),
	// 		];
	// 		updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
	// 		return updatedBoard;
	// 	});

	//     onSelectSquare();
	// }

	return (
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button
									onClick={() =>
										onSelectSquare(rowIndex, colIndex)
									}
									disabled={playerSymbol !== null}
								>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}

GameBoard.propTypes = {
	onSelectSquare: PropTypes.func,
	gameBoard: PropTypes.array,
};
