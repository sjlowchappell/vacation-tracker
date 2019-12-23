import React from 'react';
import styles from './table.module.css';
import Button from './button';
import arrow from '../assets/drop-down-arrow.svg';
import uuidv4 from 'uuid/v4';

const Table = ({ sortItems, expenses, removeItem, sortType, sortDirection }) => {
	const headings = ['date', 'name', 'value', 'category'];
	return (
		<table className={styles.container}>
			<thead>
				<tr>
					{headings.map(heading => {
						return (
							<th key={uuidv4()}>
								<button className={styles.sort} onClick={sortItems} data-type={heading}>
									<span className={styles.heading} data-type={heading}>
										{heading}
									</span>
									<div className={styles.arrow}>
										{sortType !== heading ? null : sortDirection === 'asc' ? (
											<img
												src={arrow}
												alt="arrow indicating descending sorting"
												data-type={heading}
											/>
										) : (
											<img
												className={styles.rotated}
												src={arrow}
												alt="arrow indicating ascending sorting"
												data-type={heading}
											/>
										)}
									</div>
								</button>
							</th>
						);
					})}
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{expenses.map(expense => {
					return (
						<tr key={expense.key} className={styles.expenseItem}>
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
	);
};

export default Table;
