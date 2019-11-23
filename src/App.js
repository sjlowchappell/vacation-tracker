import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/footer';
import SideBar from './components/sideBar';
import MainContent from './components/mainContent';

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

	login = () => {
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

	render() {
		return (
			<Router>
				<div className="wrapper">
					<div className="contentContainer">
						<SideBar
							user={this.state.user}
							login={this.login}
							logout={this.logout}
							stops={this.state.stops}
							stopCost={this.stopCost}
							totalCost={this.allStopsCost()}
						/>

						<MainContent stops={this.state.stops} stopCost={this.stopCost} />
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
