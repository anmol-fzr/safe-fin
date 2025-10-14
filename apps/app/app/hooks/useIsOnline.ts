import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useIsOnline = () => {
	const [isConnected, setIsConnected] = useState(true);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected ?? false);
		});

		return unsubscribe;
	}, []);

	return isConnected;
};
