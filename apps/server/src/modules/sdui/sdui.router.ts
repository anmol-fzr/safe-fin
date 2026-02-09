import { createTypedFactory } from "@/factory";

const { createApp } = createTypedFactory();

const sduiRouter = createApp();

sduiRouter.get("/home", (c) => {
	return c.json({
		data: [
			{
				componentName: "ProfileCompletionBanner",
			},
			{
				componentName: "QuickActions",
			},
			{
				componentName: "InProgressCourseCard",
			},
			{
				componentName: "ForYouLessons",
			},
			{
				componentName: "UpdateAvailableCard",
			},
			{
				componentName: "ShareAppCard",
			},
		],
	});
});

export { sduiRouter };
