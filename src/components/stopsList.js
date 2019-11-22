import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

class StopsList extends Component {
	constructor() {
		super();
		this.state = {};
	}
	// Method for handling form input -> sets state based on user input
	handleChange = e => {
		this.setState({
			userInput: e.target.value,
		});
	};
	// Method for handling form submission
	handleSubmit = e => {
		e.preventDefault();
		// Get database reference for user and stops
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref('/users/' + userId + '/stops/');
		// Create a new stop object with it's name and 4 empty budgets
		const stop = {
			name: this.state.userInput,
			budgets: [
				{
					name: 'Food',
					items: [],
				},
				{
					name: 'Travel',
					items: [],
				},
				{
					name: 'Culture',
					items: [],
				},
				{
					name: 'Miscellaneous',
					items: [],
				},
			],
		};
		// Push the new stop to the database
		dbRef.push(stop);
		// Update state to clear out the user input
		this.setState({ userInput: '' });
	};
	render() {
		return (
			<div>
				<h1>Stops on your journey:</h1>
				<nav>
					<ul>
						{this.props.stops.map(stop => {
							return (
								<li key={stop.key}>
									<Link to={`/${stop.name}/`} className="stopLink">
										{stop.name}
									</Link>
									<button className="removeButton" onClick={() => this.props.removeStop(stop.key)}>
										Remove Stop
									</button>
								</li>
							);
						})}
					</ul>
				</nav>
				<form action="submit">
					<label htmlFor="newStop">Add a new stop to your trip</label>
					<input type="text" id="newStop" onChange={this.handleChange} value={this.state.userInput} />
					<button onClick={this.handleSubmit}>Add Stop</button>
				</form>
			</div>
		);
	}
}

export default StopsList;
