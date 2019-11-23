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
	sortItems = e => {
		// const sortType = e.target.options[e.target.selectedIndex].value;
		const sortType = e.target.value;
		console.log(sortType);
		let newState;
		sortType === 'value'
			? (newState = this.state.expenses.sort((a, b) => (parseInt(a[sortType]) > parseInt(b[sortType]) ? 1 : -1)))
			: (newState = this.state.expenses.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1)));
		this.setState({
			expenses: newState,
		});
	};
	render() {
		return (
			<div className={expenseList.container}>
				<div className={expenseList.inputContainer}>
					<h2>
						{this.props.type} Expenses: ${this.state.expenseTotal}
					</h2>
					{/* <select name="sortBy" id="" onChange={this.sortItems}>
						<option value="name">Name</option>
						<option value="value">Value</option>
						<option value="date">Date</option>
					</select> */}
				</div>
				<div className={expenseList.inputContainer}>
					<button onClick={this.sortItems} value="date">
						Date
					</button>
					<button onClick={this.sortItems} value="name">
						Name
					</button>
					<button onClick={this.sortItems} value="value">
						Value
					</button>
				</div>
				<ul>
					{this.state.expenses.map(expense => {
						return (
							<li key={expense.key} className={expenseList.expenseItem}>
								<div className={expenseList.expenseInfo}>
									<p className={expenseList.date}>{expense.date}</p>
									<p>{expense.name}</p>
									<p>${expense.value}</p>
								</div>
								<div className={expenseList.expenseInfo}>
									<button className="removeButton" onClick={() => this.removeItem(expense.key)}>
										Remove Item
									</button>
								</div>
							</li>
						);
					})}
				</ul>
				<form onSubmit={this.handleSubmit}>
					<div className={expenseList.inputContainer}>
						<div className={expenseList.inputItem}>
							<label htmlFor="expenseName">Name: </label>
							<input onChange={this.handleChange} type="text" id="expenseName" required />
						</div>
						<div className={expenseList.inputItem}>
							<label htmlFor="expenseValue">Value:</label>
							<input onChange={this.handleChange} type="number" id="expenseValue" required min="0" />
						</div>
					</div>
					<div className={expenseList.inputContainer}>
						<div className={expenseList.inputItem}>
							<label htmlFor="expenseDate">Date: </label>
							<input onChange={this.handleChange} type="date" id="expenseDate" required />
						</div>
						<button>Submit Expense</button>
					</div>
				</form>
			</div>
		);
	}
}

export default ExpenseList;
