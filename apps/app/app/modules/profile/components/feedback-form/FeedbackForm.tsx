import { FormField } from "@/components/form/FormField";
import { useYupForm } from "@/hooks";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";
import * as Yup from "yup";
import { useSubmitFeedback } from "../../hooks/mutations";
import { Button } from "@/components";
import { useRouter } from "expo-router";

const feedbackSchema = Yup.object({
	message: Yup.string().required().label("Message"),
});

export const FeedbackForm = () => {
	const form = useYupForm({
		schema: feedbackSchema,
	});

	const { submitFeedback, isSubmittingFeedback } = useSubmitFeedback();

	const router = useRouter();

	const handleSubmit = form.handleSubmit((data) => {
		submitFeedback(data.message);
		if (router.canGoBack()) {
			router.back();
		} else {
			router.navigate("/tabs");
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
