import { faker } from "@faker-js/faker/locale/en";
import { CloseCircle } from "iconsax-react-nativejs";
import { PressableScale } from "pressto";
import { useMemo, useState } from "react";
import { TextInput } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { IconSax } from "@/context/IconContext";
import { useAddProfileLink } from "@/modules/profile/hooks/mutations";
import { useAppTheme } from "@/utils/useAppTheme";

interface AddLinkModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
}

export const AddProfileLinkModal = (props: AddLinkModalProps) => {
	const { isOpen, onClose } = props;

	const [newLink, setNewLink] = useState("");

	const { addProfileLink } = useAddProfileLink();

	const onAdd = () => {
		const newLinkText = newLink.trim().toLowerCase();
		if (newLinkText) {
			addProfileLink({
				link: newLinkText,
			});
		}
		setNewLink("");
		onClose();
	};

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const placeholder = useMemo(() => faker.internet.url(), []);

	if (!isOpen) {
		return <></>;
	}

	return (
		<Animated.View
			entering={FadeInDown}
			exiting={FadeOutDown}
			style={{
				flexDirection: "row",
				gap: spacing.lg,
				marginTop: spacing.md,
				flex: 1,
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<TextInput
				value={newLink}
				onChangeText={setNewLink}
				//placeholder="https://linkedin.com/in/your-username"
				placeholder={placeholder}
				placeholderTextColor={colors.textDim}
				inputMode="url"
				keyboardType="url"
				onEndEditing={onAdd}
				autoFocus
				style={{
					flex: 1,
					borderWidth: 1,
					borderColor: colors.border,
					borderRadius: spacing.sm,
					paddingHorizontal: 12,
				}}
			/>

			<PressableScale onPress={onClose}>
				<IconSax icon={CloseCircle} size={18} />
			</PressableScale>
		</Animated.View>
	);
};
