import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

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

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
				const userId = firebase.auth().currentUser.uid;
				const dbRef = firebase.database().ref('/users/' + userId);
				dbRef.on('value', response => {
					const newState = [];
					const data = response.val();
					for (let key in data) {
						newState.push({ key: key, name: data[key] });
					}
					this.setState({
						stops: newState,
						userInput: '',
					});
				});
			} else {
				this.setState({
					stops: [],
				});
			}
		});
	}

	handleChange = e => {
		this.setState({
			userInput: e.target.value,
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref('/users/' + userId);
		dbRef.push(this.state.userInput);
		this.setState({ userInput: '' });
	};
	removeStop = stopId => {
		const dbRef = firebase.database().ref();
		dbRef.child(stopId).remove();
	};

	// Auth Related Methods
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
							<li>
								<p>{stop.name}</p>
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

export default App;
