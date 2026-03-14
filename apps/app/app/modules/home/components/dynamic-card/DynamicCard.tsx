import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Button } from "@/components";
import { PromoCardImpl } from "@/components/promo-card";
import type { PromoCardTitleProps } from "@/components/promo-card/promo-card";
import { openLinkInBrowser } from "@/utils/openLinkInBrowser";

interface DynamicCardProps {
	badge: {
		text: string;
	};
	title: PromoCardTitleProps & {
		text: string;
	};
	button: {
		text: string;
	};
}

type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;

export function DynamicCard(props: DeepPartial<DynamicCardProps>) {
	console.log(JSON.stringify(props, null, 2));
	const { badge = {}, title = {}, button = {} } = props || {};

	const { text: titleText = "", ...titleProps } = title;

	const titleStyles = StyleSheet.flatten([
		{
			zIndex: 1,
		},
		titleProps?.style || {},
	]);

	const { text: buttonText = "", handler = {}, ...buttonProps } = button;

	const handleBtnPress = useCallback(() => {
		if (handler.type === "ExternalLink" && handler.to) {
			openLinkInBrowser(handler.to);
		}
	}, [handler]);

	return (
		<PromoCardImpl.Root>
			{badge?.text && (
				<PromoCardImpl.Badge {...badge}>{badge.text}</PromoCardImpl.Badge>
			)}
			<PromoCardImpl.Body>
				{titleText && (
					<PromoCardImpl.Title
						size="xl"
						numberOfLines={3}
						style={titleStyles}
						{...titleProps}
					>
						{titleText}
					</PromoCardImpl.Title>
				)}

				{buttonText && (
					<Button preset="reversed" {...buttonProps} onPress={handleBtnPress}>
						{buttonText}
					</Button>
				)}
			</PromoCardImpl.Body>
		</PromoCardImpl.Root>
	);
}
