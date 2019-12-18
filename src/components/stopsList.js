import React from 'react';
import stopsList from './stopsList.module.css';
import Form from './form';
import StopCard from './stopCard';

const StopsList = ({ inputList, stops, handleChange, handleSubmit, uid }) => {
	return (
		<div className={stopsList.container}>
			<h1>Stops on your journey:</h1>
			{stops.length !== 0 ? (
				<>
					<div className={stopsList.allStops}>
						{stops.map(stop => {
							return <StopCard stop={stop} uid={uid} />;
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
