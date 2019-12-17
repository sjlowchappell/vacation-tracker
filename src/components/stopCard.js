import React from 'react';
import { Link } from 'react-router-dom';
import stopCard from './stopCard.module.css';

const StopCard = ({ stop, removeStop }) => {
	return (
		<div className={stopCard.stop}>
			<Link to={`/${stop.name}/`} className={stopCard.stopLink}>
				{stop.name}
			</Link>
			<p className={stopCard.date}>
				{stop.arrival} - {stop.departure}
			</p>
			<p>Budgeted: ${stop.budget}</p>
			<p>
				Spent:{' '}
				<span className={parseFloat(stop.cost) > stop.budget ? stopCard.red : stopCard.green}>
					${stop.cost}
				</span>
			</p>
			<button className={stopCard.removeButton} onClick={() => removeStop(stop.key)}>
				Delete
			</button>
		</div>
	);
};

export default StopCard;
