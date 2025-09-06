import demoEn from "./demo-en";

const en = {
	common: {
		ok: "OK!",
		cancel: "Cancel",
		back: "Back",
		submit: "Submit",
		logOut: "Log Out",
	},
	welcomeScreen: {
		postscript:
			"psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
		readyForLaunch: "Your app, almost ready for launch!",
		exciting: "(ohh, this is exciting!)",
		letsGo: "Let's go!",
	},
	errorScreen: {
		title: "Something went wrong!",
		friendlySubtitle:
			"This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
		reset: "RESET APP",
		traceTitle: "Error from %{name} stack",
	},
	emptyStateComponent: {
		generic: {
			heading: "So empty... so sad",
			content:
				"No data found yet. Try clicking the button to refresh or reload the app.",
			button: "Let's try this again",
		},
	},

	errors: {
		invalidEmail: "Invalid email address.",
	},
	loginScreen: {
		logIn: "Log In",
		enterDetails:
			"Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
		phoneFieldLabel: "Phone Number",
		phoneFieldPlaceholder: "Enter your Phone Number",
		otpFieldLabel: "OTP ( One Time Password )",
		otpFieldPlaceholder: "123456",
		verifyOtp: "Verify Otp",
		sendOtp: "Send Otp",
	},
	registerScreen: {
		register: "Register",
		enterDetails: "Let's Setup your account",
		nameFieldLabel: "Name",
		nameFieldPlaceholder: "Anmol",
		emailFieldLabel: "Email",
		emailFieldPlaceholder: "anmol@withanmol.com",
	},
	demoNavigator: {
		componentsTab: "Quizzes",
		debugTab: "Debug",
		profileTab: "Profile",
		settingsTab: "Settings",
		scamTab: "Scams",
		lessonsTab: "Lessons",
		learningTab: "Learnings",
		calculatorListTab: "Calculator",
	},
	quizzesScreen: {
		title: "Quizzes",
		tagLine: "Latest Quiz on Finance",
	},
	scamScreen: {
		title: "Scams",
		tagLine: "Latest Scam on Finance",
	},
	lessonScreen: {
		title: "Lessons",
		tagLine: "Latest Lessons on Finance",
	},
	learningScreen: {
		title: "Learnings",
		tagLine: "Latest Lessons on Finance",
	},
	resultsScreen: {
		title: "Results",
		tagLine: "Latest Quiz on Finance",
	},
	settingScreen: {
		title: "Settings",
		tagLine: "Settings",
	},
	profileScreen: {
		title: "Profile",
		tagLine: "Profile",
	},
	demoDebugScreen: {
		howTo: "HOW TO",
		title: "Debug",
		tagLine:
			"Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
		reactotron: "Send to Reactotron",
		reportBugs: "Report Bugs",
		demoList: "Demo List",
		demoPodcastList: "Demo Podcast List",
		androidReactotronHint:
			"If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
		iosReactotronHint:
			"If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
		macosReactotronHint:
			"If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
		webReactotronHint:
			"If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
		windowsReactotronHint:
			"If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
	},
	calculatorListScreen: {
		title: "Calculators",
		tagLine: "All Financial Calculators",
	},
	sipScreen: {
		title: "SIP Calculator",
		tagLine: "Calculators",
	},
	swpScreen: {
		title: "SWP Calculator",
		tagLine: "Calculators",
	},
	mfScreen: {
		title: "MF Calculator",
		tagLine: "Calculators",
	},
	ppfScreen: {
		title: "PPF Calculator",
		tagLine: "Calculators",
	},
	epfScreen: {
		title: "EPF Calculator",
		tagLine: "Calculators",
	},
	...demoEn,
} as const;

export default en;
export type Translations = typeof en;
