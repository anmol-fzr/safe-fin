import { Screen, ScreenHeader, GoBack } from "@/components";
import { $styles, spacing } from "@/theme";
import Markdown from "react-native-markdown-display";
import { $sizeStyles, $fontWeightStyles } from "@/components";

const copy = `
# 📊 Personal Finance Basics: A Beginner's Guide

Managing money is not just about earning—it’s about **planning, saving, and spending wisely**.

## Why Personal Finance Matters
- Helps you achieve financial goals
- Reduces stress about money
- Builds a safety net for emergencies

## Key Principles
1. **Track your income & expenses**
2. **Save at least 20%** of your income
3. Avoid unnecessary debt
4. Invest for the future

> 💡 *Tip:* Start with a budgeting app to see where your money goes.

---

# 💰 Budgeting 101: How to Create a Budget That Works

Budgeting is the foundation of financial stability. Here’s a simple 50/30/20 rule:

- **50% Needs** – Rent, groceries, utilities
- **30% Wants** – Dining out, entertainment
- **20% Savings & Debt Repayment**

## Steps to Build a Budget
1. Calculate monthly income
2. List all expenses
3. Categorize into needs, wants, savings
4. Adjust until income ≥ expenses

**Example Table:**

| Category | Amount | Percentage |
|----------|--------|------------|
| Needs    | ₹25,000 | 50%        |
| Wants    | ₹15,000 | 30%        |
| Savings  | ₹10,000 | 20%        |

---

# 🏦 Saving Money: Simple Habits for Long-Term Wealth

Small habits can lead to big savings over time.

## 5 Easy Saving Strategies
1. **Automate savings** – Transfer money to savings right after payday
2. Cut unnecessary subscriptions
3. Buy in bulk for essentials
4. Cook at home instead of eating out
5. Use cashback & rewards programs

### The Power of Compound Interest
If you invest ₹5,000/month at 10% annual return:
- In 10 years → ~₹10 Lakhs
- In 20 years → ~₹38 Lakhs

> 📌 *Start early. Even small amounts grow significantly over time.*

---

# 📈 Investing Basics: Turning Savings into Wealth

Saving keeps your money safe. **Investing makes it grow.**

## Types of Investments
- **Low Risk:** Fixed deposits, government bonds
- **Moderate Risk:** Mutual funds, index funds
- **High Risk:** Stocks, cryptocurrencies

## Golden Rules
- Diversify investments
- Invest regularly (SIP)
- Stay invested for the long term

---

# 💡 Emergency Fund: Your Financial Safety Net

An **emergency fund** covers unexpected expenses like job loss or medical bills.

### How Much Should You Save?
- Aim for **3–6 months** of living expenses

### Where to Keep It?
- High-interest savings account
- Short-term fixed deposit
- Liquid mutual fund

> 🚑 Financial emergencies are less stressful when you’re prepared.
`;

export function LessonScreen() {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="lessonScreen:title" />
			<Markdown
				style={{
					paragraph: {
						fontFamily: "spaceGroteskRegular",
					},
					strong: {
						fontFamily: "spaceGroteskRegular",
					},
					heading1: {
						...$sizeStyles.xl,
						...$fontWeightStyles.bold,
					},
					heading2: {
						...$sizeStyles.lg,
						...$fontWeightStyles.semiBold,
						marginTop: spacing.xs,
						marginBottom: spacing.xxs,
					},
					heading3: {
						...$sizeStyles.md,
						...$fontWeightStyles.bold,
						marginTop: spacing.xxs,
						marginBottom: spacing.xxxs,
					},
					hr: {
						marginBlock: spacing.md,
					},
					blockquote: {
						marginBlock: spacing.md,
					},
				}}
			>
				{copy}
			</Markdown>
		</Screen>
	);
}
