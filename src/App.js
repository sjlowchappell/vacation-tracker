import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Stop from './components/stop';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Footer from './components/footer';
import SideBar from './components/sideBar';

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
				<SideBar
					user={this.state.user}
					login={this.login}
					logout={this.logout}
					stops={this.state.stops}
					stopCost={this.stopCost}
				/>
				<div className="wrapper">
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
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
