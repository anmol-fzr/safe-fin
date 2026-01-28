import { Button } from "@/components";
import Animated, { FadeInDown } from "react-native-reanimated";
import { makeSpringy } from "@/theme";
import { Link } from "expo-router";

export const ProfileCompletionCTA = () => {
	return (
		<Animated.View entering={makeSpringy(FadeInDown)}>
			<Link asChild href="/profile/edit">
				<Button>Complete Now</Button>
			</Link>
		</Animated.View>
	);
};
