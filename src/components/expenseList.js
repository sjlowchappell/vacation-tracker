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
			expenseCategory: 'food',
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
				newState.push({
					key: key,
					name: data[key].name,
					value: data[key].value,
					date: data[key].date,
					category: data[key].category,
				});
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
		console.log(this.state);
		dbRef.push({
			name: this.state.expenseName,
			value: this.state.expenseValue,
			date: this.state.expenseDate,
			category: this.state.expenseCategory,
		});
		this.setState({
			expenseName: '',
			expenseValue: '',
			expenseDate: '',
			expenseCategory: 'food',
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
		// get sort type from value (date, name, or value)
		const sortType = e.target.value;
		// get direction from data set (ascending or descending)
		const direction = e.target.dataset.dir;
		let newState;
		// if the value is descending:
		if (direction === 'des') {
			// check if sort type is value (need to parseint if this is the case)
			sortType === 'value'
				? (newState = this.state.expenses.sort((a, b) =>
						// return an array sorted based on number value in descending order
						parseInt(a[sortType]) > parseInt(b[sortType]) ? 1 : -1,
				  ))
				: //   else return an array sorted by value in descending order
				  (newState = this.state.expenses.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1)));
			// toggle the direction attribute to ascending
			e.target.setAttribute('data-dir', 'asc');
		} else {
			// else if value is ascending
			// check if sort type is value (need to parseint if this is the case)
			sortType === 'value'
				? (newState = this.state.expenses.sort((a, b) =>
						// return an array sorted based on number value in ascending order
						parseInt(a[sortType]) < parseInt(b[sortType]) ? 1 : -1,
				  ))
				: //   else return an array sorted by value in ascending order
				  (newState = this.state.expenses.sort((a, b) => (a[sortType] < b[sortType] ? 1 : -1)));
			// toggle the direction attribute to descending
			e.target.setAttribute('data-dir', 'des');
		}
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
				</div>
				<table>
					<thead>
						<tr>
							<th>
								<button onClick={this.sortItems} value="date" data-dir="des">
									Date
								</button>
							</th>
							<th>
								<button onClick={this.sortItems} value="name" data-dir="des">
									Name
								</button>
							</th>
							<th>
								<button onClick={this.sortItems} value="value" data-dir="des">
									Value
								</button>
							</th>
							<th>
								<button onClick={this.sortItems} value="category" data-dir="des">
									Category
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{this.state.expenses.map(expense => {
							console.log(expense);
							return (
								<tr key={expense.key} className={expenseList.expenseItem}>
									<td className={expenseList.date}>{expense.date}</td>
									<td>{expense.name}</td>
									<td>${expense.value}</td>
									<td>
										{expense.category}
										{/* <select name="categories" id="">
											<option value="food">Food</option>
											<option value="food">Transport</option>
											<option value="food">Lodging</option>
											<option value="food">Miscellaneous</option>
										</select> */}
									</td>
									<td>
										<button className="removeButton" onClick={() => this.removeItem(expense.key)}>
											Remove
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
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
						<div className={expenseList.inputItem}>
							<select onChange={this.handleChange} name="expenseCategory" id="expenseCategory">
								<option value="food">Food</option>
								<option value="transport">Transport</option>
								<option value="lodging">Lodging</option>
								<option value="miscellaneous">Miscellaneous</option>
							</select>
						</div>
					</div>
					<button>Submit Expense</button>
				</form>
			</div>
		);
	}
}

export default ExpenseList;
