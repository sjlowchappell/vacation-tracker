import React, { Component } from 'react';
import firebase from '../firebase';

class ExpenseList extends Component {
	constructor() {
		super();
		this.state = {
			expenses: [],
			expenseName: '',
			expenseValue: '',
		};
	}
	componentDidMount() {
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase
			.database()
			.ref('/users/' + userId + '/stops/' + this.props.stopId + '/budgets/' + this.props.budgetNum + '/items/');
		dbRef.on('value', response => {
			const newState = [];
			let newExpenseTotal = 0;
			const data = response.val();
			for (let key in data) {
				newState.push({ key: key, name: data[key].name, value: data[key].value });
				newExpenseTotal = newExpenseTotal + parseInt(data[key].value);
			}
			this.setState({
				expenses: newState,
				expenseTotal: this.props.expenseTotal + newExpenseTotal,
			});
		});
	}
	handleSubmit = e => {
		e.preventDefault();
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase
			.database()
			.ref('/users/' + userId + '/stops/' + this.props.stopId + '/budgets/' + this.props.budgetNum + '/items/');
		dbRef.push({ name: this.state.expenseName, value: this.state.expenseValue });
		this.setState({
			expenseName: '',
			expenseValue: '',
		});
	};
	handleChange = e => {
		const expense = e.target.id;
		this.setState({ [expense]: e.target.value });
	};
	removeItem = itemId => {
		// get reference to users stops
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase
			.database()
			.ref('/users/' + userId + '/stops/' + this.props.stopId + '/budgets/' + this.props.budgetNum + '/items/');
		// use child() and remove() methods to get the stop and remove it
		dbRef.child(itemId).remove();
	};
	render() {
		return (
			<div>
				<h2>{this.props.type} Expenses:</h2>
				<ul>
					{this.state.expenses.map(expense => {
						return (
							<li key={expense.key}>
								<p>
									{expense.name}: {expense.value}
								</p>
								<button onClick={() => this.removeItem(expense.key)}>Remove Item</button>
							</li>
						);
					})}
				</ul>
				<p>Expense Total: {this.state.expenseTotal}</p>
				<form action="">
					<label htmlFor="expenseName">Expense name:</label>
					<input onChange={this.handleChange} type="text" id="expenseName" />
					<label htmlFor="expenseValue">Expense value:</label>
					<input onChange={this.handleChange} type="text" id="expenseValue" />
					<button onClick={this.handleSubmit}>Submit Expense</button>
				</form>
			</div>
		);
	}
}

export default ExpenseList;
