import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { memo } from "react";
import type { TxKeyPath } from "@/i18n";
import { ScreenHeaderImpl } from "./ScreenHeaderImpl";

interface ScreenHeaderProps extends NativeStackHeaderProps {
	titleTx: TxKeyPath;
	tagLineTx: TxKeyPath;
	isInNativeHeader?: boolean;
}

export const ScreenHeader = memo((props: ScreenHeaderProps) => {
	const { titleTx, tagLineTx, ...rest } = props;

	return (
		<ScreenHeaderImpl.Root {...rest}>
			<ScreenHeaderImpl.Title titleTx={titleTx} />
			<ScreenHeaderImpl.SubTitle subTitleTx={tagLineTx} />
		</ScreenHeaderImpl.Root>
	);
});
