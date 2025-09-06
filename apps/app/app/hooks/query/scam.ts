import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const useScams = () => {
	return useQuery({
		queryKey: ["SCAMS"],
		queryFn: API.SCAM.GET,
	});
};

export { useScams };
