import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSendOtp } from "@/modules/auth/hook/mutations";
import type React from "react";
import { useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useVerifyOtp } from "@/hooks/api/auth";
import useOtpTimer from "@/hooks/useOtpTimer";
import { authClient } from "@/lib/auth";
import { cn, secsToClockTime } from "@/lib/utils";
import { isNull, isUndefined } from "@/pkg/utils";
import { Route } from "@/routes/index";
import { useAuthStore } from "@/store/useAuthStore";

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

	const handleSendOtp = useCallback(
		(email: string) => {
			sendOtp(email);
			resetTimer();
			startTimer();
		},
		[sendOtp, resetTimer, startTimer],
	);

	const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
		async (e) => {
			e.preventDefault();
			const data = new FormData(e.currentTarget);
			const email = data.get("email")?.toString();

			if (isUndefined(email) || isNull(email)) {
				toast.error("Email is Required");
				return;
			}

			if (!isOtpSent) {
				handleSendOtp(email);
				return;
			}

			const otp = data.get("otp")?.toString();
			if (isUndefined(otp)) {
				toast.error("OTP is Required");
				return;
			}

			await verifyOtpAsync({ email, otp });
			const respData = await authClient.getSession();

			if (isUndefined(respData.data?.user)) {
				throw new Error("User Data can't be `undefined`");
			}
			if (respData.data.user.role !== "admin") {
				return toast.error("Only Admins can Login");
			}
			// biome-ignore assist: Will Fix this Later
			setAuthData({ user: respData.data.user as any });

			navigate({
				to: "/dashboard",
			});
		},
		[isOtpSent, verifyOtpAsync, handleSendOtp, navigate, setAuthData],
	);

	return (
		<div
			className={cn("flex flex-col gap-6 min-w-md max-w-md", className)}
			{...props}
		>
			<Card>
				<img
					src="/favicon-light.png"
					className="w-20 aspect-square mx-auto rounded-2xl"
				/>
				<LoginForm.Header />
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6" ref={animateRef}>
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="text"
									placeholder="user@email.com"
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
											onClick={resetSentOtp}
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
										Change Email
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
				Enter your Email Address below to login to your account
			</CardDescription>
		</CardHeader>
	);
};
