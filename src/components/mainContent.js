import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Stop from './stop';
import mainContent from './mainContent.module.css';
import StopsList from './stopsList';
import firebase from '../firebase';
import uuidv4 from 'uuid/v4';

const inputList = [
	{ id: 'location', type: 'text', text: 'Location' },
	{ id: 'budget', type: 'number', text: 'Budget' },
	{ id: 'arrival', type: 'date', text: 'Arrival Date' },
	{ id: 'departure', type: 'date', text: 'Departure Date' },
];

class MainContent extends Component {
	constructor() {
		super();
		this.state = {};
	}
	// Method to remove stop from database
	removeStop = stopId => {
		// get reference to users stops
		const dbRef = firebase.database().ref('/users/' + this.props.uid + '/stops/');
		// use child() and remove() methods to get the stop and remove it
		dbRef.child(stopId).remove();
	};
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
		const dbRef = firebase.database().ref('/users/' + this.props.uid + '/stops/');
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
		const { stops, uid } = this.props;
		return (
			<main className={mainContent.container}>
				{/* Set up all routes. Need to check if the Router should go here instead of on the App component */}
				{/* Route for StopsList */}
				<Route
					path={'/stops/'}
					render={() => {
						return (
							<StopsList
								stops={stops}
								removeStop={this.removeStop}
								handleChange={this.handleChange}
								handleSubmit={this.handleSubmit}
								inputList={inputList}
							/>
						);
					}}
				/>
				{stops.length !== 0 ? (
					<>
						{/* Routes for all the individual Stops */}
						{stops.map(stop => {
							return (
								<Route
									key={uuidv4()}
									path={`/${stop.name}/`}
									render={() => {
										return (
											<Stop
												name={stop.name}
												budget={stop.budget}
												expenses={stop.expenses}
												stopId={stop.key}
												cost={stop.cost}
												uid={uid}
											/>
										);
									}}
								/>
							);
						})}
					</>
				) : null}
			</main>
		);
	}
}

export default MainContent;
