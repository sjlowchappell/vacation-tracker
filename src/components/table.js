import React from 'react';
import styles from './table.module.css';
import Button from './button';
import arrow from '../assets/drop-down-arrow.svg';

const Table = ({ sortItems, expenses, removeItem, sortType, sortDirection }) => {
	return (
		<table className={styles.container}>
			<thead>
				<tr>
					<th>
						<button className={styles.sort} onClick={sortItems} data-type="date">
							Date
							<div className={styles.arrow}>
								{sortType !== 'date' ? null : sortDirection === 'asc' ? (
									<img src={arrow} alt="arrow indicating descending sorting" data-type="date" />
								) : (
									<img
										className={styles.rotated}
										src={arrow}
										alt="arrow indicating ascending sorting"
										data-type="date"
									/>
								)}
							</div>
						</button>
					</th>
					<th>
						<button className={styles.sort} onClick={sortItems} data-type="name">
							Name
							<div className={styles.arrow}>
								{sortType !== 'name' ? null : sortDirection === 'asc' ? (
									<img src={arrow} alt="arrow indicating descending sorting" data-type="name" />
								) : (
									<img
										className={styles.rotated}
										src={arrow}
										alt="arrow indicating ascending sorting"
										data-type="name"
									/>
								)}
							</div>
						</button>
					</th>
					<th>
						<button className={styles.sort} onClick={sortItems} data-type="value">
							Value
							<div className={styles.arrow}>
								{sortType !== 'value' ? null : sortDirection === 'asc' ? (
									<img src={arrow} alt="arrow indicating descending sorting" data-type="value" />
								) : (
									<img
										className={styles.rotated}
										src={arrow}
										alt="arrow indicating ascending sorting"
										data-type="value"
									/>
								)}
							</div>
						</button>
					</th>
					<th>
						<button className={styles.sort} onClick={sortItems} data-type="category">
							Items
							<div className={styles.arrow}>
								{sortType !== 'category' ? null : sortDirection === 'asc' ? (
									<img src={arrow} alt="arrow indicating descending sorting" data-type="category" />
								) : (
									<img
										className={styles.rotated}
										src={arrow}
										alt="arrow indicating ascending sorting"
										data-type="category"
									/>
								)}
							</div>
						</button>
					</th>
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
