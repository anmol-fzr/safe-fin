import { colors } from "@/theme";

type Props = {
	investment: number; // Monthly SIP
	rate: number; // Annual return rate %
	duration: number; // In years
};

export function useSIPCalculatorLogic(formState: Props) {
	const { investment, rate, duration } = formState;

	const n = duration * 12;
	const i = rate / 12 / 100;

	const totalValue = investment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
	const totalInvested = investment * n;
	const returns = totalValue - totalInvested;

	return {
		totalInvested,
		returns,
		totalValue,
		pieData: [
			{
				value: totalInvested / totalValue,
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
