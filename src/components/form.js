import React from 'react';
import form from './form.module.css';
import Button from './button';

const Form = ({ formText, inputs, handleChange, handleSubmit, submitText }) => {
	return (
		<div className={form.container}>
			<form onSubmit={handleSubmit}>
				<p>{formText}</p>
				<div className={form.inputContainer}>
					{inputs.map(input => {
						return input.type === 'select' ? (
							// Tried using uuidv4 for creating unique keys but it broke the handleChange function
							<div key={`${input.id}Container`} className={form.formInput}>
								<label htmlFor="expenseCategory">Category:</label>
								<select
									onChange={handleChange}
									name="expenseCategory"
									id="expenseCategory"
									className={form.inputSelect}
								>
									<option value="Food">Food</option>
									<option value="Transport">Transport</option>
									<option value="Lodging">Lodging</option>
									<option value="Entertainment">Entertainment</option>
									<option value="Shopping">Shopping</option>
									<option value="Miscellaneous">Miscellaneous</option>
								</select>
							</div>
						) : (
							// Tried using uuidv4 for creating unique keys but it broke the handleChange function
							<div key={`${input.id}Container`} className={form.formInput}>
								<label htmlFor={input.id}>{input.text}: </label>
								<input
									type={input.type}
									id={input.id}
									className={form.inputItem}
									onChange={handleChange}
									step={input.id === 'expenseValue' ? '0.01' : null}
									min={input.type === 'number' ? '0' : null}
									required
								/>
							</div>
						);
					})}
				</div>
				<Button styleType="blue">{submitText}</Button>
			</form>
		</div>
	);
};

export default Form;
