import React from 'react';
import Button from './button';
import styles from './login.module.css';
import airplane from '../assets/airplane.svg';
import cocktail from '../assets/cocktail.svg';
import hotel from '../assets/hotel.svg';
import passport from '../assets/passport.svg';
import moneybag from '../assets/money-bag.svg';

const Login = ({ login }) => {
	return (
		<section className={styles.container}>
			<h1 className={styles.heading}>Pack-Track!</h1>
			<div className={styles.iconContainer}>
				<div className={styles.icon}>
					<img src={airplane} alt="SVG of an airplane" />
				</div>
				<div className={styles.icon}>
					<img src={cocktail} alt="SVG of a cocktail" />
				</div>
				<div className={styles.icon}>
					<img src={moneybag} alt="SVG of a money bag" />
				</div>
				<div className={styles.icon}>
					<img src={hotel} alt="SVG of a hotel" />
				</div>
				<div className={styles.icon}>
					<img src={passport} alt="SVG of a passport" />
				</div>
			</div>
			<p>Welcome to Pack-Track, the best way to track your vacation expenses.</p>
			<p>
				Add new locations to your journey on our Stops page with a budget total, arrival date, and departure
				date.
			</p>
			<p>
				Once stops have been added, add your expenses to each stop to make sure you're staying on track. Safe
				travels!
			</p>
			<div className={styles.buttonContainer}>
				<Button styleType="blue" listener={() => login('google')}>
					Log in with Google
				</Button>
				<Button styleType="blue" listener={() => login('facebook')}>
					Log in with Facebook
				</Button>
			</div>
		</section>
	);
};

export default Login;
