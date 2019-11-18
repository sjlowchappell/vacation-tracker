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
			}
		});

		const dbRef = firebase.database().ref();
		dbRef.on('value', response => {
			console.log(response.val());
			const newState = [];
			const data = response.val();
			for (let key in data) {
				newState.push({ key: key, name: data[key] });
				console.log(key);
				console.log(data[key]);
			}
			this.setState({
				stops: newState,
				userInput: '',
			});
		});
	}

	handleChange = e => {
		this.setState({
			userInput: e.target.value,
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		const dbRef = firebase.database().ref();
		dbRef.push(this.state.userInput);
		this.setState({ userInput: '' });
	};
	removeStop = stopId => {
		const dbRef = firebase.database().ref();
		dbRef.child(stopId).remove();
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
			<div>
				<header>
					{this.state.user ? (
						<button onClick={this.logout}>Log Out</button>
					) : (
						<button onClick={this.login}>Log In</button>
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
