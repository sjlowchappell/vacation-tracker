import React from 'react';
import homePage from './homePage.module.css';
import airplane from '../assets/airplane.svg';
import cocktail from '../assets/cocktail.svg';
import hotel from '../assets/hotel.svg';
import passport from '../assets/passport.svg';
import moneybag from '../assets/money-bag.svg';

const HomePage = ({ login }) => {
	return (
		<div className={homePage.container}>
			<h1>Vacay Tracker!</h1>
			<div className={homePage.iconBox}>
				<div className={homePage.iconContainer}>
					<img src={airplane} alt="SVG of an airplane" />
				</div>
				<div className={homePage.iconContainer}>
					<img src={cocktail} alt="SVG of an cocktail" />
				</div>
				<div className={homePage.iconContainer}>
					<img src={moneybag} alt="SVG of an money bag" />
				</div>
				<div className={homePage.iconContainer}>
					<img src={hotel} alt="SVG of an hotel" />
				</div>
				<div className={homePage.iconContainer}>
					<img src={passport} alt="SVG of an passport" />
				</div>
			</div>
			<p>Welcome to Vacay Tracker, the best way to track your vacation expenses.</p>
			<p>
				Add new locations to your journey on our Stops page with a budget total, arrival date, and departure
				date.
			</p>
			<p>
				Once stops have been added, add your expenses to each stop to make sure you're staying on track. Safe
				travels!
			</p>
			<button className={homePage.submit} onClick={login}>
				Log in With Google
			</button>
		</div>
	);
};

export default HomePage;
