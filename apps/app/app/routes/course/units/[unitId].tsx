import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Button, Screen, Text } from "@/components";
import { MarkdowRenderer } from "@/modules/lesson/components/Lesson";
import { LessonCard } from "@/modules/lesson/components/LessonCard/LessonCard";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export default function UnitScreen() {
	const params = useLocalSearchParams();

	const content = `When you implement common components in your design, users don’t have to guess how to interact with an interface — they easily recognize what each element is supposed to do.

[UI components](https://app.uxcel.com/glossary/ui-components) like [accordions](https://app.uxcel.com/glossary/accordions), lists, and [charts](https://app.uxcel.com/glossary/charts) can make it easier for users to digest information. Components like [breadcrumbs](https://app.uxcel.com/glossary/breadcrumbs) and [pagination](https://app.uxcel.com/glossary/pagination) orient users to where they are within a website or app. And other components such as [pickers](https://app.uxcel.com/glossary/pickers) or [sliders](https://app.uxcel.com/glossary/sliders) allow for easier [interaction](https://app.uxcel.com/glossary/interaction) with an interface. 
## Accordions
![Accordions](https://img.uxcel.com/cdn-cgi/image/format=auto/practices/accordion-1602501530903/a-1696954310336-2x.jpg)
Accordions are interactive [design elements](https://app.uxcel.com/glossary/design-elements) that help manage [content](https://app.uxcel.com/glossary/content) organization and [user experience](https://app.uxcel.com/glossary/user-experience). Accordions initially display a summary or [header](https://app.uxcel.com/glossary/header), and when clicked or tapped, expand to reveal more detailed content. This conserves space by allowing users to access information on demand, preventing overwhelming [page](https://app.uxcel.com/glossary/pages) lengths.

![Iman Vellani](https://ntvb.tmsimg.com/assets/assets/1480062_v9_ba.jpg)

Accordions are especially useful for displaying FAQs or structured data. They offer a balance between information [accessibility](https://app.uxcel.com/glossary/accessibility) and screen real estate, promoting a cleaner and more user-friendly interface.

> **Pro Tip:** Use different icons to indicate open and closed sections.`;

	console.log("[unitId] Screen params: ", params);
	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<Screen preset="auto" contentContainerStyle={$styles.container}>
			<LessonCard.Body>
				<LessonCard.Title>{params.title}</LessonCard.Title>
				<LessonCard.Description>{params.shortDesc}</LessonCard.Description>

				<MarkdowRenderer content={content} />
				<View style={{ gap: spacing.md }}>
					<LessonCard.Share />
					<View style={{ paddingBottom: 60, gap: 24 }}>
						<Text size="xxl" weight="medium">
							Complete this lesson and move one step closer to your course
							certificate
						</Text>
						<Button preset="reversed">Start Quiz</Button>
					</View>
				</View>
			</LessonCard.Body>
		</Screen>
	);
}
