import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useDimensions = () => {
	const [dimensions, setDimensions] = useState(() => Dimensions.get("window"));
	console.log(dimensions);

	useEffect(() => {
		const subscription = Dimensions.addEventListener("change", ({ window }) => {
			setDimensions(window);
		});

		return subscription.remove;
	}, []);

	return dimensions;
};
