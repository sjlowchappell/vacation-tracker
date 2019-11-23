import React, { Component } from 'react';
import firebase from '../firebase';
import expenseList from './expenseList.module.css';

class ExpenseList extends Component {
	constructor() {
		super();
		this.state = {
			expenses: [],
			expenseName: '',
			expenseValue: '',
			expenseDate: '',
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
				newState.push({ key: key, name: data[key].name, value: data[key].value, date: data[key].date });
				newExpenseTotal = newExpenseTotal + parseInt(data[key].value);
			}
			this.setState({
				expenses: newState,
				expenseTotal: newExpenseTotal,
			});
		});
	}
	handleSubmit = e => {
		e.preventDefault();
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase
			.database()
			.ref('/users/' + userId + '/stops/' + this.props.stopId + '/budgets/' + this.props.budgetNum + '/items/');
		dbRef.push({ name: this.state.expenseName, value: this.state.expenseValue, date: this.state.expenseDate });
		this.setState({
			expenseName: '',
			expenseValue: '',
			expenseDate: '',
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
			<div className={expenseList.container}>
				<h2>
					{this.props.type} Expenses: ${this.state.expenseTotal}
				</h2>
				<ul>
					{this.state.expenses.map(expense => {
						return (
							<li key={expense.key} className={expenseList.expenseItem}>
								<div className={expenseList.expenseInfo}>
									<p>{expense.name}</p>
									<p>${expense.value}</p>
								</div>
								<p className={expenseList.date}>{expense.date}</p>
								<button className="removeButton" onClick={() => this.removeItem(expense.key)}>
									Remove Item
								</button>
							</li>
						);
					})}
				</ul>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="expenseName">Expense name: </label>
					<input onChange={this.handleChange} type="text" id="expenseName" required />
					<label htmlFor="expenseValue">Expense value: $</label>
					<input onChange={this.handleChange} type="number" id="expenseValue" required />
					<label htmlFor="expenseDate">Expense Date: </label>
					<input onChange={this.handleChange} type="date" id="expenseDate" required />
					<button>Submit Expense</button>
				</form>
			</div>
		);
	}
}

export default ExpenseList;
