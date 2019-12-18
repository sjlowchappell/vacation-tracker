import React from 'react';
import stopsList from './stopsList.module.css';
import Form from './form';
import StopCard from './stopCard';

const StopsList = ({ inputList, stops, removeStop, handleChange, handleSubmit }) => {
	return (
		<div className={stopsList.container}>
			<h1>Stops on your journey:</h1>
			{stops.length !== 0 ? (
				<>
					<div className={stopsList.allStops}>
						{stops.map(stop => {
							return <StopCard key={stop.key} stop={stop} removeStop={removeStop} />;
						})}
					</div>
					<Form
						formText="Add a new stop to your trip:"
						inputs={inputList}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						submitText={'Add Stop'}
					/>
				</>
			) : (
				<Form
					formText="Add a new stop to your trip:"
					inputs={inputList}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					submitText={'Add Stop'}
				/>
			)}
		</div>
	);
};

export default StopsList;
