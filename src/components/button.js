import React from 'react';
import buttonStyles from './button.module.css';

const Button = ({ styleType, listener, children }) => {
	return (
		<button className={buttonStyles[styleType]} onClick={listener}>
			{children}
		</button>
	);
};

export default Button;
