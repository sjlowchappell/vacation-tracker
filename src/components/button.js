import React from 'react';
import styles from './button.module.css';
import PropTypes from 'prop-types';

const Button = ({ styleType, listener, children }) => {
	return (
		<button className={styles[styleType]} onClick={listener}>
			{children}
		</button>
	);
};

Button.propTypes = {
	styleType: PropTypes.string,
	listener: PropTypes.func,
	children: PropTypes.string,
};

export default Button;
