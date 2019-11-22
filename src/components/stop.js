import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';
// import stop from './stop.module.css';
import { Link } from 'react-router-dom';

const Stop = ({ name, budgets, stopId, stopCost, removeStop }) => {
	return (
		<div>
			<h1>{name}</h1>
			<button className="removeButton" onClick={() => removeStop(stopId)}>
				<Link to="/">Remove Stop</Link>
			</button>
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
			<h2>Stop total cost: ${stopCost}</h2>
		</div>
	);
};

export default Stop;
