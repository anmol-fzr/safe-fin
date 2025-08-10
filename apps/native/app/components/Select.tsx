import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import React from "react";

import type { SelectProps } from "tamagui";
import { Adapt, Select, Sheet, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

type SelectCompProps = SelectProps & {
	label: string;
	placeholder: string;
	options: { label: string; value: string }[];
	trigger?: React.ReactNode;
};

function SelectDemoContents(props: SelectCompProps) {
	const Options = React.useMemo(
		() =>
			props.options.map((item, i) => {
				return (
					<Select.Item index={i} key={item.label} value={item.value}>
						<Select.ItemText>{item.label}</Select.ItemText>
						<Select.ItemIndicator marginLeft="auto">
							<Check size={16} />
						</Select.ItemIndicator>
					</Select.Item>
				);
			}),
		[items],
	);

	return (
		<Select disablePreventBodyScroll {...props}>
			{props?.trigger || (
				<Select.Trigger maxWidth={220}>
					<Select.Value placeholder={props.placeholder} />
				</Select.Trigger>
			)}

			<Adapt when="maxMd" platform="touch">
				<Sheet modal dismissOnSnapToBottom animation="medium">
					<Sheet.Frame>
						<Sheet.ScrollView>
							<Adapt.Contents />
						</Sheet.ScrollView>
					</Sheet.Frame>
					<Sheet.Overlay
						backgroundColor="$shadowColor"
						animation="lazy"
						enterStyle={{ opacity: 0 }}
						exitStyle={{ opacity: 0 }}
					/>
				</Sheet>
			</Adapt>

			<Select.Content zIndex={200000}>
				<Select.ScrollUpButton
					alignItems="center"
					justifyContent="center"
					position="relative"
					width="100%"
					height="$3"
				>
					<YStack zIndex={10}>
						<ChevronUp size={20} />
					</YStack>

					<LinearGradient
						start={[0, 0]}
						end={[0, 1]}
						fullscreen
						colors={["$background", "transparent"]}
						borderRadius="$4"
					/>
				</Select.ScrollUpButton>

				<Select.Viewport
					animation="quick"
					// animateOnly={["transform", "opacity"]}
					// enterStyle={{ o: 0, y: -10 }}
					// exitStyle={{ o: 0, y: 10 }}
					// minWidth={200}
				>
					<Select.Group>
						<Select.Label>{props.label}</Select.Label>
						{Options}
					</Select.Group>
				</Select.Viewport>

				<Select.ScrollDownButton
					alignItems="center"
					justifyContent="center"
					position="relative"
					width="100%"
					height="$3"
				>
					<YStack zIndex={10}>
						<ChevronDown size={20} />
					</YStack>
					<LinearGradient
						start={[0, 0]}
						end={[0, 1]}
						fullscreen
						colors={["transparent", "$background"]}
						borderRadius="$4"
					/>
				</Select.ScrollDownButton>
			</Select.Content>
		</Select>
	);
}

const items = [
	{ label: "Apple", value: "Apple" },
	{ label: "Pear", value: "Pear" },
	{ label: "Blackberry", value: "Blackberry" },
	{ label: "Peach", value: "Peach" },
	{ label: "Apricot", value: "Apricot" },
];

export { SelectDemoContents as Select };
