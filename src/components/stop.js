import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';

const Stop = ({ name, budgets, stopId, stopCost }) => {
	return (
		<div>
			<h1>{name}</h1>
			{budgets.map((budget, index) => {
				return (
					<ExpenseList
						key={uuidv4()}
						type={budget.name}
						items={budget.items}
						stopId={stopId}
						budgetNum={index}
					/>
				);
			})}
			<h2>Stop total cost: {stopCost}</h2>
		</div>
	);
};

export default Stop;
