import React from 'react';
import styles from './input.module.css';
import PropTypes from 'prop-types';

const Input = ({ input, handleChange }) => {
	const { id, type, text } = input;
	return (
		<div className={styles.formInput}>
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

Input.propTypes = {
	input: PropTypes.object,
	handleChange: PropTypes.func,
};

export default Input;
