import { useRef } from "react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { Input } from "../ui/input";
import { useSearchKeyBinding } from "@/hooks/form/useSearchKeyBinding";
import { Kbd } from "../ui/kbd";
import { useDebounce } from "@/hooks/useDebounce";
import { useSettingsStore } from "@/store/useSettingsStore";

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

	return (
		<div className="relative w-fit">
			<Input
				ref={searchRef}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="max-w-60"
				type="search"
				placeholder="Search ..."
			/>
			{shortcutEnabled && (
				<Kbd className="absolute top-1/2 -translate-y-1/2 right-0 -translate-x-1/2">
					/
				</Kbd>
			)}
		</div>
	);
}
