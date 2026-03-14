import { base } from "./base";

const en = {
	tabs: {
		home: "Home",
		calculator: "Calculator",
		learnings: "Courses",
		scams: "Scams",
		profile: "Account",
	},
	screens: {
		homeScreen: {
			actions: {
				learn: "Learn",
				calculator: "Calculator",
				scams: "Scams",
				more: "More",
			},
		},
		calculatorList: {
			title: "Calculators",
			tagLine: "Explore All Financial Calculators",
		},
		learningList: {
			title: "Courses",
			tagLine: "Latest Courses on Finance",
		},
		scamList: {
			title: "Scams",
			tagLine: "Latest Scam on Finance",
		},
		profileList: {
			accountList: {
				userProfile: { title: "User Profile", desc: "Name, Phone number ..." },
				demographics: {
					title: "Demographics",
					desc: "Address, Occupation etc.",
				},
				financialDetails: {
					title: "Financial Details",
					desc: "Income, Spending Habits etc.",
				},
				account: { title: "Account", desc: "Session, Delete Account etc..." },
				appSettings: {
					title: "App Settings",
					desc: "Theme, Language etc...",
					//desc: "Theme, Language, Accessibility etc...",
				},
				debug: {
					title: "Debug",
					desc: "App Id, Build Id, Versions",
				},
			},
			appInfoList: {
				aboutUs: "About Us",
				shareApp: {
					title: "Share the app",
					desc: "Help others master thier money",
				},
				rateApp: {
					title: "Rate the app",
					desc: "Review our app on Playstore",
				},
				feedback: {
					title: "Feedback",
					desc: "Let us know, your thoughts on SafeFin",
				},
				support: "Support",
				terms: "Terms of Service",
				privacyPolicy: "Privacy Policy",
			},
		},
	},
	common: {
		ok: "OK!",
		next: "Next",
		cancel: "Cancel",
		back: "Back",
		submit: "Submit",
		logOut: "Log Out",
		logOutAsGuest: "Log Out as Guest",
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
			"We’re having trouble loading this right now. It’s not you, it’s us. Please give it another try.",
		reset: "RESET APP",
		traceTitle: "Error from %{name} stack",
	},
	notFoundError: {
		title: "{{name}} Not Found",
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
		title: "Log In",
		tagLine: "Login to gain access to your accounts",
		logIn: "Log In",
		guestLogIn: "Log In as Guest",
		guestLogInPending: "Logging In as Guest ...",
		enterDetails:
			"Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
		emailFieldLabel: "Email Address",
		emailFieldPlaceholder: "Enter your Email Address",
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
	mainNavigator: {
		homeTab: "Home",
		calculatorListTab: "Calculator",
		learnTab: "Learnings",
		profileTab: "Profile",
		scamTab: "Scams",
	},
	quizzesScreen: {
		title: "Quizzes",
		tagLine: "Latest Quiz on Finance",
	},
	lessonScreen: {
		title: "Lessons",
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
		title: "Account",
		tagLine: "Manage User Profile & App Settings",
	},
	demoGraphicsScreen: {
		title: "Demo Graphics",
		tagLine: "Demo Graphics",
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
	...base,
} as const;

export default en;
export type Translations = typeof en;
