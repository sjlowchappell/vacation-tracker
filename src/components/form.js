import React from 'react';
import styles from './form.module.css';
import Button from './button';
import Input from './input';
import Select from './select';

const Form = ({ formText, inputs, handleChange, handleSubmit, submitText }) => {
	return (
		<form onSubmit={handleSubmit} className={styles.container}>
			<p>{formText}</p>
			<div className={styles.inputContainer}>
				{inputs.map(input => {
					return input.type === 'select' ? (
						<Select input={input} handleChange={handleChange} />
					) : (
						<Input input={input} handleChange={handleChange} />
					);
				})}
			</div>
			<Button styleType="blue">{submitText}</Button>
		</form>
	);
};

export default Form;
