import { faker } from "@faker-js/faker/locale/en";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { User } from "iconsax-react-nativejs";
import { PressableScale } from "pressto";
import { type ComponentProps, useMemo } from "react";
import { type UseFormProps, useForm, useFormContext } from "react-hook-form";
import { Alert, Image, type ImageProps, View } from "react-native";
import type { z } from "zod";
import { Text } from "@/components";
import { Form } from "@/components/form/Form";
import { FormField, type FormFieldProps } from "@/components/form/FormField";
import { IconSax, type IconSaxProps } from "@/context/IconContext";
import { profileSchema } from "@/modules/auth/schema";
import { useAuthStore } from "@/modules/auth/store";
import { colors } from "@/theme";
import { PROFILE } from "../../api";

type ProfileFormValues = z.Infer<typeof profileSchema>;

export const useProfileForm = (props?: UseFormProps<ProfileFormValues>) => {
	return useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		...props,
	});
};

function ProfileFormRoot(props: ComponentProps<typeof Form>) {
	const { children, ...form } = props;

	return <Form {...form}>{children}</Form>;
}

type ProfileFormImageProps = ImageProps;

ProfileFormRoot.Image = (props: ProfileFormImageProps) => {
	const {
		width = 100,
		height = 100,
		style = { borderRadius: 50, flex: 1 },
		...rest
	} = props;

	return <Image {...{ width, height, style }} {...rest} />;
};

type ProfileFormAvatarProps = {
	imageUri: string;
	imageProps?: ImageProps;
	iconProps?: IconSaxProps;
};

ProfileFormRoot.Avatar = (props: ProfileFormAvatarProps) => {
	const { imageUri, imageProps, iconProps } = props;
	const { icon = User, size = 40, ...restIconProps } = iconProps ?? {};

	return imageUri ? (
		<ProfileFormRoot.Image source={{ uri: imageUri }} {...imageProps} />
	) : (
		<IconSax {...{ icon, size }} {...restIconProps} />
	);
};

ProfileFormRoot.AvatarPicker = () => {
	const userImage = useAuthStore((state) => state.user?.image ?? "");
	const setUserImage = useAuthStore((state) => state.setUserImage);
	const form = useFormContext();

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

		const result = await ImagePicker.launchImageLibraryAsync({
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
				<ProfileForm.Avatar imageUri={userImage} />
			</PressableScale>

			<Text size="xxs" preset="default">
				Click the {userImage ? "Image" : "User Icon"} to{" "}
				{userImage ? "Update" : "Upload"} the avatar
			</Text>
		</View>
	);
};

type ProfileFormFieldProps = Partial<FormFieldProps>;

ProfileFormRoot.Name = (props: ProfileFormFieldProps) => {
	const placeholder = useMemo(() => faker.person.fullName(), []);

	return (
		<FormField name="name" label="Name" placeholder={placeholder} {...props} />
	);
};

ProfileFormRoot.Email = Form.Email;

ProfileFormRoot.Bio = (props: ProfileFormFieldProps) => {
	const placeholder = useMemo(() => faker.person.bio(), []);

	return (
		<FormField
			name="bio"
			label="Bio"
			placeholder={placeholder}
			multiline
			numberOfLines={4}
			{...props}
		/>
	);
};

ProfileFormRoot.Fields = Form.Fields;
ProfileFormRoot.Actions = Form.Actions;

export const ProfileForm = Object.assign(ProfileFormRoot, {
	Root: ProfileFormRoot,
});
