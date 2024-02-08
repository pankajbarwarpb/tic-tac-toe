import PropTypes from "prop-types";

export default function Log({ turns }) {
	const listItems = turns.map((turn) => {
		const { square, player } = turn;
		const { row, col } = square;
		return (
			<li key={`${row}${col}`}>
				{player} selected {row},{col}
			</li>
		);
	});

	return <ol id="log">{listItems}</ol>;
}

Log.propTypes = {
	turns: PropTypes.array,
};
