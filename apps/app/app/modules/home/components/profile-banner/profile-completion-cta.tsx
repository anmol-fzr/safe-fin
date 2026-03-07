import { Link } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Button } from "@/components";
import { makeSpringy } from "@/theme";

export const ProfileCompletionCTA = () => {
	return (
		<Animated.View entering={makeSpringy(FadeInDown)}>
			<Link asChild href="/profile/edit">
				<Button preset="reversed">Complete Now</Button>
			</Link>
		</Animated.View>
	);
};
