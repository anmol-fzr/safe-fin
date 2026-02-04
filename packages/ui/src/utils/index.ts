const getEmptyArr = (length = 10) => Array.from({ length }, (_, i) => i);

const ellipsize = (text: string, maxLen: number, appendText = " ...") => {
	if (text.length < maxLen) return text;

	return text.slice(0, 15) + appendText;
};

export { getEmptyArr, ellipsize };
