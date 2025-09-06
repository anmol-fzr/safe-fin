import { useSIPCalculatorLogic } from "@/hooks/useSip";
import { CalculatorType } from "@/navigators";
import { calcMF, calcPPF, calcSwp } from "./funcs";

type ConstantConfig = {
	label: string;
	key: string;
	value: number;
};

type SliderConfig = ConstantConfig & {
	step: number;
	minValue: number;
	maxValue: number;
};

export type CalcListItem = {
	title: string;
	desc: string;
	screen: CalculatorType;
};

type CalculatorConfig = {
	title: string;
	list: CalcListItem;
	sliders: SliderConfig[];
	constants?: ConstantConfig[];
	resultKeys: [string, string][];
	pieChart: boolean;
	calculate: Function;
};

type CalculatorConfigs = {
	[K in CalculatorType]: CalculatorConfig;
};

export const CALCULATOR_CONFIG: CalculatorConfigs = {
	SIP: {
		list: {
			title: "SIP",
			desc: "Calculate how much you need to save or how much you will accumulate with your SIP",
			screen: "SIP",
		},
		title: "SIP Calculator",
		sliders: [
			{
				label: "Monthly Investment",
				key: "investment",
				value: 25000,
				step: 100,
				minValue: 100,
				maxValue: 1000000,
			},
			{
				label: "Expected Return Rate (p.a)",
				key: "rate",
				value: 12,
				step: 0.1,
				minValue: 1,
				maxValue: 30,
			},
			{
				label: "Time Period (in Years)",
				key: "duration",
				value: 10,
				step: 1,
				minValue: 1,
				maxValue: 40,
			},
		],
		resultKeys: [
			["totalInvested", "Total Invested"],
			["returns", "Returns"],
			["totalValue", "Total Value"],
		],
		pieChart: true,
		calculate: useSIPCalculatorLogic,
	},
	SWP: {
		list: {
			title: "SWP",
			desc: "Calculate your final amount with Systematic Withdrawal Plans (SWP)",
			screen: "SWP",
		},
		title: "SWP Calculator",
		sliders: [
			{
				label: "Total investment",
				key: "totalInvestment",
				value: 5_00_000,
				step: 100,
				minValue: 1000,
				maxValue: 10_000_000,
			},
			{
				label: "Withdrawl per month",
				key: "withdrawlPM",
				value: 10_000,
				step: 100,
				minValue: 500,
				maxValue: 1_000_000,
			},
			{
				label: "Expected Return Rate (p.a)",
				key: "rate",
				value: 8,
				step: 0.1,
				minValue: 1,
				maxValue: 30,
			},
			{
				label: "Time Period (in Years)",
				key: "duration",
				value: 10,
				step: 1,
				minValue: 1,
				maxValue: 40,
			},
		],
		resultKeys: [
			["totalInvestment", "Total Investment"],
			["totalWithdrawl", "Total Withdrawl"],
			["finalValue", "Final Value"],
		],
		pieChart: false,
		calculate: calcSwp,
	},
	MF: {
		list: {
			title: "Mutual Fund",
			desc: "Calculate the returns on your mutual fund investments",
			screen: "MF",
		},
		title: "MF Calculator",
		sliders: [
			{
				label: "Total investment",
				key: "totalInvestment",
				value: 5_00_000,
				step: 100,
				minValue: 1000,
				maxValue: 10_000_000,
			},
			{
				label: "Expected Return Rate (p.a)",
				key: "rate",
				value: 8,
				step: 0.1,
				minValue: 1,
				maxValue: 30,
			},
			{
				label: "Time Period (in Years)",
				key: "duration",
				value: 10,
				step: 1,
				minValue: 1,
				maxValue: 40,
			},
		],
		resultKeys: [
			["totalInvestment", "Invested amount"],
			["returns", "Estimated returns"],
			["totalValue", "Total value"],
		],
		pieChart: true,
		calculate: calcMF,
	},
	PPF: {
		list: {
			title: "Public Provident Fund",
			desc: "Calculate your returns on Public Provident Fund (PPF)",
			screen: "PPF",
		},
		title: "PPF Calculator",
		sliders: [
			{
				label: "Yearly investment",
				key: "yearlyInvestment",
				value: 10_000,
				step: 100,
				minValue: 1000,
				maxValue: 10_000_000,
			},
			{
				label: "Time Period (in Years)",
				key: "duration",
				value: 15,
				step: 1,
				minValue: 1,
				maxValue: 40,
			},
		],
		constants: [
			{
				label: "Expected Return Rate (p.a)",
				key: "rate",
				value: 7.1,
			},
		],
		resultKeys: [
			["totalInvestment", "Invested amount"],
			["totalInterest", "Total interest"],
			["maturityValue", "Maturity value"],
		],
		pieChart: true,
		calculate: calcPPF,
	},
};

export const scams = [
	{
		id: 1,
		title: "Your PAN KYC is pending",
		desc: "SMS claims your PAN KYC is incomplete. Clicking the link opens a phishing site.",
		tags: ["kyc", "pan", "phishing"],
	},
	{
		id: 2,
		title: "Electricity bill overdue",
		desc: "You receive a message saying your electricity connection will be cut if you don’t pay immediately via a suspicious link.",
		tags: ["electricity", "urgent", "phishing"],
	},
	{
		id: 3,
		title: "Fake courier delivery",
		desc: "SMS says your package is held and you need to pay customs or click a tracking link, which leads to a fake payment portal.",
		tags: ["courier", "delivery", "fraud"],
	},
	{
		id: 4,
		title: "Lottery prize scam",
		desc: "Call or SMS claims you've won a lottery and must pay taxes or fees upfront to claim it.",
		tags: ["lottery", "prize", "advance fee fraud"],
	},
	{
		id: 5,
		title: "Fake UPI transaction alert",
		desc: "You receive a fake UPI credit message and then get a call asking for a refund to a scammer's account.",
		tags: ["upi", "refund", "social engineering"],
	},
	{
		id: 6,
		title: "Job offer from fake company",
		desc: "Scammers post fake job offers and ask for a registration or training fee.",
		tags: ["job", "employment", "advance fee fraud"],
	},
	{
		id: 7,
		title: "Bank account blocked warning",
		desc: "You receive a call or SMS claiming your account will be blocked unless you verify details via a fake link.",
		tags: ["banking", "verification", "phishing"],
	},
	{
		id: 8,
		title: "Fake tech support call",
		desc: "You get a call claiming to be from Microsoft or Apple asking to fix a virus issue, asking for remote access and money.",
		tags: ["tech support", "remote access", "fraud"],
	},
	{
		id: 9,
		title: "Income tax refund scam",
		desc: "Email or SMS says you’re eligible for a tax refund and asks you to enter bank details on a fake site.",
		tags: ["tax", "refund", "phishing"],
	},
	{
		id: 10,
		title: "WhatsApp OTP scam",
		desc: "You’re tricked into sharing a WhatsApp OTP, giving scammers control of your account.",
		tags: ["whatsapp", "otp", "account takeover"],
	},
] as const;
