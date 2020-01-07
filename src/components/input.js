import React from 'react';
import styles from './input.module.css';

const Input = ({ input, handleChange }) => {
	const { id, type, text } = input;
	return (
		// Tried using uuidv4 for creating unique keys but it broke the handleChange function
		<div key={`${id}Container`} className={styles.formInput}>
			<label htmlFor={id}>{text}: </label>
			<input
				type={type}
				id={id}
				className={styles.inputItem}
				onChange={handleChange}
				step={id === 'expenseValue' ? '0.01' : null}
				min={type === 'number' ? '0' : null}
				required
			/>
		</div>
	);
};

export default Input;
