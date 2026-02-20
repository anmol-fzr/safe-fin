export const getRandomizer = (arr: string[]) => {
	const maxIndx = arr.length - 1;

	return () => {
		const idx = Math.floor(Math.random() * maxIndx);
		return arr[idx];
	};
};
