import React from 'react';
import homePage from './homePage.module.css';
import { Link } from 'react-router-dom';

const HomePage = props => {
	const isHome = props.match.isExact;
	return isHome ? (
		<div className={homePage.container}>
			<h1>Vacay Tracker!</h1>
			<p>Welcome to Vacay Tracker, the best way to track your vacation expenses.</p>
			<p>Add new locations to your journey on our Stops page with a budget total and Arrival/Departure dates.</p>
			<p>Once stops have been added, add your expenses to make sure you're staying on track. Safe travels!</p>

			<Link to="/stops/">
				<button className={homePage.submit}>Get Started</button>
			</Link>
		</div>
	) : null;
};

export default HomePage;
