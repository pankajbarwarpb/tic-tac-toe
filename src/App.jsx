import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
	X: "Player 1",
	O: "Player 2",
};

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTurns) {
	let currentPlayer = "X";

	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}

	return currentPlayer;
}

function deriveWinner(gameBoard, players) {
	let winner;

	for (let combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}

	return winner;
}

function deriveGameBoard(gameTurns) {
	let gameBoard = [...INITIAL_GAME_BOARD.map((item) => [...item])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}

	return gameBoard;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);
	// const [activePlayer, setActivePlayer] = useState('X');
	// const [hasWinner, setHasWinner] = useState(false);

	const activePlayer = deriveActivePlayer(gameTurns);

	const gameBoard = deriveGameBoard(gameTurns);
	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9;

	function handleSelectSquare(rowIndex, colIndex) {
		// setActivePlayer((currActivePlayer) =>
		// 	currActivePlayer === "X" ? "O" : "X"
		// );
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{
					square: { row: rowIndex, col: colIndex },
					player: currentPlayer,
				},
				...prevTurns,
			];

			return updatedTurns;
		});
	}

	function handleRestart() {
		setGameTurns([]);
	}

	function handlePlayerNameChange(symbol, newName) {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName={PLAYERS.X}
						symbol="X"
						key={0}
						onChangeName={handlePlayerNameChange}
						isActive={activePlayer === "X"}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol="O"
						key={1}
						onChangeName={handlePlayerNameChange}
						isActive={activePlayer === "O"}
					/>
				</ol>
				{(hasDraw || winner) && (
					<GameOver winner={winner} onRestart={handleRestart} />
				)}

				<GameBoard
					onSelectSquare={handleSelectSquare}
					turns={gameTurns}
					gameBoard={gameBoard}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
