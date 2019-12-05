import React, { Component } from 'react';
import form from './form.module.css';
import firebase from '../firebase';

const Form = ({ formText, inputs, handleChange, handleSubmit, submitText }) => {
	return (
		<div className="container">
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
			{/* <Form
					formText="Add a new expense to your stop:"
					inputs={this.props.inputList}
					handleSubmit={this.handleSubmit}
				/> */}
			<form onSubmit={handleSubmit}>
				<p>{formText}</p>
				<div className={form.inputContainer}>
					{inputs.map(input => {
						if (input.type === 'select') {
							return (
								<div className={form.inputItem}>
									<label htmlFor="expenseCategory">Category:</label>
									<select onChange={handleChange} name="expenseCategory" id="expenseCategory">
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
									<input type={input.type} id={input.id} onChange={handleChange} required />
								</div>
							);
						}
					})}
				</div>
				<button className={form.submit}>{submitText}</button>
			</form>
		</div>
	);
};

export default Form;
