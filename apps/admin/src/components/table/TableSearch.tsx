import { useAutoAnimate } from "@formkit/auto-animate/react";
import { XIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { useRef } from "react";
import { useSearchKeyBinding } from "@/hooks/form/useSearchKeyBinding";
import { useDebounce } from "@/hooks/useDebounce";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Kbd } from "../ui/kbd";

type TableSearchProps = {
	searchQueryParamKey: string;
};

export const useTableSearchValue = (queryParamKey: string, delay = 750) => {
	const [query] = useQueryState(queryParamKey, parseAsString.withDefault(""));
	const searchQuery = useDebounce(query, delay);

	return searchQuery;
};

export function TableSearch({ searchQueryParamKey }: TableSearchProps) {
	const [query, setQuery] = useQueryState(
		searchQueryParamKey,
		parseAsString
			.withDefault("")
			.withOptions({ limitUrlUpdates: debounce(500) }),
	);
	const searchRef = useRef<HTMLInputElement>(null);
	const shortcutEnabled = useSettingsStore((state) => state.shortcuts.enabled);
	useSearchKeyBinding({ searchRef, enabled: shortcutEnabled });

	const clearQuery = () => setQuery("");
	const hasQuery = query.length > 0;
	return (
		<div className="relative w-fit">
			<Input
				ref={searchRef}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="min-w-60 max-w-96"
				type="search"
				placeholder="Search ..."
			/>

			{hasQuery && (
				<Button
					onClick={clearQuery}
					variant="ghost"
					className="absolute top-1/2 -translate-y-1/2 right-6 -translate-x-1/2 bg-transparent !p-1 h-fit"
				>
					<XIcon />
				</Button>
			)}
			{shortcutEnabled && (
				<Kbd className="absolute top-1/2 -translate-y-1/2 right-0 -translate-x-1/2">
					/
				</Kbd>
			)}
		</div>
	);
}
