import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login';
import Footer from './components/footer';
import SideBar from './components/sideBar';
import MainContent from './components/mainContent';
import LoadingCircle from './components/loadingCircle';
import { calculateAllCosts } from './utils/calculateAllCosts';

const auth = firebase.auth();

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			stops: [],
			loading: true,
		};
	}

	// when component mounts, checks if user is logged in
	componentDidMount() {
		auth.onAuthStateChanged(user => {
			// If user is logged in, set state to said user
			if (user) {
				this.setState({ user, uid: user.uid, loading: false });
				// Get a database reference to that user's info
				const dbRef = firebase.database().ref(`/users/${this.state.uid}/stops/`);
				// Get all stops from that user's info, along with stop data
				dbRef.on('value', response => {
					const stops = [];
					const data = response.val();
					for (let key in data) {
						const stop = data[key];
						stops.push({
							key,
							name: stop.name,
							expenses: stop.expenses,
							cost: stop.cost,
							budget: stop.budget,
							arrival: stop.arrival,
							departure: stop.departure,
						});
					}
					// Update state of the application based on user's info
					this.setState({
						stops,
						userInput: '',
					});
				});
			} else {
				// If no user is logged in, clear the page
				this.setState({
					stops: [],
					loading: false,
				});
			}
		});
	}

	// Method to determine the total cost of all the stops of a given trip
	allStopsCost = () => {
		// adds up all the costs and rounds the returned number to 2 decimal places
		return calculateAllCosts(this.state.stops);
	};

	//Login and logout related methods
	login = providerType => {
		let provider;
		providerType === 'google'
			? (provider = new firebase.auth.GoogleAuthProvider())
			: (provider = new firebase.auth.FacebookAuthProvider());
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
				{/* If the application is still loading and hasn't determined if a user is logged in yet, render a loading ring. Otherwise, take the user to the appropriate page (either login page or main page*/}
				{this.state.loading ? (
					<LoadingCircle />
				) : this.state.user ? (
					<div className="contentContainer">
						<SideBar
							user={this.state.user}
							logout={this.logout}
							stops={this.state.stops}
							totalCost={this.allStopsCost()}
						/>

						<MainContent stops={this.state.stops} uid={this.state.uid} />
					</div>
				) : (
					<Route path="/" render={() => <Login login={this.login} />} />
				)}

				<Footer />
			</Router>
		);
	}
}

export default App;
