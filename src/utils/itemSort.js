export const itemSort = (sortType, sortDirection, expenses) => {
	let newExpenses;
	let newDirection;
	// check if sort direction is ascending or descending
	// Sort expenses based on sortType and whether or not they are of type 'value' (need to be parsed as floats)
	if (sortDirection === 'des') {
		sortType === 'value'
			? (newExpenses = expenses.sort((a, b) => (parseFloat(a[sortType]) > parseFloat(b[sortType]) ? 1 : -1)))
			: (newExpenses = expenses.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1)));
		newDirection = 'asc';
	} else {
		sortType === 'value'
			? (newExpenses = expenses.sort((a, b) => (parseFloat(a[sortType]) < parseFloat(b[sortType]) ? 1 : -1)))
			: (newExpenses = expenses.sort((a, b) => (a[sortType] < b[sortType] ? 1 : -1)));
		newDirection = 'des';
	}
	return { expenses: newExpenses, direction: newDirection };
};
