interface EmailOpts {
	CLIENT_ID: string;
	CLIENT_SECRET: string;
	REFRESH_TOKEN: string;
}

export class Emailer {
	CLIENT_ID: string;
	CLIENT_SECRET: string;
	REFRESH_TOKEN: string;

	constructor(opts: EmailOpts) {
		this.CLIENT_ID = opts.CLIENT_ID;
		this.CLIENT_SECRET = opts.CLIENT_SECRET;
		this.REFRESH_TOKEN = opts.REFRESH_TOKEN;
	}

	async getAccessToken() {
		const params = new URLSearchParams({
			client_id: this.CLIENT_ID,
			client_secret: this.CLIENT_SECRET,
			refresh_token: this.REFRESH_TOKEN,
			grant_type: "refresh_token",
		});

		const response = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: params,
		});

		const data = await response.json();
		if (!response.ok) throw new Error(`Token Error: ${data.error_description}`);
		return data.access_token;
	}

	async sendOtp(payload: { email: string; otp: string }) {
		const { email, otp } = payload;

		try {
			const accessToken = await this.getAccessToken();

			const result = await sendOTPEmail(accessToken, email, otp);
			console.info("Send OTP Email Result:", result);
		} catch (e) {
			console.error("Send OTP Email Error: ", e);
		}
	}
}

const getEmailContent = (otpCode: string) => {
	return {
		subject: `Your SafeFin Login Code: ${otpCode}`,

		// Fallback for email clients that don't support HTML
		text: `
Your SafeFin verification code is: ${otpCode}

This code will expire in 10 minutes.

If you did not request this code, please ignore this email or contact support.

- The SafeFin Team
`,

		// Professional HTML template
		html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
.container { max-width: 600px; margin: 0 auto; padding: 20px; }
.header { text-align: center; margin-bottom: 30px; }
.otp-box { background-color: #f4f4f5; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0; }
.otp-code { font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000; }
.footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
</style>
</head>
<body>
<div class="container">
<div class="header">
<h2>SafeFin Security</h2>
</div>

<p>Hello,</p>
<p>Please use the verification code below to sign in to your SafeFin account.</p>

<div class="otp-box">
<div class="otp-code">${otpCode}</div>
</div>

<p><strong>This code expires in 10 minutes.</strong></p>
<p>If you didn't request this code, you can safely ignore this email.</p>

<div class="footer">
<p>SafeFin Inc. &bull; Secure Financial Management</p>
</div>
</div>
</body>
</html>
`,
	};
};

async function sendOTPEmail(accessToken: string, to: string, otpCode: string) {
	const content = getEmailContent(otpCode);
	const boundary = "foo_bar_baz"; // Random unique string

	const rawMessage = [
		`To: ${to}`,
		`Subject: ${content.subject}`,
		"MIME-Version: 1.0",
		`Content-Type: multipart/alternative; boundary="${boundary}"`,
		"",
		`--${boundary}`,
		"Content-Type: text/plain; charset=UTF-8",
		"Content-Transfer-Encoding: 7bit",
		"",
		content.text,
		"",
		`--${boundary}`,
		"Content-Type: text/html; charset=UTF-8",
		"Content-Transfer-Encoding: 7bit",
		"",
		content.html,
		"",
		`--${boundary}--`,
	].join("\n");

	const encodedEmail = btoa(rawMessage)
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");

	const response = await fetch(
		"https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ raw: encodedEmail }),
		},
	);

	return response.json();
}
