import React, { Component } from 'react';
import stopsList from './stopsList.module.css';
import firebase from '../firebase';
import Form from './form';
import StopCard from './stopCard';

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
		const dbRef = firebase.database().ref('/users/' + this.props.uid + '/stops/');
		// Create a new stop object with it's name, budget, arrival, departure, expenses, and cost
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
		this.setState({ location: '', budget: 0, arrival: '', departure: '' });
	};
	render() {
		const { inputList, stops, uid } = this.props;
		return (
			<div className={stopsList.container}>
				<h1>Stops on your journey:</h1>
				{stops.length !== 0 ? (
					<>
						<div className={stopsList.allStops}>
							{stops.map(stop => {
								return <StopCard stop={stop} uid={uid} />;
							})}
						</div>
						<Form
							formText="Add a new stop to your trip:"
							inputs={inputList}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
							submitText={'Add Stop'}
						/>
					</>
				) : (
					<Form
						formText="Add a new stop to your trip:"
						inputs={inputList}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						submitText={'Add Stop'}
					/>
				)}
			</div>
		);
	}
}

export default StopsList;
