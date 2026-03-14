import {
	infiniteQueryOptions,
	mutationOptions,
	queryOptions,
	useMutation,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { authClient } from "@/lib/auth";
import type { AddUserFormData } from "@/schema/user.schema";
import { API } from "@/services";
import type { ICreateLessonReq } from "@/services/api";
import type { ResourceId } from "@/services/api/types";
import {
	createToastMessages,
	initialPageParam,
	useInvalidateResource,
	useResourceActionToast,
} from "./defaults";

const baseQueryKey = "USER";
const { createMsg, updateMsg, deleteMsg } = createToastMessages("User");

function getUsersOpts(params: { name: string }) {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey, params] as const,
		queryFn: ({ queryKey }) =>
			authClient.admin.listUsers({
				query: {
					sortBy: "createdAt",
					sortDirection: "desc",
					searchField: "name",
					searchValue: queryKey[1].name,
					searchOperator: "contains",
				},
			}),
		initialPageParam,
		getNextPageParam: (_lastPage, allPages, lastPageParam, _allPagesParams) => {
			const total = allPages[allPages.length - 1].data.total;

			const totalFetched = allPages.reduce((prev, curr) => {
				return prev + curr.data.users.length;
			}, 0);

			return totalFetched < total
				? {
						limit: lastPageParam.limit,
						skip: lastPageParam.skip + lastPageParam.limit,
					}
				: undefined;
		},
	});
}

const useGetUsers = (params: { name: string }) => {
	const opts = getUsersOpts(params);
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	return {
		users: data,
		...rest,
	};
};

function getLessonOpts(lessonId: ResourceId) {
	return queryOptions({
		queryKey: [baseQueryKey, lessonId] as const,
		queryFn: ({ queryKey }) => API.LESSON.ONE(queryKey[1]),
	});
}

const useGetLesson = (lessonId: ResourceId) => {
	const opts = getLessonOpts(lessonId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return {
		lesson: data,
		...rest,
	};
};

const getCreateUserOpts = () => {
	const mutationFn = (data: AddUserFormData) => {
		return authClient.admin.createUser({
			name: data.name,
			email: data.email,
			password: data.password,
			role: data.role,
			data: {
				phoneNumber: data.phoneNumber,
			},
		});
	};

	return mutationOptions({
		mutationKey: [baseQueryKey, "CREATE"],
		mutationFn,
	});
};

const useCreateUser = () => {
	const toast = useResourceActionToast();
	const { invalidateUsers } = useInvalidateUsers();

	const { loadingMsg, successMsg, errorMsg } = createMsg;

	const opts = getCreateUserOpts();
	const { mutate, ...rest } = useMutation({
		...opts,
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: () => {
			toast.success(successMsg);
			invalidateUsers();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		createUser: mutate,
		...rest,
	};
};

const useDeleteUser = () => {
	const toast = useResourceActionToast();
	const { invalidateUsers } = useInvalidateUsers();

	const { loadingMsg, successMsg, errorMsg } = deleteMsg;

	const { mutate, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "DELETE"],
		mutationFn: (userId: string) => authClient.admin.removeUser({ userId }),
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: () => {
			toast.success(successMsg);
			invalidateUsers();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		deleteUser: mutate,
		...rest,
	};
};

const useUpdateLesson = (lessonId: ResourceId) => {
	const toast = useResourceActionToast();
	const { invalidateUsers: invalidateLessons } = useInvalidateUsers();

	const { loadingMsg, successMsg, errorMsg } = updateMsg;

	const { mutate, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "UPDATE"],
		mutationFn: (lesson: ICreateLessonReq) =>
			API.LESSON.UPDATE(lessonId, lesson),
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: ({ message = successMsg }) => {
			toast.success(message);
			invalidateLessons();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		updateLesson: mutate,
		...rest,
	};
};

type BanUserFnPayload = {
	userId: string;
	banReason: string;
};

const useBanUser = () => {
	const toast = useResourceActionToast();
	const { invalidateUsers: invalidateLessons } = useInvalidateUsers();

	const loadingMsg = "Banning User...";
	const successMsg = "User Banned Successfully";
	const errorMsg = "Unable to Ban User";

	const { mutate, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "UPDATE"],
		mutationFn: (payload: BanUserFnPayload) =>
			authClient.admin.banUser(payload),
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: () => {
			toast.success(successMsg);
			invalidateLessons();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		banUser: mutate,
		...rest,
	};
};

export {
	useGetUsers,
	// useGetLesson,
	useCreateUser,
	// useUpdateLesson,
	useDeleteUser,
	useBanUser,
};

export { getUsersOpts };

const useInvalidateUsers = () => {
	const { invalidateResource } = useInvalidateResource(baseQueryKey);

	return { invalidateUsers: invalidateResource };
};
