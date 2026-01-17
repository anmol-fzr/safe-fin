import { useMutation } from "@tanstack/react-query";
import {
	createToastMessages,
	useInvalidateResource,
	useResourceActionToast,
} from "@/hooks/api/defaults";
import type { ResourceId } from "@/services/api/types";
import {
	CHAPTERS,
	COURSES,
	type IReqUpdateCourse,
	type IReqUpdateUnit,
	UNITS,
} from "../api";

const baseQueryKey = "COURSES";
const { createMsg, updateMsg, deleteMsg } = createToastMessages("Course");

const useCreateCourse = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = createMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "CREATE"],
		mutationFn: COURSES.CREATE,
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
		createCourse: mutate,
		createCourseAsync: mutateAsync,
		...rest,
	};
};

const useUpdateCourse = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = updateMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "UPDATE"],
		mutationFn: ({
			courseId,
			data,
		}: {
			courseId: ResourceId;
			data: IReqUpdateCourse;
		}) => COURSES.UPDATE(courseId, data),
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
		updateCourse: mutate,
		updateCourseAsync: mutateAsync,
		...rest,
	};
};

// Chapter mutations
const chapterMessages = createToastMessages("Chapter");

const useCreateChapter = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = chapterMessages.createMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "CHAPTER", "CREATE"],
		mutationFn: ({
			courseId,
			chapters,
		}: {
			courseId: ResourceId;
			chapters: Array<{ title: string; index: number }>;
		}) => CHAPTERS.CREATE(courseId, chapters),
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
		createChapter: mutate,
		createChapterAsync: mutateAsync,
		...rest,
	};
};

const useUpdateChapter = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = chapterMessages.updateMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "CHAPTER", "UPDATE"],
		mutationFn: ({ chapterId, data }: { chapterId: ResourceId; data: any }) =>
			CHAPTERS.UPDATE(chapterId, data),
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
		updateChapter: mutate,
		updateChapterAsync: mutateAsync,
		...rest,
	};
};

const useDeleteChapter = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = chapterMessages.deleteMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "CHAPTER", "DELETE"],
		mutationFn: (chapterId: ResourceId) => CHAPTERS.DELETE(chapterId),
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
		deleteChapter: mutate,
		deleteChapterAsync: mutateAsync,
		...rest,
	};
};

const useReorderChapters = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "CHAPTER", "REORDER"],
		mutationFn: CHAPTERS.REORDER,
		onSuccess: () => {
			invalidateLessons();
		},
		onError: ({ message = "Failed to reorder chapters" }) => {
			toast.error(message);
		},
	});

	return {
		reorderChapters: mutate,
		reorderChaptersAsync: mutateAsync,
		...rest,
	};
};

// Unit mutations
const unitMessages = createToastMessages("Unit");

const useCreateUnit = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = unitMessages.createMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "UNIT", "CREATE"],
		mutationFn: ({
			chapterId,
			units,
		}: {
			chapterId: ResourceId;
			units: any[];
		}) => UNITS.CREATE(chapterId, units),
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
		createUnit: mutate,
		createUnitAsync: mutateAsync,
		...rest,
	};
};

const useUpdateUnit = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = unitMessages.updateMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: ["UNITS", "UPDATE"],
		mutationFn: ({
			unitId,
			data,
		}: {
			unitId: ResourceId;
			data: IReqUpdateUnit;
		}) => UNITS.UPDATE(unitId, data),
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
		updateUnit: mutate,
		updateUnitAsync: mutateAsync,
		...rest,
	};
};

const useDeleteUnit = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = unitMessages.deleteMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "UNIT", "DELETE"],
		mutationFn: (unitId: ResourceId) => UNITS.DELETE(unitId),
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
		deleteUnit: mutate,
		deleteUnitAsync: mutateAsync,
		...rest,
	};
};

const useReorderUnits = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "UNIT", "REORDER"],
		mutationFn: (units: Array<{ id: number; index: number }>) =>
			UNITS.REORDER(units),
		onSuccess: () => {
			invalidateLessons();
		},
		onError: ({ message = "Failed to reorder units" }) => {
			toast.error(message);
		},
	});

	return {
		reorderUnits: mutate,
		reorderUnitsAsync: mutateAsync,
		...rest,
	};
};

export {
	useCreateCourse,
	useUpdateCourse,
	useCreateChapter,
	useUpdateChapter,
	useDeleteChapter,
	useReorderChapters,
	useCreateUnit,
	useUpdateUnit,
	useDeleteUnit,
	useReorderUnits,
	// useUpdateLesson,
	// useDeleteLesson,
};

const useInvalidateLessons = () => {
	const { invalidateResource } = useInvalidateResource(baseQueryKey);

	return { invalidateLessons: invalidateResource };
};
