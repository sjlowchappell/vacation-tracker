import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';
import stopStyles from './stop.module.css';

const Stop = ({ stop, uid }) => {
	const { name, budget, expenses, key, cost } = stop;
	return (
		<section className={stopStyles.container}>
			<div className={stopStyles.heading}>
				<h2>{name}</h2>
				<h2 className={stopStyles.budget}>Budget: ${budget}</h2>
			</div>
			<ExpenseList key={uuidv4()} items={expenses} stopId={key} cost={cost} budget={budget} uid={uid} />
		</section>
	);
};

export default Stop;
