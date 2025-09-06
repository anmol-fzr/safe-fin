import axios, { type AxiosError, type AxiosResponse } from "axios";
import { authClient } from "@/lib/auth";
import { envs } from "@/lib/envs";
import type { IResData } from "./types";

const axiosInstance = axios.create({
	baseURL: envs.API_URL,
	timeout: 3000,
	withCredentials: true,
});

// axiosInstance.interceptors.request.use(async (req) => {
// 	const authToken = localStorage.getItem("betterAuthToken");
//
// 	console.log(authToken);
// 	return req;
// });

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
		} as IResData);
	},
);

export { axiosInstance };
