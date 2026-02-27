import { type ExternalPathString, Link } from "expo-router";
import {
	Facebook as FacebookIcon,
	Instagram as InstagramIcon,
	Link as LinkIcon,
	Trash,
	Youtube as YoutubeIcon,
} from "iconsax-react-nativejs";
import { PressableScale } from "pressto";
import Animated, {
	FadeInDown,
	FadeInUp,
	FadeOutDown,
	SequencedTransition,
} from "react-native-reanimated";
import { EmptyState, ListView, Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { usePublicProfileScreenContext } from "@/modules/profile/screens";
import type { ThemedTextStyle, ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

type LinkItem = {
	id: string | number;
	link: string;
};

interface LinkListProps {
	links: LinkItem[];
	onAddLink: VoidFunction;
	onRemoveLink: (index: string | number) => void;
}

export const PublicProfileLinksList = (props: LinkListProps) => {
	const { links, onAddLink, onRemoveLink } = props;

	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<ListView
			data={links}
			layout={SequencedTransition}
			keyExtractor={(item) => item.link.toString()}
			columnWrapperStyle={{ gap: spacing.xxs }}
			renderItem={({ item }) => {
				const handleRemove = () => onRemoveLink(item.id);

				return (
					<PublicProfileLinksListItem
						link={item.link}
						handleRemove={handleRemove}
					/>
				);
			}}
			ListEmptyComponent={
				<Animated.View entering={FadeInUp} exiting={FadeOutDown}>
					<EmptyState
						imageStyle={{ height: 0, width: 0 }}
						heading="No Links added"
						content="Add your portfolio and social links here"
						button="Add Link"
						buttonOnPress={onAddLink}
					/>
				</Animated.View>
			}
		/>
	);
};

const $listLinkItemRoot: ThemedViewStyle = (theme) => ({
	flexDirection: "row",
	gap: theme.spacing.xs,
	flex: 1,
	justifyContent: "space-between",
	alignItems: "center",
});

const $listLinkItem: ThemedTextStyle = () => ({
	textTransform: "lowercase",
	textDecorationLine: "underline",
	flex: 1,
});

interface PublicProfileLinksListItemProps {
	link: string;
	handleRemove: VoidFunction;
}

const hostXIcon = {
	"instagram.com": InstagramIcon,
	"facebook.com": FacebookIcon,
	"youtube.com": YoutubeIcon,
} as const;

export const PublicProfileLinksListItem = (
	props: PublicProfileLinksListItemProps,
) => {
	const { link, handleRemove } = props;
	const { isMyProfile } = usePublicProfileScreenContext();
	const { themed, theme } = useAppTheme();

	const url = new URL(link);

	const icon = hostXIcon[url.hostname] ?? LinkIcon;

	return (
		<Animated.View
			style={themed($listLinkItemRoot)}
			entering={FadeInDown}
			exiting={FadeOutDown}
		>
			<IconSax icon={icon} size={20} />

			<Link href={link as ExternalPathString} style={themed($listLinkItem)}>
				<Text>{link}</Text>
			</Link>
			{isMyProfile && (
				<PressableScale onPress={handleRemove}>
					<IconSax icon={Trash} color={theme.colors.error} size={18} />
				</PressableScale>
			)}
		</Animated.View>
	);
};
