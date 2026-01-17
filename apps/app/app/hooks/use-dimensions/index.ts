import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

type Dim = "window" | "screen";

export const useDimensions = (dim: Dim = "window") => {
	const [dimensions, setDimensions] = useState(() => Dimensions.get(dim));

	useEffect(() => {
		const subscription = Dimensions.addEventListener("change", (opt) => {
			setDimensions(opt[dim]);
		});

		return () => subscription.remove();
	}, [dim]);

	return dimensions;
};
