import React from 'react';
import styles from './form.module.css';
import Button from './button';
import Input from './input';
import Select from './select';
import PropTypes from 'prop-types';

const Form = ({ formText, inputs, handleChange, handleSubmit, submitText, inputValues }) => {
	return (
		<form onSubmit={handleSubmit} className={styles.container}>
			<p>{formText}</p>
			<div className={styles.inputContainer}>
				{inputs.map(input => {
					return input.type === 'select' ? (
						<Select key={`${input.id}Container`} handleChange={handleChange} />
					) : (
						<Input
							key={`${input.id}Container`}
							input={input}
							handleChange={handleChange}
							inputValue={inputValues[input.id]}
						/>
					);
				})}
			</div>
			<Button styleType="blue">{submitText}</Button>
		</form>
	);
};

Form.propTypes = {
	formText: PropTypes.string,
	inputs: PropTypes.array,
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
	submitText: PropTypes.string,
	inputValues: PropTypes.object,
};

export default Form;
