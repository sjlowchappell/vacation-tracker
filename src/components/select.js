import React from 'react';
import styles from './input.module.css';

const Select = ({ handleChange }) => {
	return (
		<div className={styles.formInput}>
			<label htmlFor="expenseCategory">Category:</label>
			<select onChange={handleChange} name="expenseCategory" id="expenseCategory" className={styles.inputSelect}>
				<option value="Food">Food</option>
				<option value="Transport">Transport</option>
				<option value="Lodging">Lodging</option>
				<option value="Entertainment">Entertainment</option>
				<option value="Shopping">Shopping</option>
				<option value="Miscellaneous">Miscellaneous</option>
			</select>
		</div>
	);
};

export default Select;
