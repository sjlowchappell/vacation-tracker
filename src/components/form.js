import React from 'react';
import form from './form.module.css';

const Form = ({ formText, inputs, handleChange, handleSubmit, submitText }) => {
	return (
		<div className={form.container}>
			<form onSubmit={handleSubmit}>
				<p>{formText}</p>
				<div className={form.inputContainer}>
					{inputs.map(input => {
						if (input.type === 'select') {
							return (
								// Tried using uuidv4 for creating unique keys but it broke the handleChange function
								<div key={`${input.id}Container`} className={form.inputItem}>
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
								// Tried using uuidv4 for creating unique keys but it broke the handleChange function
								<div key={`${input.id}Container`} className={form.inputItem}>
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
