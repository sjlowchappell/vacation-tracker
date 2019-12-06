import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import stopsList from './stopsList.module.css';
import Form from './form';
import StopCard from './stopCard';

const inputList = [
	{ id: 'location', type: 'text', text: 'Location' },
	{ id: 'budget', type: 'number', text: 'Budget' },
	{ id: 'arrival', type: 'date', text: 'Arrival Date' },
	{ id: 'departure', type: 'date', text: 'Departure Date' },
];

class StopsList extends Component {
	constructor() {
		super();
		this.state = {};
	}

	// Method for handling form input -> sets state based on user input
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	// Method for handling form submission
	handleSubmit = e => {
		e.preventDefault();
		// Get database reference for user and stops
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref('/users/' + userId + '/stops/');
		// Create a new stop object with it's name, expenses, and cost
		const stop = {
			name: this.state.location,
			budget: this.state.budget,
			arrival: this.state.arrival,
			departure: this.state.departure,
			expenses: [],
			cost: 0,
		};
		// Push the new stop to the database
		dbRef.push(stop);
		// Update state to clear out the user input
		this.setState({ name: '', budget: 0, arrival: '', departure: '' });
	};
	render() {
		return (
			<div className={stopsList.container}>
				<h1>Stops on your journey:</h1>
				<nav>
					<ul className={stopsList.allStops}>
						{this.props.stops.map(stop => {
							return <StopCard key={stop.key} stop={stop} removeStop={this.props.removeStop} />;
						})}
					</ul>
				</nav>
				<Form
					formText="Add a new stop to your trip:"
					inputs={inputList}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					submitText={'Add Stop'}
				/>
			</div>
		);
	}
}

export default StopsList;
