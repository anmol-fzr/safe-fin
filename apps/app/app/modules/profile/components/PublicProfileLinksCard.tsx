import { Section } from "@/components/Section";
import { Button, EmptyState, ListView, Text } from "@/components";
import { useState } from "react";
import { Link } from "expo-router";
import { useToggle } from "@/pkg/ui";
import { Modal, Pressable, TextInput, View } from "react-native";
import { useAppTheme } from "@/utils/useAppTheme";
import { PressableScale } from "pressto";
import { IconSax } from "@/context/IconContext";
import { Trash } from "iconsax-react-nativejs";

type LinkItem = {
	href: string;
};

export const PublicProfileLinksCard = () => {
	const [links, setLinks] = useState<LinkItem[]>([
		{
			href: "https://github.com/anmol-fzr",
		},
		{
			href: "https://linkedin.com/in/anmol-fzr",
		},
		{
			href: "https://youtube.com",
		},
	]);
	const { isOpen, onOpen, onClose } = useToggle();

	function handleNewLink(newLink: string) {
		setLinks((prevLinks) => [...prevLinks, { href: newLink }]);
	}

	const isEmpty = links.length === 0;
	const MAX_LINKS_NUM = 5;
	const showAddLink = links.length > 0 && links.length < MAX_LINKS_NUM;

	function handleDeleteLink(index: number) {
		setLinks((prevLinks) => [...prevLinks].splice(index, 1));
	}

	return (
		<Section>
			<Section.Header>
				<Section.Title>Links</Section.Title>
				{showAddLink && (
					<Pressable onPress={onOpen}>
						<Text>Add Link</Text>
					</Pressable>
				)}
			</Section.Header>

			<Section.Body preset="filled">
				<LinkList
					links={links}
					onAddLink={onOpen}
					onRemoveLink={handleDeleteLink}
				/>

				<AddLinkModal {...{ isOpen, onClose }} handleNewLink={handleNewLink} />
			</Section.Body>
		</Section>
	);
};

interface AddLinkModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
	handleNewLink: (newLink: string) => void;
}

const AddLinkModal = (props: AddLinkModalProps) => {
	const { isOpen, onClose, handleNewLink } = props;

	const [newLink, setNewLink] = useState("");

	const onAdd = () => {
		const newLinkText = newLink.trim();
		if (newLinkText) {
			handleNewLink(newLinkText);
		}
		setNewLink("");
		onClose();
	};

	const {
		theme: { colors, roundness },
	} = useAppTheme();

	return (
		<Modal
			visible={isOpen}
			onRequestClose={onClose}
			presentationStyle="pageSheet"
			animationType="fade"
			transparent
		>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "rgba(0,0,0,0.4)",
				}}
			>
				<View
					style={{
						width: "90%",
						backgroundColor: "white",
						padding: 12,
						borderRadius: 12,
					}}
				>
					<Section>
						<Section.Title>Modal Title</Section.Title>

						<TextInput
							value={newLink}
							onChangeText={setNewLink}
							placeholder="https://linkedin.com/in/your-username"
							onEndEditing={onAdd}
							style={{
								borderWidth: 1,
								borderColor: colors.border,
								borderRadius: roundness,
								paddingHorizontal: 12,
							}}
						/>

						<Section.Body>
							<Button onPress={onAdd}>Add</Button>
						</Section.Body>
					</Section>
				</View>
			</View>
		</Modal>
	);
};

interface LinkListProps {
	links: LinkItem[];
	onAddLink: VoidFunction;
	onRemoveLink: (index: number) => void;
}

const LinkList = (props: LinkListProps) => {
	const { links, onAddLink, onRemoveLink } = props;

	const {
		theme: { colors, spacing },
	} = useAppTheme();
	return (
		<ListView
			data={links}
			keyExtractor={(item) => item.href}
			columnWrapperStyle={{ gap: spacing.xxs }}
			renderItem={({ item, index }) => {
				return (
					<View
						style={{
							flexDirection: "row",
							gap: spacing.sm,
							flex: 1,
							justifyContent: "space-between",
						}}
					>
						<Link
							key={item.href}
							href={item.href}
							style={{
								textTransform: "lowercase",
								textDecorationColor: colors.tint,
								textDecorationLine: "underline",
								flex: 1,
							}}
						>
							{item.href}
						</Link>
						<PressableScale onPress={() => onRemoveLink(index)}>
							<IconSax icon={Trash} color={colors.error} size={18} />
						</PressableScale>
					</View>
				);
			}}
			ListEmptyComponent={
				<EmptyState
					imageStyle={{ height: 0, width: 0 }}
					heading="No Links here"
					content="Add your portfolio and social links here"
					button="Add Link"
					buttonOnPress={onAddLink}
				/>
			}
		/>
	);
};
