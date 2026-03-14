import { PressableScale } from "pressto";
import { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { Text } from "@/components";
import { Section } from "@/components/Section";
import { useRemoveProfileLink } from "@/modules/profile/hooks/mutations";
import { usePublicProfileScreenContext } from "@/modules/profile/screens";
import { useToggle } from "@/pkg/ui";
import { AddProfileLinkModal } from "./AddProfileLinkModal";
import { PublicProfileLinksList } from "./PublicProfileLinksList";

type LinkItem = {
	id: string | number;
	link: string;
};

interface PublicProfileLinksProps {
	links: LinkItem[];
}

const MAX_LINKS_NUM = 5;

export const PublicProfileLinks = (props: PublicProfileLinksProps) => {
	const { links } = props;
	const { isMyProfile } = usePublicProfileScreenContext();

	const { isOpen, onOpen, onClose } = useToggle();
	const { removeProfileLink } = useRemoveProfileLink();

	const showAddLink =
		isMyProfile && links.length > 0 && links.length < MAX_LINKS_NUM;

	function handleDeleteLink(index: string | number) {
		if (isMyProfile) {
			removeProfileLink(index as number);
		}
	}

	return (
		<Section>
			<Section.Header>
				<Section.Title>Links</Section.Title>
				{showAddLink && (
					<PressableScale
						entering={FadeInDown}
						exiting={FadeOutDown}
						onPress={onOpen}
					>
						<Text>Add Link</Text>
					</PressableScale>
				)}
			</Section.Header>

			<Section.Body preset="filled">
				<PublicProfileLinksList
					links={links}
					onAddLink={onOpen}
					onRemoveLink={handleDeleteLink}
				/>

				<AddProfileLinkModal {...{ isOpen, onClose }} />
			</Section.Body>
		</Section>
	);
};
