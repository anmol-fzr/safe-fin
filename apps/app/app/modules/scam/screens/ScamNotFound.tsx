import { Link, useRouter } from "expo-router";
import { Button, Screen, Text } from "@/components";
import { $styles } from "@/theme";

export function ScamNotFoundScreen() {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<Text preset="subheading" style={{ marginTop: 24, textAlign: "center" }}>
				Scam Not Found
			</Text>
			<Text style={{ textAlign: "center" }}>
				The Scam you are looking for is not here ...
			</Text>
			<Link asChild dismissTo href="/tabs/scams">
				<Button>Go Back</Button>
			</Link>
		</Screen>
	);
}
