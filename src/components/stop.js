import React from 'react';
import ExpenseList from './expenseList';

const Stop = ({ name, budgets, stopId }) => {
	return (
		<div>
			<h1>{name}</h1>
			{budgets.map((budget, index) => {
				return <ExpenseList type={budget.name} items={budget.items} stopId={stopId} budgetNum={index} />;
			})}
		</div>
	);
};

export default Stop;
