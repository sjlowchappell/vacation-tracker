import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';
import stop from './stop.module.css';

const Stop = ({ name, budget, expenses, stopId, cost }) => {
	return (
		<div className={stop.container}>
			<div className={stop.header}>
				<h1>{name}</h1>
				<p className={stop.budget}>Budget: ${budget}</p>
			</div>
			<div className={stop.expenseContainer}>
				<ExpenseList key={uuidv4()} items={expenses} stopId={stopId} cost={cost} budget={budget} />
			</div>
		</div>
	);
};

export default Stop;
