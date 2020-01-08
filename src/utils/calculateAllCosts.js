import { decimalPlace } from './decimalPlace';

export const calculateAllCosts = stops =>
	decimalPlace(
		stops.reduce((total, stop) => {
			return stop.cost !== undefined ? total + parseFloat(stop.cost) : total;
		}, 0),
	);
