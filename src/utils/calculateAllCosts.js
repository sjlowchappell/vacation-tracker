export const calculateAllCosts = stops => {
	console.log('calculating!');
	return (
		Math.round(
			// reduce function used to total up all of the stop costs
			stops.reduce((total, stop) => {
				return stop.cost !== undefined ? total + parseFloat(stop.cost) : total;
			}, 0) * 100,
		) / 100
	).toFixed(2);
};
