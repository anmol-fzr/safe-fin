import { axiosInstance } from "./axios";

type Root = {
	uploadUrl: string;
	fileUrl: string;
	publicUrl: string;
};

export const uploadMedia = async (file: File) => {
	const { uploadUrl, publicUrl, fileUrl } = await axiosInstance.post<
		unknown,
		Root
	>("/storage/upload-url", {
		filename: file.name,
		contentType: file.type,
		folder: "safefin-courses",
	});

	const uploadRes = await fetch(uploadUrl, {
		method: "PUT",
		body: file,
		headers: {
			"Content-Type": file.type,
		},
	});

	debugger;
	if (!uploadRes.ok) {
		throw new Error("Failed to upload image to storage");
	}

	return { publicUrl, fileUrl };
};
