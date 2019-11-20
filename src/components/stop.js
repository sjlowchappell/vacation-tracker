import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';

const Stop = ({ name, budgets, stopId }) => {
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
		</div>
	);
};

export default Stop;
