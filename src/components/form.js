import React, { Component } from 'react';
import form from './form.module.css';

class Form extends Component {
	constructor() {
		super();
		this.state = {};
	}

	// Method for handling form input -> sets state based on user input
	handleChange = e => {
		const inputType = e.target.id;
		this.setState({ [inputType]: e.target.value });
	};

	// Method for handling form submission for adding a new stop
	handleSubmit = e => {
		e.preventDefault();
		// Get database reference for user and stops
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref('/users/' + userId + '/stops/');
		// Create a new stop object with it's name, expenses, and cost
		const stop = {
			name: this.state.location,
			budget: this.state.budget,
			arrival: this.state.arrival,
			departure: this.state.departure,
			expenses: [],
			cost: 0,
		};
		// Push the new stop to the database
		dbRef.push(stop);
		// Update state to clear out the user input
		this.setState({ name: '', budget: 0, arrival: '', departure: '' });
	};

	// method for handling form submission for adding a new expense
	handleSubmit = e => {
		e.preventDefault();
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref('/users/' + userId + '/stops/' + this.props.stopId + '/expenses/');
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
	render() {
		return (
			<div>
				{/* Form skeleton: */}
				{/* Form with handle submit function (either add a stop or add an expense) */}
				{/* Input 1 -> Either Location or Expense Name
                    id/htmlFor, input type, input text
                    input1 = {id: ..., type: ..., text: ...}
                */}
				{/* Input 2 -> Either Budget Total or Expense Value*/}
				{/* Input 3 -> Either Arrival Date or Expense Date*/}
				{/* Input 4 -> Either Departure Date or Category*/}
				{/* Submit Button */}
				{/* If form Type  */}
				<Form formText="Add a new stop to your trip:" inputs={inputList} handleSubmit={this.handleSubmit} />
				<Form formText="Add a new expense to your stop:" inputs={inputList} handleSubmit={this.handleSubmit} />
				<form onSubmit={this.handleSubmit}>
					<p>{this.props.formText}</p>
					<div className={form.inputContainer}>
						{this.props.inputs.map(input => {
							console.log(input);
							if (input.type === 'select') {
								return (
									<div className={expenseList.inputItem}>
										<label htmlFor="expenseCategory">Category:</label>
										<select
											onChange={this.handleChange}
											name="expenseCategory"
											id="expenseCategory"
										>
											<option value="Food">Food</option>
											<option value="Transport">Transport</option>
											<option value="Lodging">Lodging</option>
											<option value="Entertainment">Entertainment</option>
											<option value="Shopping">Shopping</option>
											<option value="Miscellaneous">Miscellaneous</option>
										</select>
									</div>
								);
							} else {
								return (
									<div className={form.inputItem}>
										<label htmlFor={input.id}>{input.text}: </label>
										<input type={input.type} id={input.id} onChange={this.handleChange} required />
									</div>
								);
							}
						})}
					</div>
					<button className={form.submit}>Add Stop</button>
				</form>
			</div>
		);
	}
}

export default Form;
