import React from 'react';
import table from './table.module.css';
import Button from './button';

const Table = ({ sortItems, expenses, removeItem }) => {
	return (
		<div className={table.container}>
			<table>
				<thead>
					<tr>
						<th>
							<button onClick={sortItems} value="date" data-dir="des">
								Date
							</button>
						</th>
						<th>
							<button onClick={sortItems} value="name" data-dir="des">
								Name
							</button>
						</th>
						<th>
							<button onClick={sortItems} value="value" data-dir="des">
								Value
							</button>
						</th>
						<th>
							<button onClick={sortItems} value="category" data-dir="des">
								Category
							</button>
						</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{expenses.map(expense => {
						return (
							<tr key={expense.key} className={table.expenseItem}>
								<td>{expense.date}</td>
								<td>{expense.name}</td>
								<td>${expense.value}</td>
								<td>{expense.category}</td>
								<td>
									<Button styleType="red" listener={() => removeItem(expense.key)}>
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
