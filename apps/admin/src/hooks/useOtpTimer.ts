import { useState, useEffect } from "react";

const useOtpTimer = (initialTime = 60) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (isActive && timeLeft > 0) {
			timer = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			setIsActive(false); // Timer stops when time is up
		}
		return () => clearInterval(timer);
	}, [isActive, timeLeft]);

	const startTimer = () => {
		setIsActive(true);
		setTimeLeft(initialTime);
	};

	const resetTimer = () => {
		setIsActive(false);
		setTimeLeft(initialTime);
	};

	return {
		timeLeft,
		isActive,
		startTimer,
		resetTimer,
		isExpired: timeLeft === 0,
	};
};

export default useOtpTimer;
