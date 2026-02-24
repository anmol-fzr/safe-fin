import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import { Button } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useSubmitFeedback } from "../../hooks/mutations";

const feedbackSchema = z.object({
	message: z
		.string({
			error: "Message is required",
		})
		.describe("Message"),
});

export const FeedbackForm = () => {
	const form = useForm({
		resolver: zodResolver(feedbackSchema),
	});

	const { submitFeedback, isSubmittingFeedback } = useSubmitFeedback();

	const router = useRouter();

	const handleSubmit = form.handleSubmit((data) => {
		submitFeedback(data.message);
		if (router.canGoBack()) {
			router.back();
		} else {
			router.navigate("/tabs/home");
		}
	});

	return (
		<View>
			<FormProvider {...form}>
				<FormField
					name="message"
					label="Message"
					placeholder="Mention a Bug / Feature Request /  Performance Issues / Any Other Comments"
					multiline
					numberOfLines={4}
				/>

				<Button
					preset="reversed"
					status={isSubmittingFeedback ? "loading" : undefined}
					loadingText="Submitting ..."
					onPress={handleSubmit}
				>
					Submit
				</Button>
			</FormProvider>
		</View>
	);
};
