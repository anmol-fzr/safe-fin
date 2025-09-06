import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
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

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isOtpSent, setIsOtpSent] = useState(false);

	const navigate = Route.useNavigate();
	const { sendOtp } = useSendOtp();
	const { verifyOtp } = useVerifyOtp();

	const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
		(e) => {
			e.preventDefault();
			const data = new FormData(e.target);
			const phoneNumber = data.get("phone-number")?.toString();

			if (!isOtpSent) {
				if (isUndefined(phoneNumber)) {
					toast.error("Phone Number is Required");
				}
				if (isNull(phoneNumber)) {
					toast.error("Phone Number is Required");
				}
				const sendOtpPrms = sendOtp(phoneNumber);
				toast.promise(sendOtpPrms, {
					loading: "Sending OTP ...",
					success: "OTP Sent Successfully",
					error: "Unable to Send OTP",
				});
				setIsOtpSent(true);
			} else {
				const otp = data.get("otp")?.toString();
				if (!otp) {
					toast.error("OTP is Required");
				}
				const verifyOtpPrms = verifyOtp({ phoneNumber, code: otp });

				toast.promise(verifyOtpPrms, {
					loading: "Verifying OTP ...",
					success: () => {
						navigate({
							to: "/dashboard",
						});
						return "OTP Verified Successfully";
					},
					error: "Unable to Verify OTP",
				});
			}
		},
		[isOtpSent],
	);

	return (
		<div className={cn("flex flex-col gap-6 min-w-md", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your Phone Number below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="phone-number">Phone Number</Label>
								<Input
									id="phone-number"
									name="phone-number"
									type="tel"
									placeholder="*****-*****"
									required
								/>
							</div>
							{isOtpSent && (
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
							)}
							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full">
									{isOtpSent ? "Verify OTP" : "Send OTP"}
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
