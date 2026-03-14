import { queryOptions, useQuery } from "@tanstack/react-query";

import { ADDRESS } from "@/services/api/address";

const getCountriesOpts = () => {
	return queryOptions({
		queryKey: ["COUNTRIES"],
		queryFn: ADDRESS.COUNTRIES,
		staleTime: Infinity,
		gcTime: Infinity,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
};

const useGetCoutriesOptions = () => {
	const opts = getCountriesOpts();
	const { data, isPending, isFetched, ...rest } = useQuery({
		...opts,
		select: (resp) => {
			return resp.data.map((country) => ({
				label: country.name,
				value: country.isoCode,
			}));
		},
	});

	return {
		countries: data ?? [],
		isCountriesPending: isPending,
		isCountriesFetched: isFetched,
		...rest,
	};
};

const getStatesOpts = (countryCode: string) => {
	return queryOptions({
		queryKey: ["STATES", countryCode] as const,
		queryFn: ({ queryKey }) => ADDRESS.STATES(queryKey[1]),
		staleTime: Infinity,
		gcTime: Infinity,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
};

const useGetStatesOptions = (countryCode: string | null) => {
	const opts = getStatesOpts(countryCode as string);

	const { data, isPending, isFetched, ...rest } = useQuery({
		...opts,
		enabled: countryCode !== null,
		select: (resp) => {
			return resp.data.map((state) => ({
				label: state.name,
				value: state.isoCode,
			}));
		},
	});

	return {
		states: data ?? [],
		isStatesPending: isPending,
		isStatesFetched: isFetched,
		...rest,
	};
};

const getCitiesOpts = (stateCode: string, countryCode: string) => {
	return queryOptions({
		queryKey: ["CITIES", stateCode, countryCode] as const,
		queryFn: ({ queryKey }) => ADDRESS.CITIES(queryKey[1], queryKey[2]),
		staleTime: Infinity,
		gcTime: Infinity,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
};

const useGetCitiesOptions = (stateCode?: string, countryCode?: string) => {
	const opts = getCitiesOpts(stateCode as string, countryCode as string);

	const { data, isPending, isFetched, ...rest } = useQuery({
		...opts,
		enabled: countryCode !== null && stateCode !== null,
		select: (resp) => {
			return resp.data.map((state) => ({
				label: state.name,
				value: state.name,
			}));
		},
	});

	return {
		cities: data ?? [],
		isCitiesPending: isPending,
		isCitiesFetched: isFetched,
		...rest,
	};
};

export { getCountriesOpts, getStatesOpts, getCitiesOpts };
export { useGetCoutriesOptions, useGetStatesOptions, useGetCitiesOptions };
