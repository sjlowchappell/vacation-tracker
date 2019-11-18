import React, { Component } from 'react';

class ExpenseList extends Component {
	constructor() {
		super();
		this.state = {
			expenses: [{ name: 'Coffee', value: '$3.00' }],
			expenseName: '',
			expenseValue: '',
		};
	}
	handleSubmit = e => {
		e.preventDefault();
		const newState = this.state.expenses;
		newState.push({ name: this.state.expenseName, value: this.state.expenseValue });
		console.log(newState);
		this.setState({
			expenses: newState,
			expenseName: '',
			expenseValue: '',
		});
	};
	handleChange = e => {
		const expense = e.target.id;
		this.setState({ [expense]: e.target.value });
	};
	render() {
		return (
			<div>
				<h2>Expenses:</h2>
				<ul>
					{this.state.expenses.map(expense => {
						return (
							<li>
								{expense.name}: {expense.value}
							</li>
						);
					})}
				</ul>
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
