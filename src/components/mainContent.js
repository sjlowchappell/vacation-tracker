import React from 'react';
import { Route } from 'react-router-dom';
import Stop from './stop';

const MainContent = ({ stops, stopCost }) => {
	return (
		<main className="mainContent">
			<p>Here's The Main Content!</p>
			{stops.length !== 0 ? (
				<div>
					{stops.map(stop => {
						const currentStopCost = stopCost(stop.budgets);
						return (
							<div>
								<Route
									path={`/${stop.name}`}
									render={() => {
										return (
											<Stop
												name={stop.name}
												budgets={stop.budgets}
												stopId={stop.key}
												stopCost={currentStopCost}
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
