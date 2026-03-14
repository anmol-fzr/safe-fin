import { createTypedFactory } from "@/factory";
import { getPaginateRes, paginate } from "@/middleware";
import { queryParamSchema } from "@/schema/params";
import { zValidator } from "@hono/zod-validator";
import { scamIdParamSchema } from "./scam.schema";
import { isUndefined } from "@safe-fin/utils";

const { createHandlers } = createTypedFactory();

const scams = [
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
];

export const getScams = createHandlers(
	zValidator("query", queryParamSchema),
	paginate,
	async (c) => {
		const { offset, limit } = c.get("paginate");

		const total = scams.length;
		const paginate = getPaginateRes({ total, limit, offset });

		return c.json({
			data: scams,
			paginate,
		});
	},
);

export const getScamById = createHandlers(
	zValidator("param", scamIdParamSchema),
	async (c) => {
		const { scamId } = c.req.valid("param");

		const foundScam = scams.find((scam) => scam.id === scamId);

		if (isUndefined(foundScam)) {
			return c.json(
				{
					data: null,
				},
				400,
			);
		}

		return c.json({
			data: foundScam,
		});
	},
);
