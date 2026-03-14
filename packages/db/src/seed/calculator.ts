import type { InsertCalculator } from "@/schema";

const getFakeCalculators = (): InsertCalculator[] => {
	const fakerCalculators: InsertCalculator[] = [
		{
			title: "SIP Calculator",
			desc: "Calculate returns on your monthly mutual fund investments.",
			calculator: {
				sliders: [
					{
						label: "Monthly Investment",
						key: "monthlyInvestment",
						value: 5000,
						step: 500,
						minValue: 500,
						maxValue: 100000,
						prepend: "₹",
					},
					{
						label: "Expected Return Rate (p.a)",
						key: "expectedReturnRate",
						value: 12,
						step: 0.5,
						minValue: 1,
						maxValue: 30,
						append: "%",
					},
					{
						label: "Time Period",
						key: "timePeriod",
						value: 5,
						step: 1,
						minValue: 1,
						maxValue: 30,
						append: " Yr",
					},
				],
				calculate: {
					monthlyRate: "expectedReturnRate / 12 / 100",
					months: "timePeriod * 12",
					totalAmount:
						"monthlyInvestment * (((1 + monthlyRate) ^ months - 1) / monthlyRate) * (1 + monthlyRate)",
					investedAmount: "monthlyInvestment * months",
					estReturns: "totalAmount - investedAmount",
				},
				resultKeys: {
					investedAmount: "Invested Amount",
					estReturns: "Est. Returns",
					totalAmount: "Total Value",
				},
				pieChart: true,
				pieData: [
					{ valueKey: "investedAmount", text: "Invested Amount" },
					{ valueKey: "estReturns", text: "Est. Returns" },
				],
			},
		},
		{
			title: "Lumpsum Calculator",
			desc: "Calculate returns on your one-time mutual fund investments.",
			calculator: {
				sliders: [
					{
						label: "Total Investment",
						key: "investment",
						value: 25000,
						step: 500,
						minValue: 500,
						maxValue: 1000000,
						prepend: "₹",
					},
					{
						label: "Expected Return Rate (p.a)",
						key: "expectedReturnRate",
						value: 12,
						step: 0.5,
						minValue: 1,
						maxValue: 30,
						append: "%",
					},
					{
						label: "Time Period",
						key: "timePeriod",
						value: 5,
						step: 1,
						minValue: 1,
						maxValue: 30,
						append: " Yr",
					},
				],
				calculate: {
					totalAmount:
						"investment * (1 + expectedReturnRate / 100) ^ timePeriod",
					investedAmount: "investment * 1",
					estReturns: "totalAmount - investedAmount",
				},
				resultKeys: {
					investedAmount: "Invested Amount",
					estReturns: "Est. Returns",
					totalAmount: "Total Value",
				},
				pieChart: true,
				pieData: [
					{ valueKey: "investedAmount", text: "Invested Amount" },
					{ valueKey: "estReturns", text: "Est. Returns" },
				],
			},
		},
		{
			title: "EMI Calculator",
			desc: "Calculate your monthly EMI for loans.",
			calculator: {
				sliders: [
					{
						label: "Loan Amount",
						key: "loanAmount",
						value: 500000,
						step: 5000,
						minValue: 10000,
						maxValue: 10000000,
						prepend: "₹",
					},
					{
						label: "Interest Rate (p.a)",
						key: "interestRate",
						value: 9,
						step: 0.1,
						minValue: 1,
						maxValue: 30,
						append: "%",
					},
					{
						label: "Tenure",
						key: "tenure",
						value: 5,
						step: 1,
						minValue: 1,
						maxValue: 30,
						append: " Yr",
					},
				],
				calculate: {
					monthlyRate: "interestRate / 12 / 100",
					months: "tenure * 12",
					principalAmount: "loanAmount * 1",
					emi: "(loanAmount * monthlyRate * ((1 + monthlyRate) ^ months)) / (((1 + monthlyRate) ^ months) - 1)",
					totalAmount: "emi * months",
					totalInterest: "totalAmount - loanAmount",
				},
				resultKeys: {
					emi: "Monthly EMI",
					totalInterest: "Total Interest",
					totalAmount: "Total Amount",
				},
				pieChart: true,
				pieData: [
					{ valueKey: "principalAmount", text: "Principal Amount" },
					{ valueKey: "totalInterest", text: "Total Interest" },
				],
			},
		},
		{
			title: "FD Calculator",
			desc: "Calculate returns on your fixed deposits.",
			calculator: {
				sliders: [
					{
						label: "Total Investment",
						key: "investment",
						value: 50000,
						step: 1000,
						minValue: 5000,
						maxValue: 10000000,
						prepend: "₹",
					},
					{
						label: "Interest Rate (p.a)",
						key: "expectedReturnRate",
						value: 7,
						step: 0.1,
						minValue: 1,
						maxValue: 15,
						append: "%",
					},
					{
						label: "Time Period",
						key: "timePeriod",
						value: 3,
						step: 1,
						minValue: 1,
						maxValue: 10,
						append: " Yr",
					},
				],
				calculate: {
					totalAmount:
						"investment * ((1 + expectedReturnRate / 400) ^ (timePeriod * 4))",
					investedAmount: "investment * 1",
					estReturns: "totalAmount - investment",
				},
				resultKeys: {
					investedAmount: "Invested Amount",
					estReturns: "Est. Returns",
					totalAmount: "Total Value",
				},
				pieChart: true,
				pieData: [
					{ valueKey: "investedAmount", text: "Invested Amount" },
					{ valueKey: "estReturns", text: "Est. Returns" },
				],
			},
		},
		{
			title: "Simple Interest",
			desc: "Calculate simple interest on your principal.",
			calculator: {
				sliders: [
					{
						label: "Principal Amount",
						key: "principal",
						value: 10000,
						step: 500,
						minValue: 500,
						maxValue: 10000000,
						prepend: "₹",
					},
					{
						label: "Interest Rate (p.a)",
						key: "rate",
						value: 8,
						step: 0.1,
						minValue: 1,
						maxValue: 30,
						append: "%",
					},
					{
						label: "Time Period",
						key: "time",
						value: 5,
						step: 1,
						minValue: 1,
						maxValue: 30,
						append: " Yr",
					},
				],
				calculate: {
					interest: "principal * rate * time / 100",
					totalAmount: "principal + interest",
					principalAmt: "principal * 1",
				},
				resultKeys: {
					principalAmt: "Principal Amount",
					interest: "Total Interest",
					totalAmount: "Total Amount",
				},
				pieChart: true,
				pieData: [
					{ valueKey: "principalAmt", text: "Principal" },
					{ valueKey: "interest", text: "Interest" },
				],
			},
		},
		{
			title: "Compound Interest",
			desc: "Calculate compound interest with annual compounding.",
			calculator: {
				sliders: [
					{
						label: "Principal Amount",
						key: "principal",
						value: 10000,
						step: 500,
						minValue: 500,
						maxValue: 10000000,
						prepend: "₹",
					},
					{
						label: "Interest Rate (p.a)",
						key: "rate",
						value: 8,
						step: 0.1,
						minValue: 1,
						maxValue: 30,
						append: "%",
					},
					{
						label: "Time Period",
						key: "time",
						value: 5,
						step: 1,
						minValue: 1,
						maxValue: 30,
						append: " Yr",
					},
				],
				calculate: {
					amount: "principal * (1 + rate / 100) ^ time",
					principalAmt: "principal * 1",
					interest: "amount - principal",
				},
				resultKeys: {
					principalAmt: "Principal Amount",
					interest: "Total Interest",
					amount: "Total Amount",
				},
				pieChart: true,
				pieData: [
					{ valueKey: "principalAmt", text: "Principal" },
					{ valueKey: "interest", text: "Interest" },
				],
			},
		},
		{
			title: "Goal SIP Calculator",
			desc: "How much to invest monthly to reach a target?",
			calculator: {
				sliders: [
					{
						label: "Target Amount",
						key: "targetAmount",
						value: 1000000,
						step: 10000,
						minValue: 100000,
						maxValue: 100000000,
						prepend: "₹",
					},
					{
						label: "Expected Return (p.a)",
						key: "rate",
						value: 12,
						step: 0.5,
						minValue: 1,
						maxValue: 30,
						append: "%",
					},
					{
						label: "Time Period",
						key: "time",
						value: 10,
						step: 1,
						minValue: 1,
						maxValue: 40,
						append: " Yr",
					},
				],
				calculate: {
					monthlyRate: "rate / 12 / 100",
					months: "time * 12",
					monthlyInvestment:
						"targetAmount / ((((1 + monthlyRate) ^ months - 1) / monthlyRate) * (1 + monthlyRate))",
					totalInvested: "monthlyInvestment * months",
					wealthGained: "targetAmount - totalInvested",
				},
				resultKeys: {
					monthlyInvestment: "Monthly Investment",
					totalInvested: "Total Invested",
					wealthGained: "Wealth Gained",
				},
				pieChart: true,
				pieData: [
					{ valueKey: "totalInvested", text: "Invested" },
					{ valueKey: "wealthGained", text: "Wealth Gained" },
				],
			},
		},
		{
			title: "Inflation Calculator",
			desc: "Calculate future value of your expenses.",
			calculator: {
				sliders: [
					{
						label: "Current Expense",
						key: "currentCost",
						value: 50000,
						step: 500,
						minValue: 1000,
						maxValue: 1000000,
						prepend: "₹",
					},
					{
						label: "Inflation Rate (p.a)",
						key: "rate",
						value: 6,
						step: 0.1,
						minValue: 1,
						maxValue: 15,
						append: "%",
					},
					{
						label: "Time Period",
						key: "time",
						value: 10,
						step: 1,
						minValue: 1,
						maxValue: 50,
						append: " Yr",
					},
				],
				calculate: {
					futureCost: "currentCost * (1 + rate / 100) ^ time",
					baseCost: "currentCost * 1",
					inflationImpact: "futureCost - currentCost",
				},
				resultKeys: {
					baseCost: "Current Value",
					inflationImpact: "Inflation Cost",
					futureCost: "Future Value",
				},
				pieChart: true,
				pieData: [
					{ valueKey: "baseCost", text: "Current Value" },
					{ valueKey: "inflationImpact", text: "Inflation Effect" },
				],
			},
		},
	];

	return fakerCalculators;
};

export { getFakeCalculators };
