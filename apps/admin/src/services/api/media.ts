import { axiosInstance } from "./axios";

export const uploadMedia = async (file: File): Promise<string> => {
	// 1. Get Presigned URL
	const {
		data: { uploadUrl, publicUrl },
	} = await axiosInstance.post("/storage/upload-url", {
		filename: file.name,
		contentType: file.type,
		folder: "safefin-courses", // Default folder, can be parameterized
	});

	// 2. Upload to Storage (S3/Minio)
	const uploadRes = await fetch(uploadUrl, {
		method: "PUT",
		body: file,
		headers: {
			"Content-Type": file.type,
		},
	});

	if (!uploadRes.ok) {
		throw new Error("Failed to upload image to storage");
	}

	// 3. Return the Public URL
	return publicUrl;
};
