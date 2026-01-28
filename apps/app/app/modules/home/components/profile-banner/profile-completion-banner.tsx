import { Edit2, Happyemoji, User } from "iconsax-react-nativejs";
import { useSession } from "@/modules/profile/hooks/queries";
import { Suspense, useMemo } from "react";
import { ProfileCompletionCard } from "./profile-completion-card";

export function ProfileCompletionBanner() {
	return (
		<Suspense>
			<ProfileCompletionBannerImpl />
		</Suspense>
	);
}

function ProfileCompletionBannerImpl() {
	const { tasks, shouldShowBanner } = useProfileCompletionBanner();

	if (!shouldShowBanner) {
		return <></>;
	}

	return <ProfileCompletionCard tasks={tasks} />;
}

const useProfileCompletionBanner = () => {
	const { currUser } = useSession();

	const unSortedTasks = useMemo(
		() => [
			{
				title: "Verify Your Email address.",
				subtitle: "Secure your account by confirming your email.",
				icon: User,
				isComplete: currUser?.emailVerified ?? true,
			},
			{
				title: "Upload profile picture",
				subtitle: "Make a great impression with profile picture",
				icon: Happyemoji,
				isComplete: currUser?.image !== null,
			},
			{
				title: "Complete your Profile section",
				subtitle: "Helps others know you by completing Profile",
				icon: Edit2,
				isComplete: currUser?.name !== "",
			},
		],
		[currUser?.emailVerified, currUser?.image, currUser?.name],
	);

	const shouldShowBanner = useMemo(() => {
		return unSortedTasks.some((item) => item.isComplete === false);
	}, [unSortedTasks]);

	const tasks = useMemo(() => {
		return [...unSortedTasks].sort((item) => (item.isComplete ? -1 : 0));
	}, [unSortedTasks]);

	return { tasks, shouldShowBanner };
};
