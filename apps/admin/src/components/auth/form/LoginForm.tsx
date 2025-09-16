import type React from "react";
import { useCallback } from "react";
import { cn, secsToClockTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useSendOtp, useVerifyOtp } from "@/hooks/api/auth";
import { isNull, isUndefined } from "@/lib/type-utils";
import { Route } from "@/routes/index";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAuthStore } from "@/store/useAuthStore";
import { authClient } from "@/lib/auth";
import { getPhonePlaceholder } from "@/lib/faker";
import useOtpTimer from "@/hooks/useOtpTimer";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const setAuthData = useAuthStore((state) => state.setData);
	const [animateRef] = useAutoAnimate();

	const navigate = Route.useNavigate();
	const { timeLeft, startTimer, resetTimer, isExpired } = useOtpTimer(229);

	const { sendOtp, isSendingOtp, isOtpSent, resetSentOtp } = useSendOtp();
	const { verifyOtpAsync, isVerifyingOtp } = useVerifyOtp();

	const phonePlaceholder = getPhonePlaceholder();

	const handleSendOtp = (phoneNumber: string) => {
		sendOtp(phoneNumber);
		resetTimer();
		startTimer();
	};

	const handleReSendOtp = () => {
		resetSentOtp();
		handleSendOtp();
	};

	const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
		async (e) => {
			e.preventDefault();
			const data = new FormData(e.target);
			const phoneNumber = data.get("phone-number")?.toString();

			if (isUndefined(phoneNumber) || isNull(phoneNumber)) {
				toast.error("Phone Number is Required");
				return;
			}

			if (!isOtpSent) {
				handleSendOtp(phoneNumber);
				return;
			}

			const otp = data.get("otp")?.toString();
			if (isUndefined(otp)) {
				toast.error("OTP is Required");
				return;
			}

			await verifyOtpAsync({ phoneNumber, code: otp });
			const respData = await authClient.getSession();

			if (isUndefined(respData.data?.user)) {
				throw new Error("User Data can't be `undefined`");
			}
			if (respData.data.user.role !== "admin") {
				return toast.error("Only Admins can Login");
			}
			setAuthData({ user: respData.data.user });

			navigate({
				to: "/dashboard",
			});
		},
		[isOtpSent, verifyOtpAsync, sendOtp, navigate],
	);

	return (
		<div
			className={cn("flex flex-col gap-6 min-w-md max-w-md", className)}
			{...props}
		>
			<Card>
				<LoginForm.Header />
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6" ref={animateRef}>
							<div className="grid gap-3">
								<Label htmlFor="phone-number">Phone Number</Label>
								<Input
									id="phone-number"
									name="phone-number"
									type="tel"
									placeholder={phonePlaceholder}
									required
									readOnly={isOtpSent}
								/>
							</div>
							{isOtpSent && (
								<>
									<div className="flex items-end justify-between">
										<div className="grid gap-3">
											<Label htmlFor="otp">OTP</Label>
											<InputOTP maxLength={6} name="otp" id="otp">
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</div>

										<Button
											variant="link"
											onClick={handleReSendOtp}
											disabled={!isExpired}
										>
											Resend OTP
										</Button>
									</div>
									{timeLeft > 0 && <div>{secsToClockTime(timeLeft)}</div>}
								</>
							)}
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									className="w-full"
									disabled={isSendingOtp || isVerifyingOtp}
								>
									{isOtpSent ? "Verify OTP" : "Send OTP"}
								</Button>
								{isOtpSent && (
									<Button variant="link" onClick={resetSentOtp}>
										Change Phone Number
									</Button>
								)}
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

LoginForm.Header = () => {
	return (
		<CardHeader>
			<CardTitle>Login to your account</CardTitle>
			<CardDescription>
				Enter your Phone Number below to login to your account
			</CardDescription>
		</CardHeader>
	);
};
