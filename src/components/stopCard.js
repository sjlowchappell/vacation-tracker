import React from 'react';
import { Link } from 'react-router-dom';
import stopCard from './stopCard.module.css';
import Button from './button';
import firebase from '../firebase';

const StopCard = ({ stop, uid }) => {
	// Method to remove stop from database
	const removeStop = stopId => {
		// get reference to users stops
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/');
		// use child() and remove() methods to get the stop and remove it
		dbRef.child(stopId).remove();
	};
	return (
		<div className={stopCard.container}>
			<Link to={`/${stop.name}/`} className={stopCard.stopLink}>
				{stop.name}
			</Link>
			<p className={stopCard.date}>
				{stop.arrival} - {stop.departure}
			</p>
			<p>Budgeted: ${stop.budget}</p>
			<p>
				Spent:{' '}
				<span className={parseFloat(stop.cost) > stop.budget ? stopCard.red : stopCard.green}>
					${stop.cost}
				</span>
			</p>
			<Button styleType="red" listener={() => removeStop(stop.key)}>
				Delete
			</Button>
		</div>
	);
};

export default StopCard;
