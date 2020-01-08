import React, { Component } from 'react';
import styles from './stopsList.module.css';
import firebase from '../firebase';
import Form from './form';
import StopCard from './stopCard';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import inputList from '../utils/stopInputs';

class StopsList extends Component {
	constructor() {
		super();
		this.state = {
			location: '',
			budget: '',
			arrival: '',
			departure: '',
		};
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
		const dbRef = firebase.database().ref(`/users/${this.props.uid}/stops/`);
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
		this.setState({ location: '', budget: '', arrival: '', departure: '' });
	};
	render() {
		const { stops, uid } = this.props;
		return (
			<section className={styles.container}>
				<h2>Stops on your journey:</h2>
				{stops.length > 0 && (
					<div className={styles.allStops}>
						{stops.map(stop => {
							return <StopCard key={uuidv4()} stop={stop} uid={uid} />;
						})}
					</div>
				)}
				<Form
					formText="Add a new stop to your trip:"
					inputs={inputList}
					inputValues={this.state}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					submitText={'Add Stop'}
				/>
			</section>
		);
	}
}

StopsList.propTypes = {
	stops: PropTypes.array,
	uid: PropTypes.string,
};

export default StopsList;
