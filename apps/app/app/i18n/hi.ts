import { base } from "./base";

const hi = {
	tabs: {
		home: "हम",
		calculator: "कलकलटर",
		learnings: "कर",
		scams: "सम",
		profile: "अकउट",
	},
	screens: {
		homeScreen: {
			actions: {
				learn: "सख",
				calculator: "कलकलटर",
				scams: "सम",
				more: "और दख",
			},
		},
		calculatorList: {
			title: "कलकलटर",
			tagLine: "सभ फइनशयल कलकलटर दख",
		},
		learningList: {
			title: "कर",
			tagLine: "फइनस पर नए कर",
		},
		scamList: {
			title: "सम",
			tagLine: "फइनस स जड नए सम",
		},
		profileList: {
			accountList: {
				userProfile: { title: "यजर पफइल", desc: "नम, फन नबर आद" },
				demographics: {
					title: "डमगफक",
					desc: "पत, पश आद",
				},
				financialDetails: {
					title: "फइनशयल डटल",
					desc: "आय, खर क आदत आद",
				},
				account: { title: "अकउट", desc: "सशन, अकउट डलट आद" },
				appSettings: {
					title: "ऐप सटग",
					desc: "थम, भष आद",
				},
				debug: {
					title: "डबग",
					desc: "ऐप आईड, बल आईड, वरन",
				},
			},
			appInfoList: {
				aboutUs: "हमर बर म",
				shareApp: {
					title: "ऐप शयर कर",
					desc: "दसर क पस सभलन सखन म मदद कर",
				},
				rateApp: {
					title: "ऐप क रट कर",
					desc: "Play Store पर हम रव द",
				},
				feedback: {
					title: "फडबक",
					desc: "SafeFin क बर म अपन रय बतए",
				},
				support: "सपर",
				terms: "सव क शर",
				privacyPolicy: "पइवस पलस",
			},
		},
	},
	common: {
		ok: "ठक ह!",
		next: "आग",
		cancel: "रद कर",
		back: "वपस",
		submit: "सबमट",
		logOut: "लग आउट",
		logOutAsGuest: "गस क रप म लग आउट",
	},
	welcomeScreen: {
		postscript:
			"अर — ह सकत ह आपक ऐप ऐस न दखत ह। (अगर आपक डजइनर न यह सन द ह, त फर लन कर दजए!)",
		readyForLaunch: "आपक ऐप लन क लए लगभग तयर ह!",
		exciting: "(वह, य त मजदर ह!)",
		letsGo: "चल शर कर!",
	},
	errorScreen: {
		title: "कछ गडबड ह गई!",
		friendlySubtitle:
			"अभ इस लड करन म दकत आ रह ह। गलत आपक नह, हमर ह। कपय दबर कशश कर।",
		reset: "ऐप रसट कर",
		traceTitle: "%{name} सक स एरर",
	},
	notFoundError: {
		title: "{{name}} नह मल",
	},
	emptyStateComponent: {
		generic: {
			heading: "यह अभ कछ नह ह",
			content: "अभ कई डट उपलब नह ह। रफश करन क लए बटन दबए य ऐप दबर खल।",
			button: "फर स कशश कर",
		},
	},

	errors: {
		invalidEmail: "गलत ईमल एडस।",
	},
	loginScreen: {
		title: "लग इन",
		tagLine: "अपन अकउट तक पहचन क लए लग इन कर",
		logIn: "लग इन",
		guestLogIn: "गस क रप म लग इन",
		guestLogInPending: "गस क रप म लग इन ह रह ह...",
		enterDetails: "नच अपन जनकर दर कर। आपक लए खस चज तयर ह।",
		emailFieldLabel: "ईमल एडस",
		emailFieldPlaceholder: "अपन ईमल एडस दर कर",
		otpFieldLabel: "ओटप (वन टइम पसवर)",
		otpFieldPlaceholder: "123456",
		verifyOtp: "ओटप वरफई कर",
		sendOtp: "ओटप भज",
	},
	registerScreen: {
		register: "रजसर",
		enterDetails: "अपन अकउट सटअप कर",
		nameFieldLabel: "नम",
		nameFieldPlaceholder: "अनमल",
		emailFieldLabel: "ईमल",
		emailFieldPlaceholder: "anmol@withanmol.com",
	},
	mainNavigator: {
		homeTab: "हम",
		calculatorListTab: "कलकलटर",
		learnTab: "सख",
		profileTab: "पफइल",
		scamTab: "सम",
	},
	quizzesScreen: {
		title: "कज",
		tagLine: "फइनस पर नए कज",
	},
	lessonScreen: {
		title: "लसन",
		tagLine: "फइनस पर नए लसन",
	},
	resultsScreen: {
		title: "रजल",
		tagLine: "फइनस कज क रजल",
	},
	settingScreen: {
		title: "सटग",
		tagLine: "सटग",
	},
	profileScreen: {
		title: "अकउट",
		tagLine: "यजर पफइल और ऐप सटग मनज कर",
	},
	demoGraphicsScreen: {
		title: "डम गफक",
		tagLine: "डम गफक",
	},
	demoDebugScreen: {
		howTo: "कस कर",
		title: "डबग",
		tagLine: "बधई ह, आपक पस एक एडवस React Native ऐप टमलट ह। इसक पर फयद उठए!",
		reactotron: "Reactotron पर भज",
		reportBugs: "बग रपर कर",
		demoList: "डम लस",
		demoPodcastList: "डम पडकस लस",
		androidReactotronHint:
			"अगर कम न कर, त सनशत कर क Reactotron डसटप ऐप चल ह, टरनल म adb reverse tcp:9090 tcp:9090 चलए और ऐप रलड कर।",
		iosReactotronHint:
			"अगर कम न कर, त सनशत कर क Reactotron डसटप ऐप चल ह और ऐप रलड कर।",
		macosReactotronHint:
			"अगर कम न कर, त सनशत कर क Reactotron डसटप ऐप चल ह और ऐप रलड कर।",
		webReactotronHint:
			"अगर कम न कर, त सनशत कर क Reactotron डसटप ऐप चल ह और ऐप रलड कर।",
		windowsReactotronHint:
			"अगर कम न कर, त सनशत कर क Reactotron डसटप ऐप चल ह और ऐप रलड कर।",
	},
	sipScreen: {
		title: "SIP कलकलटर",
		tagLine: "कलकलटर",
	},
	swpScreen: {
		title: "SWP कलकलटर",
		tagLine: "कलकलटर",
	},
	mfScreen: {
		title: "MF कलकलटर",
		tagLine: "कलकलटर",
	},
	ppfScreen: {
		title: "PPF कलकलटर",
		tagLine: "कलकलटर",
	},
	epfScreen: {
		title: "EPF कलकलटर",
		tagLine: "कलकलटर",
	},
	...base,
} as const;

export default hi;
export type TranslationsHi = typeof hi;
