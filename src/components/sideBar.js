import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import sideBar from './sideBar.module.css';

class SideBar extends Component {
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
	// Method to remove stop from database
	removeStop = stopId => {
		// get reference to users stops
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref('/users/' + userId + '/stops/');
		// use child() and remove() methods to get the stop and remove it
		dbRef.child(stopId).remove();
	};
	render() {
		return (
			<div className="sideBar">
				<p className={sideBar.test}>This is the sidebar</p>
				<header>
					{this.props.user ? (
						<div>
							<p>Welcome, {this.props.user.displayName}</p>
							<div className={sideBar.profileImage}>
								<img src={this.props.user.photoURL} alt="" />
							</div>
							<Link to="/" onClick={this.props.logout}>
								Log Out
							</Link>
						</div>
					) : (
						<div>
							<p>Please Log In</p>
							<button onClick={this.props.login}>Log In</button>
						</div>
					)}
				</header>
				<ul className="stopNav">
					{this.props.stops.map(stop => {
						const currentStopCost = this.props.stopCost(stop.budgets);
						return (
							<li key={stop.key}>
								<Link to={stop.name}>
									{stop.name}: ${currentStopCost}
								</Link>
								<button onClick={() => this.removeStop(stop.key)}>Remove Stop</button>
							</li>
						);
					})}
				</ul>
				<form action="submit">
					<label htmlFor="newStop">Add a new stop to your trip</label>
					<input type="text" id="newStop" onChange={this.handleChange} value={this.state.userInput} />
					<button onClick={this.handleSubmit}>Add Stop</button>
				</form>
			</div>
		);
	}
}

export default SideBar;
