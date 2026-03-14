import { ResourceProvider } from "@/context/resource.context";
import { GreenBadge } from "../form/badge/GreenBadge";
import { GrayBadge } from "../form/badge/GrayBadge";
import { CircleDashedIcon, CircleCheckBigIcon } from "lucide-react";

const VerifiedBadge = () => (
	<GreenBadge
		title="Verified"
		Icon={CircleCheckBigIcon}
		tooltip="User has verified his identity"
	/>
);

const UnVerifiedBadge = () => (
	<GrayBadge
		title="Unverified"
		Icon={CircleDashedIcon}
		tooltip="User hasn't verified his identity yet"
	/>
);

export const UserVerificationBadge = ({
	isVerified,
}: {
	isVerified: boolean;
}) => {
	return (
		<ResourceProvider value={{ resource: "User" }}>
			{isVerified ? <VerifiedBadge /> : <UnVerifiedBadge />}
		</ResourceProvider>
	);
};
