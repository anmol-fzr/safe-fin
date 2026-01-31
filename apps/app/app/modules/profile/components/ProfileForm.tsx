import { FormProvider } from "react-hook-form";
import { Button, Text } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useYupForm } from "@/hooks";
import { useUpdateUser } from "@/modules/auth/hooks/useUpdateUser";
import { profileSchema } from "@/modules/auth/schema";
import { getFakeEmail } from "@/utils/faker/fields";
import { useAuthStore } from "@/modules/auth/store";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image } from "react-native";
import { PressableScale } from "pressto";
import { IconSax } from "@/context/IconContext";
import { User } from "iconsax-react-nativejs";
import { colors } from "@/theme";
import { View } from "react-native";
import { PROFILE } from "../api";

export const ProfileForm = () => {
	const user = useAuthStore((state) => state.user);
	const userImage = useAuthStore((state) => state.user?.image ?? "");
	const setUserImage = useAuthStore((state) => state.setUserImage);

	const form = useYupForm({
		schema: profileSchema,
		defaultValues: async () => {
			return {
				name: user?.name ?? "",
				email: user?.email ?? "",
				image: "",
			};
		},
	});
	const { updateUser, isUpdatingUser } = useUpdateUser();

	const onSubmit = form.handleSubmit((data) => {
		updateUser({
			name: data.name,
			image: data.image,
		});
	});

	const pickImage = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert(
				"Permission required",
				"Permission to access the media library is required.",
			);
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			const asset = result.assets[0];
			setUserImage(asset.uri);

			const { publicUrl } = await PROFILE.AVATAR.UPLOAD({
				uri: asset.uri,
				fileName: asset.fileName,
				type: asset.mimeType,
			});

			setUserImage(publicUrl);
			form.setValue("image", publicUrl);
		}
	};

	return (
		<FormProvider {...form}>
			<View
				style={{
					alignItems: "center",
				}}
			>
				<PressableScale
					onPress={pickImage}
					style={{
						width: 100,
						aspectRatio: 1,
						margin: "auto",
						borderRadius: 50,
						backgroundColor: colors.palette.neutral200,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{userImage ? (
						<Image
							source={{ uri: userImage }}
							width={100}
							height={100}
							style={{ borderRadius: 50, flex: 1 }}
						/>
					) : (
						<IconSax icon={User} size={40} />
					)}
				</PressableScale>

				<Text size="xxs" preset="default">
					Click the {userImage ? "Image" : "User Icon"} to{" "}
					{userImage ? "Update" : "Upload"} the avatar
				</Text>
			</View>

			<FormField name="name" label="Name" placeholder="John Doe" />
			<FormField
				name="email"
				label="Email Address"
				placeholder={getFakeEmail()}
				status="disabled"
			/>
			<Button
				preset="reversed"
				status={isUpdatingUser ? "loading" : undefined}
				onPress={onSubmit}
			>
				Update
			</Button>
		</FormProvider>
	);
};
