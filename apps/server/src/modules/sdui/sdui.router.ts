import { createTypedFactory } from "@/factory";

const { createApp } = createTypedFactory();

const sduiRouter = createApp();

sduiRouter.get("/home", (c) => {
	c.header(
		"Cache-Control",
		"public, must-revalidate, max-age=86400, s-maxage=86400",
	);
	return c.json({
		data: [
			// {
			// 	componentName: "DynamicCard",
			// 	props: {
			// 		badge: {
			// 			text: "AVAILABLE NOW",
			// 			style: {
			// 				margin: "auto",
			// 			},
			// 		},
			// 		title: {
			// 			text: "We’re finally on the Google Play Store!",
			// 			size: "lg",
			// 			numberOfLines: 5,
			// 			style: {
			// 				textAlign: "center",
			// 			},
			// 		},
			// 		button: {
			// 			text: "Get it on Google Play",
			// 			handler: {
			// 				type: "ExternalLink",
			// 				to: "https://anmol-fzr.web.app",
			// 			},
			// 		},
			// 	},
			// },
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
