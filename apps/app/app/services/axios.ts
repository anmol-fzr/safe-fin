import axios, { type AxiosError, type AxiosResponse } from "axios";
import { authClient } from "@/modules/auth/utils";
import { envs } from "@/utils/envs";

const axiosInstance = axios.create({
	baseURL: envs.API_URL,
	timeout: 3000,
});

axiosInstance.interceptors.request.use((req) => {
	const cookies = authClient.getCookie();
	if (cookies) {
		req.headers.set("Cookie", cookies);
	}
	return req;
});

// Response Interceptor: Extract only .data
axiosInstance.interceptors.response.use(
	(resp: AxiosResponse<IResData>) => {
		return resp.data;
	},
	(error: AxiosError<IResData>) => {
		const status = error.response?.status;
		if (status === 401) {
			authClient.signOut();
		}

		if (error.response?.data) {
			// Optionally handle specific status codes
			return Promise.reject(error.response.data);
		}
		return Promise.reject({
			data: null,
			message: error.message || "Unknown error",
		} as IResData<null>);
	},
);

type PaginationInfo =
	| {
			hasMore: true;
			nextPage: number;
			total: number;
	  }
	| {
			hasMore: false;
			nextPage: null;
			total: number;
	  };

type NonPaginatedRes<D> = {
	data: D;
	message: string;
	paginate: undefined;
};

type PaginatedRes<D> = {
	data: D;
	message: string;
	paginate: PaginationInfo;
};

type IResData<D, IsPaginated extends boolean = false> = IsPaginated extends true
	? PaginatedRes<D>
	: NonPaginatedRes<D>;

export type { IResData };
export { axiosInstance };
