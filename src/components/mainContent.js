import React from 'react';
import { Route } from 'react-router-dom';
import Stop from './stop';
import mainContent from './mainContent.module.css';
import StopsList from './stopsList';
import uuidv4 from 'uuid/v4';
import inputList from '../utils/stopInputs';

const MainContent = ({ stops, uid }) => {
	return (
		<main className={mainContent.container}>
			{/* Set up all routes. Need to check if the Router should go here instead of on the App component */}
			{/* Route for StopsList */}
			<Route
				exact
				path={'/'}
				render={() => {
					return <StopsList stops={stops} uid={uid} inputList={inputList} />;
				}}
			/>
			{stops.length !== 0 ? (
				<>
					{/* Routes for all the individual Stops */}
					{stops.map(stop => {
						return (
							<Route
								key={uuidv4()}
								path={`/${stop.name}/`}
								render={() => {
									return (
										<Stop
											name={stop.name}
											budget={stop.budget}
											expenses={stop.expenses}
											stopId={stop.key}
											cost={stop.cost}
											uid={uid}
										/>
									);
								}}
							/>
						);
					})}
				</>
			) : null}
		</main>
	);
};

export default MainContent;
