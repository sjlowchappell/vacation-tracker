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

	// Method to determine the total cost of a stop including all budgets
	stopCost = budgets => {
		// reduce method used to get total for all budgets
		return budgets.reduce((total, budget) => {
			// accumulator used for when a budget has multiple expenses
			let accum = 0;
			// loop through each item object and add up the value
			for (let key in budget.items) {
				accum = accum + parseInt(budget.items[key].value);
			}
			// return the total plus the accumulated value of all items in budget
			return total + accum;
		}, 0);
	};

	// Method to determine the total cost of all the stops of a given trip
	allStopsCost = () => {
		// Reduce used to get total for all stops
		return this.state.stops.reduce((total, stop) => {
			// run stopCost method for each stop in the trip
			return total + this.stopCost(stop.budgets);
		}, 0);
	};

	render() {
		return (
			<Router>
				<div className="wrapper">
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
					<ul className="stopNav">
						{this.state.stops.map(stop => {
							const currentStopCost = this.stopCost(stop.budgets);
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
					{this.state.stops.map(stop => {
						const currentStopCost = this.stopCost(stop.budgets);
						return (
							<div>
								<Route
									path={`/${stop.name}`}
									render={() => {
										return (
											<Stop
												name={stop.name}
												budgets={stop.budgets}
												stopId={stop.key}
												stopCost={currentStopCost}
											/>
										);
									}}
								/>
							</div>
						);
					})}

					<footer>
						{this.state.stops.length !== 0 ? <h2>Total Trip Cost: ${this.allStopsCost()}</h2> : null}
						<button onClick={this.checkStops}>Check Stops</button>
					</footer>
				</div>
			</Router>
		);
	}
}

export default App;
