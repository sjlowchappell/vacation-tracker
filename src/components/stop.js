import React from 'react';
import ExpenseList from './expenseList';
import uuidv4 from 'uuid/v4';
import stop from './stop.module.css';
import { Link } from 'react-router-dom';

const Stop = ({ name, expenses, stopId, cost, removeStop }) => {
	return (
		<div className={stop.container}>
			<div className={stop.header}>
				<h1>{name}</h1>
				<h2>Stop total cost: ${cost}</h2>
				<button className="removeButton" onClick={() => removeStop(stopId)}>
					<Link to="/">Remove Stop</Link>
				</button>
			</div>
			<div className={stop.expenseContainer}>
				<ExpenseList key={uuidv4()} items={expenses} stopId={stopId} cost={cost} />
			</div>
		</div>
	);
};

export default Stop;
