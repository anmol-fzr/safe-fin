import { axiosInstance, type IResData } from "@/services/axios";
import { toast } from "sonner-native";


const { get, post } = axiosInstance;

interface UserDemoGraphicData {
	id: number;
	userId: string;
	dob: string;
	occupation: string;
	country: string;
	state: string;
	city: string;
	educationLevel: string;
	gender: string;
	createdAt: string;
	updatedAt: string;
}

type UserDemoGraphicReq = Pick<
	UserDemoGraphicData,
	//| "dob"
	"gender" | "country" | "state" | "city" | "educationLevel" | "occupation"
>;

type IResGetDemoGraphic =
	| { data: UserDemoGraphicData; isNew: false }
	| { data: null; isNew: true };

type IResUpdateDemoGraphic = IResData<UserDemoGraphicData>;

export const DEMO_GRAPHICS = {
	GET: () => get<unknown, IResGetDemoGraphic>(`/profile`),
	UPDATE: (data: UserDemoGraphicReq) =>
		post<unknown, IResUpdateDemoGraphic, UserDemoGraphicReq>(`/profile`, data),
} as const;

import { File } from "expo-file-system";

export const PROFILE = {
	AVATAR: {
		UPLOAD: async (file: {
			uri: string;
			fileName?: string | null;
			type?: string | undefined;
		}) => {
			const id = toast.loading("Uploading Avatar ...");
			const { uploadUrl, publicUrl, fileUrl } = await post<
				unknown,
				{
					uploadUrl: string;
					fileUrl: string;
					publicUrl: string;
				}
			>("/profile/avatar/upload-url", {
				fileName: file.fileName,
			});

			try {
				// Use modern File API from expo-file-system
				const expoFile = new File(file.uri);
				const arrayBuffer = await expoFile.arrayBuffer();

				// Upload using fetch with ArrayBuffer
				const uploadRes = await fetch(uploadUrl, {
					method: "PUT",
					body: arrayBuffer,
					headers: {
						"Content-Type": file.type ?? "image/jpeg",
					},
				});

				if (uploadRes.ok) {
					toast.success("Avatar Uploaded Successfully", { id });
					return { publicUrl, fileUrl };
				}

				toast.error("Unable to Upload Avatar", { id });
				return { publicUrl: "", fileUrl: "" };
			} catch (error) {
				console.error(error);
				toast.error("Error Uploading Avatar", { id });
				return { publicUrl: "", fileUrl: "" };
			}
		},
	},
};
