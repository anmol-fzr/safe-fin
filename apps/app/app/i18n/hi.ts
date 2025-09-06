import demoHi from "./demo-hi";

const hi = {
	common: {
		ok: "ठक ह!",
		cancel: "रद कर",
		back: "वपस",
		submit: "जम कर",
		logOut: "लग आउट",
	},
	welcomeScreen: {
		postscript:
			"psst — शयद आपक ऐप ऐस नह दखत। (अगर आपक डजइनर न य सन द ह, त तरत लन कर!)",
		readyForLaunch: "आपक ऐप लगभग लन क लए तयर ह!",
		exciting: "(ओह, यह रमचक ह!)",
		letsGo: "चलए शर कर!",
	},
	errorScreen: {
		title: "कछ गलत ह गय!",
		friendlySubtitle:
			"उपयगकरओ क उतदन म तट आन पर यह सन दखई दग। आप इस सदश क (`app/i18n/en.ts`) और लआउट (`app/screens/ErrorScreen`) क अनकलत करन चहग। यद आप इस पर तरह स हटन चहत ह, त `<ErrorBoundary>` दख (`app/app.tsx` म)।",
		reset: "ऐप रसट कर",
		traceTitle: "%{name} सक स तट",
	},
	emptyStateComponent: {
		generic: {
			heading: "बहत खल... बहत दखद",
			content: "अभ तक कई डट नह मल। तज करन य ऐप पन लड करन क लए बटन पर कक कर।",
			button: "फर स कशश कर",
		},
	},

	errors: {
		invalidEmail: "अमन ईमल पत।",
	},
	loginScreen: {
		logIn: "लग इन कर",
		enterDetails:
			"नच अपन ववरण दर कर और गप जनकर अनलक कर। आप अदज भ नह लग सकत क हमन क तयर कय ह। य शयद आप लग लग; यह रकट सइस नह ह।",
		phoneFieldLabel: "फन नबर",
		phoneFieldPlaceholder: "अपन फन नबर दर कर",
		otpFieldLabel: "ओटप (वन टइम पसवर)",
		otpFieldPlaceholder: "123456",
		verifyOtp: "ओटप सतपत कर",
		sendOtp: "ओटप भज",
	},
	registerScreen: {
		register: "पजकरण कर",
		enterDetails: "चलए आपक खत सटअप करत ह",
		nameFieldLabel: "नम",
		nameFieldPlaceholder: "अनमल",
		emailFieldLabel: "ईमल",
		emailFieldPlaceholder: "anmol@withanmol.com",
	},
	demoNavigator: {
		componentsTab: "कज",
		debugTab: "डबग",
		profileTab: "पफइल",
		calculatorListTab: "कलकलटर",
	},
	quizzesScreen: {
		title: "कज",
		tagLine: "वत पर नवनतम कज",
	},
	resultsScreen: {
		title: "परणम",
		tagLine: "वत पर नवनतम कज",
	},
	profileScreen: {
		title: "पफइल",
		tagLine: "पफइल",
	},
	demoDebugScreen: {
		howTo: "कस कर",
		title: "डबग",
		tagLine:
			"बधई ह, आपक पस एक बहत ह उनत React Native ऐप टमलट ह। इसक भरपर उपयग कर!",
		reactotron: "Reactotron पर भज",
		reportBugs: "बग क रपर कर",
		demoList: "डम सच",
		demoPodcastList: "डम पडकस सच",
		androidReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क Reactotron डसटप ऐप चल रह ह, टरनल म `adb reverse tcp:9090 tcp:9090` चलए, और ऐप क फर स लड कर।",
		iosReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क Reactotron डसटप ऐप चल रह ह और ऐप क फर स लड कर।",
		macosReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क Reactotron डसटप ऐप चल रह ह और ऐप क फर स लड कर।",
		webReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क Reactotron डसटप ऐप चल रह ह और ऐप क फर स लड कर।",
		windowsReactotronHint:
			"यद यह कम नह करत ह, त सनशत कर क Reactotron डसटप ऐप चल रह ह और ऐप क फर स लड कर।",
	},
	calculatorListScreen: {
		title: "कलकलटर",
		tagLine: "सभ वतय कलकलटर",
	},
	sipScreen: {
		title: "एसआईप कलकलटर",
		tagLine: "कलकलटर",
	},
	swpScreen: {
		title: "एसडबप कलकलटर",
		tagLine: "कलकलटर",
	},
	mfScreen: {
		title: "एमएफ कलकलटर",
		tagLine: "कलकलटर",
	},
	ppfScreen: {
		title: "पपएफ कलकलटर",
		tagLine: "कलकलटर",
	},
	epfScreen: {
		title: "ईपएफ कलकलटर",
		tagLine: "कलकलटर",
	},
	...demoHi, // keep unchanged unless demoEn has language-specific content
} as const;

export default hi;
export type TranslationsHi = typeof hi;
