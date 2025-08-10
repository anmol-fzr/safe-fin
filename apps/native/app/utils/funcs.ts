import { colors } from "@/theme";

function compoundInterest(
	principal: number,
	rate: number,
	time: number,
	n: number = 12, // Default to monthly compounding
): number {
	const r = rate / 100;
	const totalAmount = principal * Math.pow(1 + r / n, n * time);
	return totalAmount;
}

function compoundInterestEarned(
	principal: number,
	rate: number,
	time: number,
	n: number = 12, // Default to monthly compounding
): number {
	return compoundInterest(principal, rate, time, n) - principal;
}

type CalcSwpProps = {
	totalInvestment: number; // Monthly SIP
	withdrawlPM: number;
	rate: number; // Annual return rate %
	duration: number; // In years
};

function calcSwp(formState: CalcSwpProps) {
	const { totalInvestment, withdrawlPM, rate, duration } = formState;

	const n = duration * 12;
	const i = rate / 12 / 100;

	const futureValue =
		totalInvestment * Math.pow(1 + i, n) -
		withdrawlPM * ((Math.pow(1 + i, n) - 1) / i);

	return {
		totalInvestment,
		totalWithdrawl: futureValue - totalInvestment,
		finalValue: futureValue,
	};
}

type CalcMfProps = {
	totalInvestment: number; // Monthly SIP
	rate: number; // Annual return rate %
	duration: number; // In years
};

function calcMF({ totalInvestment, rate, duration }: CalcMfProps) {
	const returns = compoundInterestEarned(totalInvestment, rate, duration);

	const totalValue = totalInvestment + returns;

	return {
		totalInvestment,
		returns,
		totalValue,
		pieData: [
			{
				value: totalInvestment / totalValue,
				color: colors.palette.primary200,
				text: "Invested amount",
			},
			{
				value: returns / totalValue,
				color: colors.tint,
				text: "Estimated returns",
			},
		],
	};
}

type PPFInput = {
	yearlyInvestment: number; // Amount deposited each year
	rate: number; // Annual interest rate (%)
	duration: number; // Total tenure (typically 15)
};

function calcPPF({ yearlyInvestment, rate, duration }: PPFInput) {
	const r = rate / 100;
	let total = 0;

	for (let i = 0; i < duration; i++) {
		total = (total + yearlyInvestment) * (1 + r);
	}

	const totalInvestment = yearlyInvestment * duration;
	const totalInterest = total - totalInvestment;
	const maturityValue = total;

	return {
		totalInvestment,
		totalInterest,
		maturityValue,
		pieData: [
			{
				value: totalInvestment / maturityValue,
				color: colors.palette.primary200,
				text: "Total investment",
			},
			{
				value: totalInterest / maturityValue,
				color: colors.tint,
				text: "Total interest",
			},
		],
	};
}

type EPFInput = {
	monthlySalary: number; // Basic + DA
	age: number; // Current age
	employeeContributionPercent: number; // Your share (% of salary)
	annualSalaryIncreasePercent: number; // Yearly hike in %
	interestRate: number; // Annual EPF interest (%)
};

function calculateEPF({
	monthlySalary,
	age,
	employeeContributionPercent,
	annualSalaryIncreasePercent,
	interestRate,
}: EPFInput): number {
	const retirementAge = 58;
	const months = (retirementAge - age) * 12;
	const monthlyRate = interestRate / 12 / 100;
	const employeeRate = employeeContributionPercent / 100;
	const employerRate = 0.12; // Fixed as per Indian EPF rules
	const hikeRate = annualSalaryIncreasePercent / 100;

	let totalAmount = 0;
	let currentSalary = monthlySalary;

	for (let month = 1; month <= months; month++) {
		const employeeContribution = currentSalary * employeeRate;
		const employerContribution = currentSalary * employerRate;

		const monthlyContribution = employeeContribution + employerContribution;

		totalAmount = (totalAmount + monthlyContribution) * (1 + monthlyRate);

		// Apply annual salary hike every 12 months
		if (month % 12 === 0) {
			currentSalary *= 1 + hikeRate;
		}
	}

	return totalAmount;
}

const currenctFmt = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0,
});

function getProgressiveColor(input: number) {
	// Clamp input between 0-30
	const clamped = Math.max(0, Math.min(30, input));
	// Calculate ratio (0-1) where 30=0, 0=1
	const ratio = (30 - clamped) / 30;

	// Green to red interpolation
	const red = Math.floor(ratio * 255);
	const green = Math.floor((1 - ratio) * 255);
	const blue = 0;

	// Convert to hex
	const toHex = (c: number) => {
		const hex = c.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	};

	return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

export { calcSwp, calcMF, currenctFmt, calcPPF, getProgressiveColor };
