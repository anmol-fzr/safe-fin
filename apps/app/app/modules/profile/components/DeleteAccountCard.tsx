import { Alert, TextProps, View, ViewProps } from "react-native";

import { Button, ButtonProps, Text } from "@/components";
import { $styles, ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useDeleteAccount } from "../hooks/mutations";

const useHandleDeleteAccount = () => {
	const { deleteAccount } = useDeleteAccount();

	const handleDeleteAccount = () => {
		Alert.alert(
			"Delete Account",
			`This will permanently delete your account and all related data. 

This action cannot be undone.`,
			[
				{
					text: "Delet Account",
					style: "destructive",
					onPress: () => deleteAccount(),
				},

				{
					text: "Cancel",
					style: "cancel",
				},
			],
			{
				cancelable: true,
			},
		);
	};

	return { handleDeleteAccount };
};

export function DeleteAccountCard() {
	return (
		<DeleteAccountCardImpl>
			<DeleteAccountCardImpl.Header>
				<DeleteAccountCardImpl.Title>
					Delete Account
				</DeleteAccountCardImpl.Title>
				<DeleteAccountCardImpl.Desc>
					Permanently remove your account and all of its contents. This action
					is not reversible, so please continue with caution
				</DeleteAccountCardImpl.Desc>
			</DeleteAccountCardImpl.Header>

			<DeleteAccountCardImpl.Content>
				<DeleteAccountCardImpl.DeleteAccountButton />
			</DeleteAccountCardImpl.Content>
		</DeleteAccountCardImpl>
	);
}

type DeleteAccountCardImplProps = ViewProps;

function DeleteAccountCardImpl(props: DeleteAccountCardImplProps) {
	const { style: $styleOverride, ...rest } = props;
	const { themed } = useAppTheme();

	return <View style={[themed($root), $styleOverride]} {...rest} />;
}

type DeleteAccountCardImplHeaderProps = ViewProps;
DeleteAccountCardImpl.Header = (props: DeleteAccountCardImplHeaderProps) => {
	const { style: $styleOverride, ...rest } = props;

	const { themed } = useAppTheme();
	return <View style={[themed($container), $styleOverride]} {...rest} />;
};

type DeleteAccountCardImplTitleProps = TextProps;
DeleteAccountCardImpl.Title = (props: DeleteAccountCardImplTitleProps) => {
	return <Text size="xl" weight="semiBold" {...props} />;
};

type DeleteAccountCardImplDescProps = TextProps;
DeleteAccountCardImpl.Desc = (props: DeleteAccountCardImplDescProps) => {
	return <Text {...props} />;
};

type DeleteAccountCardImplContentProps = ViewProps;
DeleteAccountCardImpl.Content = (props: DeleteAccountCardImplContentProps) => {
	const { style: $styleOverride, ...rest } = props;

	const { themed } = useAppTheme();
	return <View style={[themed($container), $styleOverride]} {...rest} />;
};

DeleteAccountCardImpl.DeleteAccountButton = (props: ButtonProps) => {
	const { style: $styleOverride, ...rest } = props;

	const { themed } = useAppTheme();
	const { handleDeleteAccount } = useHandleDeleteAccount();

	return (
		<Button
			onPress={handleDeleteAccount}
			preset="destructive"
			style={themed($deleteAccountBtn)}
			{...rest}
		>
			Delete Account
		</Button>
	);
};

const $root: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.md,
	backgroundColor: theme.colors.errorBackground,
	padding: $styles.container.paddingHorizontal,
});

const $container: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.xs,
});

const $deleteAccountBtn: ThemedViewStyle = (theme) => ({
	marginLeft: 0,
	marginRight: "auto",
	paddingHorizontal: theme.spacing.lg,
});
