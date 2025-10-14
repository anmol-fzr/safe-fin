import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useDimensions = () => {
	const [dimensions, setDimensions] = useState(() => ({
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	}));

	useEffect(() => {
		const subscription = Dimensions.addEventListener("change", ({ window }) => {
			setDimensions(window);
		});

		return () => subscription?.remove();
	}, []);

	return dimensions;
};
