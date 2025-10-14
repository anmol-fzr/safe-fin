import { axiosInstance, type IResData } from "@/services/axios";

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
