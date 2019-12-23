import React from 'react';
import styles from './button.module.css';

const Button = ({ styleType, listener, children }) => {
	return (
		<button className={styles[styleType]} onClick={listener}>
			{children}
		</button>
	);
};

export default Button;
