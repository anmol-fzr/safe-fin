import {
	type PropsWithChildren,
	startTransition,
	//unstable_ViewTransition as ViewTransition,
} from "react";

const ViewTransition = ({ children }: PropsWithChildren) => {
	return children;
};

export { ViewTransition, startTransition };
