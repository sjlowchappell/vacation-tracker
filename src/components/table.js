import React from 'react';
import table from './table.module.css';

const Table = ({ sortItems, expenses, removeItem }) => {
	return (
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
							<td>
								{expense.category}
								{/* <select name="categories" id="">
                                <option value="food">Food</option>
                                <option value="food">Transport</option>
                                <option value="food">Lodging</option>
                                <option value="food">Miscellaneous</option>
                            </select> */}
							</td>
							<td>
								<button className={table.remove} onClick={() => removeItem(expense.key)}>
									Delete
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
