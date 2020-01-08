import React from 'react';
import { Route } from 'react-router-dom';
import Stop from './stop';
import styles from './mainContent.module.css';
import StopsList from './stopsList';
import uuidv4 from 'uuid/v4';
import inputList from '../utils/stopInputs';
import PropTypes from 'prop-types';

const MainContent = ({ stops, uid }) => {
	return (
		<main className={styles.container}>
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
									return <Stop stop={stop} uid={uid} />;
								}}
							/>
						);
					})}
				</>
			) : null}
		</main>
	);
};

MainContent.propTypes = {
	stops: PropTypes.array,
	uid: PropTypes.string,
};

export default MainContent;
