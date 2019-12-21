import React from 'react';
import Button from './button';
import loginStyles from './login.module.css';
import airplane from '../assets/airplane.svg';
import cocktail from '../assets/cocktail.svg';
import hotel from '../assets/hotel.svg';
import passport from '../assets/passport.svg';
import moneybag from '../assets/money-bag.svg';

const Login = ({ login }) => {
	return (
		<div className={loginStyles.container}>
			<h1>Pack-Track!</h1>
			<div className={loginStyles.iconContainer}>
				<div className={loginStyles.icon}>
					<img src={airplane} alt="SVG of an airplane" />
				</div>
				<div className={loginStyles.icon}>
					<img src={cocktail} alt="SVG of an cocktail" />
				</div>
				<div className={loginStyles.icon}>
					<img src={moneybag} alt="SVG of an money bag" />
				</div>
				<div className={loginStyles.icon}>
					<img src={hotel} alt="SVG of an hotel" />
				</div>
				<div className={loginStyles.icon}>
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
			<div className={loginStyles.buttonContainer}>
				<Button styleType="blue" listener={() => login('google')}>
					Log in with Google
				</Button>
				<Button styleType="blue" listener={() => login('facebook')}>
					Log in with Facebook
				</Button>
			</div>
		</div>
	);
};

export default Login;
