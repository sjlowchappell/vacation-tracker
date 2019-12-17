import React, { Component } from 'react';
import firebase from '../firebase';
import expenseList from './expenseList.module.css';
import Form from './form';
import Table from './table';

const inputList = [
	{ id: 'expenseName', type: 'text', text: 'Name' },
	{ id: 'expenseValue', type: 'number', text: 'Value' },
	{ id: 'expenseDate', type: 'date', text: 'Date' },
	{ id: 'expenseCategory', type: 'select', text: 'Category' },
];

class ExpenseList extends Component {
	constructor() {
		super();
		this.state = {
			expenses: [],
			expenseName: '',
			expenseValue: '',
			expenseDate: '',
			expenseCategory: 'Food',
		};
	}
	componentDidMount() {
		const { uid, stopId } = this.props;
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId + '/expenses/');
		dbRef.on('value', response => {
			const newState = [];
			const data = response.val();
			for (let key in data) {
				newState.push({
					key: key,
					name: data[key].name,
					value: data[key].value,
					date: data[key].date,
					category: data[key].category,
				});
			}
			this.setState({
				expenses: newState,
			});
		});
	}
	costUpdate = newVal => {
		const { uid, stopId } = this.props;
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId);
		let newCostTotal = parseFloat(newVal);
		dbRef.once('value', response => {
			const data = response.val();
			newCostTotal = data.cost + newCostTotal;
		});
		dbRef.update({ cost: newCostTotal });
	};
	costUpdateLower = itemId => {
		// get reference to users stops
		let itemCost;
		let newCostTotal;
		const { uid, stopId } = this.props;

		// Get a reference to the cost of the individual item
		const itemCostRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId + '/expenses/' + itemId);
		// On reference value, save reference in a variable
		itemCostRef.once('value', response => {
			itemCost = parseFloat(response.val().value);
		});

		// Get a reference to the total cost of the stop
		const stopTotalRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId);
		// Once the reference has been made, calculate the new cost total based on the previously found item value
		stopTotalRef.once('value', response => {
			const data = response.val();
			newCostTotal = data.cost - itemCost;
		});

		// Update the stop total cost based on the new cost value
		stopTotalRef.update({ cost: newCostTotal });
	};
	handleSubmit = e => {
		e.preventDefault();
		const { uid, stopId } = this.props;
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId + '/expenses/');
		dbRef.push({
			name: this.state.expenseName,
			value: this.state.expenseValue,
			date: this.state.expenseDate,
			category: this.state.expenseCategory,
		});
		this.costUpdate(this.state.expenseValue);
		this.setState({
			expenseName: '',
			expenseValue: '',
			expenseDate: '',
			expenseCategory: 'Food',
		});
	};
	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	removeItem = itemId => {
		// get reference to users stops
		this.costUpdateLower(itemId);
		const { uid, stopId } = this.props;

		// Get a database reference to the expenses list
		const dbRef = firebase.database().ref('/users/' + uid + '/stops/' + stopId + '/expenses/');

		// use child() and remove() methods to get the item and remove it
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
			// check if sort type is value (need to parseFloat if this is the case)
			sortType === 'value'
				? (newState = this.state.expenses.sort((a, b) =>
						// return an array sorted based on number value in descending order
						parseFloat(a[sortType]) > parseFloat(b[sortType]) ? 1 : -1,
				  ))
				: //   else return an array sorted by value in descending order
				  (newState = this.state.expenses.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1)));
			// toggle the direction attribute to ascending
			e.target.setAttribute('data-dir', 'asc');
		} else {
			// else if value is ascending
			// check if sort type is value (need to parseFloat if this is the case)
			sortType === 'value'
				? (newState = this.state.expenses.sort((a, b) =>
						// return an array sorted based on number value in ascending order
						parseFloat(a[sortType]) < parseFloat(b[sortType]) ? 1 : -1,
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
		const { cost, budget } = this.props;
		return (
			<div className={expenseList.container}>
				<div className={expenseList.inputContainer}>
					<h2>
						Total Spent:{' '}
						<span className={cost > budget ? expenseList.red : expenseList.green}>${cost}</span>
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
