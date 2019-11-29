import React from 'react';
import { Route } from 'react-router-dom';
import Stop from './stop';
import mainContent from './mainContent.module.css';
import StopsList from './stopsList';
import firebase from '../firebase';

const MainContent = ({ stops, stopCost }) => {
	// Method to remove stop from database
	const removeStop = stopId => {
		// get reference to users stops
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref('/users/' + userId + '/stops/');
		// use child() and remove() methods to get the stop and remove it
		dbRef.child(stopId).remove();
	};
	return (
		<main className={mainContent.container}>
			{stops.length !== 0 ? (
				<div>
					<Route
						path={'/stops/'}
						render={() => {
							return <StopsList stops={stops} removeStop={removeStop} />;
						}}
					/>
					{stops.map(stop => {
						const currentStopCost = stopCost(stop.expenses);
						return (
							<div>
								<Route
									path={`/${stop.name}/`}
									render={() => {
										return (
											<Stop
												name={stop.name}
												expenses={stop.expenses}
												stopId={stop.key}
												cost={stop.cost}
												stopCost={currentStopCost}
												removeStop={removeStop}
											/>
										);
									}}
								/>
							</div>
						);
					})}
				</div>
			) : (
				<p>Waiting for Content to Load!</p>
			)}
		</main>
	);
};

export default MainContent;
