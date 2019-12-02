import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import stopsList from './stopsList.module.css';

class StopsList extends Component {
	constructor() {
		super();
		this.state = {};
	}

	// Method for handling form input -> sets state based on user input
	handleChange = e => {
		const inputType = e.target.id;
		this.setState({ [inputType]: e.target.value });
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
							return (
								<li key={stop.key} className={stopsList.stop}>
									<Link to={`/${stop.name}/`} className={stopsList.stopLink}>
										{stop.name}
									</Link>
									<p className={stopsList.date}>
										{stop.arrival} - {stop.departure}
									</p>
									<p>Budgeted: ${stop.budget}</p>
									<p>
										Spent:{' '}
										<span className={stop.cost > stop.budget ? stopsList.red : stopsList.green}>
											${stop.cost}
										</span>
									</p>
									<button
										className={stopsList.removeButton}
										onClick={() => this.props.removeStop(stop.key)}
									>
										Remove Stop
									</button>
								</li>
							);
						})}
					</ul>
				</nav>
				<form onSubmit={this.handleSubmit}>
					<p>Add a new stop to your trip:</p>
					<div className={stopsList.inputContainer}>
						<div className={stopsList.inputItem}>
							<label htmlFor="location">Location: </label>
							<input type="text" id="location" onChange={this.handleChange} />
						</div>
						<div className={stopsList.inputItem}>
							<label htmlFor="budget">Budget Total: </label>
							<input type="number" id="budget" onChange={this.handleChange} />
						</div>
					</div>
					<div className={stopsList.inputContainer}>
						<div className={stopsList.inputItem}>
							<label htmlFor="arrival">Arrival Date: </label>
							<input type="date" id="arrival" onChange={this.handleChange} />
						</div>
						<div className={stopsList.inputItem}>
							<label htmlFor="departure">Departure Date: </label>
							<input type="date" id="departure" onChange={this.handleChange} />
						</div>
					</div>
					<button className={stopsList.submit}>Add Stop</button>
				</form>
			</div>
		);
	}
}

export default StopsList;
