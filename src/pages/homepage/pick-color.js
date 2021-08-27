export const pickColor = (percentage) => {
	if (percentage > 75) {
		return 'success';
	} else if (percentage > 50 && percentage <= 75) {
		return 'info';
	} else if (percentage > 25 && percentage <= 50) {
		return 'warning'
	} else if (percentage >= 0 && percentage <= 25) {
		return 'danger'
	} else {
		return 'danger'
	}
};