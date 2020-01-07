import React from 'react';
import styles from './input.module.css';

const Input = ({ input, handleChange }) => {
	return (
		// Tried using uuidv4 for creating unique keys but it broke the handleChange function
		<div key={`${input.id}Container`} className={styles.formInput}>
			<label htmlFor={input.id}>{input.text}: </label>
			<input
				type={input.type}
				id={input.id}
				className={styles.inputItem}
				onChange={handleChange}
				step={input.id === 'expenseValue' ? '0.01' : null}
				min={input.type === 'number' ? '0' : null}
				required
			/>
		</div>
	);
};

export default Input;
