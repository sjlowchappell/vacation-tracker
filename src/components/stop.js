import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';
import firebase from '../firebase';
// import stop from './stop.module.css';
import { Link } from 'react-router-dom';

// Method to remove stop from database
const removeStop = stopId => {
	// get reference to users stops
	const userId = firebase.auth().currentUser.uid;
	const dbRef = firebase.database().ref('/users/' + userId + '/stops/');
	// use child() and remove() methods to get the stop and remove it
	dbRef.child(stopId).remove();
};

const Stop = ({ name, budgets, stopId, stopCost }) => {
	return (
		<div>
			<h1>{name}</h1>
			<button className="removeButton" onClick={() => removeStop(stopId)}>
				<Link to="/">Remove Stop</Link>
			</button>
			{budgets.map((budget, index) => {
				return (
					<ExpenseList
						key={uuidv4()}
						type={budget.name}
						items={budget.items}
						stopId={stopId}
						budgetNum={index}
					/>
				);
			})}
			<h2>Stop total cost: ${stopCost}</h2>
		</div>
	);
};

export default Stop;
