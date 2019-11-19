import React from 'react';
import ExpenseList from './expenseList';

const Stop = ({ name }) => {
	return (
		<div>
			<h1>{name}</h1>
			<ExpenseList type="Flight" />
			<ExpenseList type="Food and Drink" />
			<ExpenseList type="Culture" />
			<ExpenseList type="Miscellaneous" />
		</div>
	);
};

export default Stop;
