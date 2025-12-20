import { base } from "./base";

const hi = {
	tabs: {
		home: "हम",
		calculator: "कलकलटर",
		learnings: "सख",
		scams: "घटल",
		profile: "पफइल",
	},
	screens: {
		homeScreen: {
			actions: {
				learn: "सख",
				calculator: "$t(tabs.calculator)", // Will pull "कलकलटर"
				scams: "$t(tabs.scams)", // Will pull "घटल"
				more: "अधक",
			},
		},
		calculatorList: {
			title: "कलकलटर",
			tagLine: "सभ वतय कलकलटर दख",
		},
		learningList: {
			title: "सख",
			tagLine: "फइनस पर नवनतम पठ",
		},
		scamList: {
			title: "$t(tabs.scams)", // Will pull "घटल"
			tagLine: "फइनस स जड़ नवनतम घटल",
		},
		profileList: {
			accountList: {
				userProfile: { title: "यजर पफइल", desc: "नम, फन नबर..." },
				demographics: {
					title: "जनसखक", // or "डमगफक"
					desc: "पत, ववसय आद",
				},
				financialDetails: {
					title: "वतय ववरण",
					desc: "आय, खर करन क आदत आद",
				},
				account: { title: "खत", desc: "सत, खत हटए आद..." },
				appSettings: {
					title: "ऐप सटग",
					desc: "थम, भष, पहच आद...",
				},
				debug: {
					title: "डबग",
					desc: "ऐप आईड, बल आईड, ससरण",
				},
			},
			appInfoList: {
				aboutUs: "हमर बर म",
				shareApp: "ऐप शयर कर",
				rateApp: "ऐप क रट कर",
				support: "सहयत",
				terms: "सव क शर",
				privacyPolicy: "गपनयत नत",
			},
		},
	},
	common: {
		ok: "ठक ह!",
		cancel: "रद कर",
		back: "पछ",
		submit: "जम कर", // or "सबमट कर"
		logOut: "लग आउट",
		logOutAsGuest: "गस क रप म लग आउट कर",
	},
	welcomeScreen: {
		postscript:
			"psst — शयद आपक ऐप ऐस नह दखत ह। (जब तक क आपक डजइनर न आपक य सन नह द ह, और उस सत म, इस शप कर!)",
		readyForLaunch: "आपक ऐप, लन क लए लगभग तयर ह!",
		exciting: "(ओह, यह रमचक ह!)",
		letsGo: "चलए शर करत ह!",
	},
	errorScreen: {
		title: "कछ गलत ह गय!",
		friendlySubtitle:
			"यह वह सन ह ज आपक उपयगकर उतदन (production) म तट आन पर दखग। आप इस सदश क अनकलत करन चहग (`app/i18n/hi.ts` म सत) और शयद लआउट भ (`app/screens/ErrorScreen`)। यद आप इस पर तरह स हटन चहत ह, त <ErrorBoundary> घटक क लए `app/app.tsx` दख।",
		reset: "ऐप रसट कर",
		traceTitle: "%{name} सक स तट",
	},
	emptyStateComponent: {
		generic: {
			heading: "इतन खल... बहत दखद",
			content:
				"अभ तक कई डट नह मल। ऐप क रफश य रलड करन क लए बटन पर कक करन क पयस कर।",
			button: "चलए फर स कशश करत ह",
		},
	},

	errors: {
		invalidEmail: "अमन ईमल पत।",
	},
	loginScreen: {
		title: "लग इन",
		tagLine: "अपन खत तक पहचन क लए लग इन कर",
		logIn: "लग इन",
		guestLogIn: "गस क रप म लग इन कर",
		guestLogInPending: "गस क रप म लग इन ह रह ह...",
		enterDetails:
			"गप जनकर अनलक करन क लए नच अपन ववरण दर कर। आप कभ अनमन नह लग पएग क हमर पस क ह। य शयद आप लग लग; यह कई रकट सइस नह ह।",
		phoneFieldLabel: "फन नबर",
		phoneFieldPlaceholder: "अपन फन नबर दर कर",
		otpFieldLabel: "ओटप ( वन टइम पसवर )",
		otpFieldPlaceholder: "123456",
		verifyOtp: "ओटप सतपत कर",
		sendOtp: "ओटप भज",
	},
	registerScreen: {
		register: "रजसर",
		enterDetails: "चलए आपक खत सटअप करत ह",
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
		scamTab: "घटल",
	},
	quizzesScreen: {
		title: "कज",
		tagLine: "फइनस पर नवनतम कज",
	},
	scamScreen: {
		title: "घटल",
		tagLine: "फइनस स जड़ नवनतम घटल",
	},
	lessonScreen: {
		title: "पठ",
		tagLine: "फइनस पर नवनतम पठ",
	},
	learningScreen: {
		title: "सख",
		tagLine: "फइनस पर नवनतम पठ",
	},
	resultsScreen: {
		title: "परणम",
		tagLine: "फइनस पर नवनतम कज",
	},
	settingScreen: {
		title: "सटग",
		tagLine: "सटग",
	},
	profileScreen: {
		title: "पफइल",
		tagLine: "यजर पफइल और ऐप सटग पबधत कर",
	},
	demoGraphicsScreen: {
		title: "डमगफक",
		tagLine: "डमगफक",
	},
	demoDebugScreen: {
		howTo: "कस कर",
		title: "डबग",
		tagLine:
			"बधई ह, आपक पस यह एक बहत ह उनत रएक नटव ऐप टमलट ह। इस बयलरपट क लभ उठए!",
		reactotron: "रएकटन पर भज",
		reportBugs: "बग रपर कर",
		demoList: "डम सच",
		demoPodcastList: "डम पडकस सच",
		androidReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क रएकटन डसटप ऐप चल रह ह, अपन टरनल स adb reverse tcp:9090 tcp:9090 चलए, और ऐप क रलड कर।",
		iosReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क रएकटन डसटप ऐप चल रह ह और ऐप क रलड कर।",
		macosReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क रएकटन डसटप ऐप चल रह ह और ऐप क रलड कर।",
		webReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क रएकटन डसटप ऐप चल रह ह और ऐप क रलड कर।",
		windowsReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क रएकटन डसटप ऐप चल रह ह और ऐप क रलड कर।",
	},
	calculatorListScreen: {
		title: "कलकलटर",
		tagLine: "सभ वतय कलकलटर दख",
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
