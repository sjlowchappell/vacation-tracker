import React from 'react';

const HomePage = props => {
	const isHome = props.match.isExact;
	return isHome ? (
		<div>
			<h1>Vacay Tracker</h1>
			<p>
				Welcome to Vacay Tracker, the best way to track your vacation expenses. Add new locations to your
				journey on our Stops page with a budget total and Arrival/Departure dates. Once stops have been added,
				dd your expenses to make sure you're staying on track. Safe travels!
			</p>
			<button>Get Started</button>
		</div>
	) : null;
};

export default HomePage;
