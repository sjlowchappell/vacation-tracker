import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Stop from './components/stop';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			stops: [],
		};
	}

	// when component mounts, checks if user is logged in
	componentDidMount() {
		auth.onAuthStateChanged(user => {
			// If user is logged in, set state to said user
			if (user) {
				this.setState({ user });
				// Get a database reference to that user's info
				const userId = firebase.auth().currentUser.uid;
				const dbRef = firebase.database().ref('/users/' + userId + '/stops/');
				// Get all stops from that user's info, along with stop data
				dbRef.on('value', response => {
					const newState = [];
					const data = response.val();
					for (let key in data) {
						newState.push({ key: key, name: data[key].name, budgets: data[key].budgets });
					}
					// Update state of the application based on user's info
					this.setState({
						stops: newState,
						userInput: '',
					});
				});
			} else {
				// If no user is logged in, clear the page
				this.setState({
					stops: [],
				});
			}
		});
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

	// Auth Related Methods
	login = () => {
		// firebase method to log in using Google Auth Provider
		auth.signInWithPopup(provider).then(result => {
			const user = result.user;
			this.setState({
				user,
			});
		});
	};
	logout = () => {
		auth.signOut().then(() => {
			this.setState({ user: null });
		});
	};

	// Helper method for checking current stop info
	checkStops = e => {
		console.log(this.state.stops);
	};

	render() {
		return (
			<Router>
				<div>
					<header>
						{this.state.user ? (
							<div>
								<p>Welcome, {this.state.user.displayName}</p>
								<button onClick={this.logout}>Log Out</button>
							</div>
						) : (
							<div>
								<p>Please Log In</p>
								<button onClick={this.login}>Log In</button>
							</div>
						)}
					</header>
					<ul>
						{this.state.stops.map(stop => {
							return (
								<li key={stop.key}>
									<Link to={stop.name}>{stop.name}</Link>
									<button onClick={() => this.removeStop(stop.key)}>Remove Stop</button>
									<Route
										path={`/${stop.name}`}
										render={() => {
											return <Stop name={stop.name} budgets={stop.budgets} stopId={stop.key} />;
										}}
									/>
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
				<button onClick={this.checkStops}>Check Stops</button>
			</Router>
		);
	}
}

export default App;
