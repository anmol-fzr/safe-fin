import axios from "axios";
import { authClient, logout } from "@/modules/auth/utils";
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
	(resp) => {
		return resp.data;
	},
	(error) => {
		const status = error.response?.status;
		console.log(error);

		console.log("got error axios interceptors");
		if (status === 401) {
			console.log("got 401 status");
			logout();
		}

		if (error.response?.data) {
			// Optionally handle specific status codes
			return Promise.reject(error);
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
};

type PaginatedRes<D> = {
	data: D;
	message: string;
	paginate: PaginationInfo;
};

type IResData<D, IsPaginated extends boolean = false> = IsPaginated extends true
	? PaginatedRes<D>
	: NonPaginatedRes<D>;

interface ITimestamps {
	createdAt: string;
	updatedAt: string;
}

interface IResSuccess {
	success: boolean;
}

type NumericBool = 0 | 1;

export type { IResData, ITimestamps, NumericBool, IResSuccess };
export { axiosInstance };
