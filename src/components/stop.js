import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';
import styles from './stop.module.css';
import PropTypes from 'prop-types';

const Stop = ({ stop, uid }) => {
	const { name, budget, expenses, key, cost } = stop;
	return (
		<section className={styles.container}>
			<div className={styles.heading}>
				<h2>{name}</h2>
				<h2 className={styles.budget}>Budget: ${budget}</h2>
			</div>
			<ExpenseList key={uuidv4()} items={expenses} stopId={key} cost={cost} budget={budget} uid={uid} />
		</section>
	);
};

Stop.propTypes = {
	stop: PropTypes.object,
	uid: PropTypes.string,
};

export default Stop;
