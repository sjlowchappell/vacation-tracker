import React, { Component } from 'react';
import firebase from '../firebase';
import styles from './expenseList.module.css';
import Form from './form';
import Table from './table';
import inputList from '../utils/expenseInputs';
import { itemSort } from '../utils/itemSort';
import { decimalPlace } from '../utils/decimalPlace';

class ExpenseList extends Component {
	constructor(props) {
		super(props);
		const { items } = props;
		let expenseList = [];
		for (let key in items) {
			expenseList.push({
				key: key,
				name: items[key].name,
				value: items[key].value,
				date: items[key].date,
				category: items[key].category,
			});
		}
		this.state = {
			expenses: expenseList,
			expenseName: '',
			expenseValue: '',
			expenseDate: '',
			expenseCategory: 'Food',
			sortDirection: 'des',
			sortType: 'date',
		};
	}
	componentDidMount() {
		// initially sort items by date
		this.sortItems();
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
			value: decimalPlace(this.state.expenseValue),
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
		dbRef.update({ cost: decimalPlace(newCost) });
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
			itemCost = response.val().value;
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
		// if there is an event, make sortType = e.target.dataset.type
		// Otherwise, pull it from state (in the case of initial load)
		let sortType;
		e ? (sortType = e.target.dataset.type) : (sortType = this.state.sortType);
		// destructure variables from state
		const { sortDirection, expenses } = this.state;
		// use imported helper function to sort the items and get a new sort direction
		const sortedData = itemSort(sortType, sortDirection, expenses);

		// Update expenses after they've been sorted
		this.setState({
			expenses: sortedData.expenses,
			sortDirection: sortedData.direction,
			sortType: sortType,
		});
	};

	render() {
		const { cost, budget } = this.props;
		const { expenses, sortDirection, sortType } = this.state;
		return (
			<div className={styles.container}>
				<div className={styles.inputContainer}>
					<h3>
						Total Spent:{' '}
						<span className={parseFloat(cost) > budget ? styles.red : styles.green}>${cost}</span>
					</h3>
				</div>
				<Table
					sortItems={this.sortItems}
					expenses={expenses}
					removeItem={this.removeItem}
					sortDirection={sortDirection}
					sortType={sortType}
				/>
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
