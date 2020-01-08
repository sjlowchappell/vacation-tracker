import React from 'react';
import { Link } from 'react-router-dom';
import styles from './stopCard.module.css';
import Button from './button';
import firebase from '../firebase';
import PropTypes from 'prop-types';

const StopCard = ({ stop, uid }) => {
	const { name, budget, arrival, departure, cost, key } = stop;
	// Method to remove stop from database
	const removeStop = stopId => {
		// get reference to users stops
		const dbRef = firebase.database().ref(`/users/${uid}/stops/`);
		// use child() and remove() methods to get the stop and remove it
		dbRef.child(stopId).remove();
	};
	return (
		<section className={styles.container}>
			<Link to={`/${name}/`} className={styles.stopLink}>
				{name}
			</Link>
			<p className={styles.date}>
				{arrival} - {departure}
			</p>
			<p>Budgeted: ${budget}</p>
			<p>
				Spent: <span className={parseFloat(cost) > budget ? styles.red : styles.green}>${cost}</span>
			</p>
			<Button styleType="red" listener={() => removeStop(key)}>
				Delete
			</Button>
		</section>
	);
};

StopCard.propTypes = {
	stop: PropTypes.object,
	uid: PropTypes.string,
};

export default StopCard;
