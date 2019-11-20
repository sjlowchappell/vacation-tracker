import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';

const Stop = ({ name, budgets, stopId }) => {
	const totalCost = budgets.reduce((total, budget) => {
		let accum = 0;
		for (let key in budget.items) {
			accum = accum + parseInt(budget.items[key].value);
		}
		return total + accum;
	}, 0);
	return (
		<div>
			<h1>{name}</h1>
			{budgets.map((budget, index) => {
				return (
					<ExpenseList
						key={uuidv4()}
						type={budget.name}
						items={budget.items}
						expenseTotal={budget.expenseTotal}
						stopId={stopId}
						budgetNum={index}
					/>
				);
			})}
			<h2>Trip cost total: {totalCost}</h2>
		</div>
	);
};

export default Stop;
