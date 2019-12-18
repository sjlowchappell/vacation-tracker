import React, { Component } from 'react';
import firebase from '../firebase';
import expenseList from './expenseList.module.css';
import Form from './form';
import Table from './table';
import inputList from '../utils/expenseInputs';

class ExpenseList extends Component {
	constructor() {
		super();
		this.state = {
			expenses: [],
			expenseName: '',
			expenseValue: '',
			expenseDate: '',
			expenseCategory: 'Food',
			sortDirection: 'des',
		};
	}

	// Lifecycle method on mount:
	componentDidMount() {
		// Get userid and stopid from props
		const { uid, stopId } = this.props;
		// Get db reference to expenses for the particular stop
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId + '/expenses/');
		dbRef.on('value', response => {
			const newState = [];
			const data = response.val();
			// iterate through the data response and create new state based on values from database
			for (let key in data) {
				newState.push({
					key: key,
					name: data[key].name,
					value: data[key].value,
					date: data[key].date,
					category: data[key].category,
				});
			}
			// Update state with new expense list
			this.setState({
				expenses: newState,
			});
		});
	}

	// FORM RELATED FUNCTIONS:
	handleSubmit = e => {
		e.preventDefault();
		const { uid, stopId } = this.props;
		// get dbRef to expenses for particular stop
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId + '/expenses/');
		// add a new expense with name, value, date, and category taken from user input
		dbRef.push({
			name: this.state.expenseName,
			value: this.decimalPlace(this.state.expenseValue),
			date: this.state.expenseDate,
			category: this.state.expenseCategory,
		});
		// call the costUpdate function to add the new expense value
		this.costUpdate(this.state.expenseValue, 'add');
		// update state to clear out the form
		this.setState({
			expenseName: '',
			expenseValue: '',
			expenseDate: '',
			expenseCategory: 'Food',
		});
	};
	// set state based on user input
	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	// HELPER FUNCTIONS:
	// Helper function to set all expense values to two decimal places
	decimalPlace = num => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	// Cost update for when an item is added or removed
	costUpdate = (num, operator) => {
		const floatNum = parseFloat(num);
		let newCost;
		const { uid, stopId } = this.props;
		// Gets a dbref to the current cost of the stop
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId);
		dbRef.once('value', response => {
			const data = response.val();
			const currentCost = parseFloat(data.cost);
			// Adds or subtracts the number passed into the function from cost based on whether operator is add or subtract
			operator === 'add' ? (newCost = currentCost + floatNum) : (newCost = currentCost - floatNum);
		});

		// Updates the dbRef with the new value, set to 2 decimal places
		dbRef.update({ cost: this.decimalPlace(newCost) });
	};

	// ITEM MANIPULATION FUNCTIONS:
	removeItem = itemId => {
		const { uid, stopId } = this.props;

		// First, need to update the cost of the stop with the removed item's value
		let itemCost;
		// Get a reference to the cost of the individual item
		const itemCostRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId + '/expenses/' + itemId);
		// On reference value, save reference in a variable
		itemCostRef.once('value', response => {
			itemCost = parseFloat(response.val().value);
		});
		// Call costUpdate in order to update the total cost of the given stop
		this.costUpdate(itemCost, 'subtract');

		// Second, need to remove the item from the database
		// Get a database reference to the expenses list
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId + '/expenses/');

		// use child() and remove() methods to get the item and remove it
		dbRef.child(itemId).remove();
	};
	sortItems = e => {
		// get sort type from value (date, name, or value)
		const sortType = e.target.value;
		const { sortDirection, expenses } = this.state;
		let newState;
		let newDirection;
		// check if sort direction is ascending or descending
		// Sort expenses based on sortType
		if (sortDirection === 'des') {
			newState = expenses.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1));
			newDirection = 'asc';
		} else {
			newState = expenses.sort((a, b) => (a[sortType] < b[sortType] ? 1 : -1));
			newDirection = 'des';
		}
		// Update expenses after they've been sorted
		this.setState({
			expenses: newState,
			sortDirection: newDirection,
		});
	};

	render() {
		const { cost, budget } = this.props;
		return (
			<div className={expenseList.container}>
				<div className={expenseList.inputContainer}>
					<h2>
						Total Spent:{' '}
						<span className={parseFloat(cost) > budget ? expenseList.red : expenseList.green}>${cost}</span>
					</h2>
				</div>
				<Table sortItems={this.sortItems} expenses={this.state.expenses} removeItem={this.removeItem} />
				<Form
					formText="Add a new Expense to your trip:"
					inputs={inputList}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					submitText={'Submit Expense'}
				/>
			</div>
		);
	}
}

export default ExpenseList;
