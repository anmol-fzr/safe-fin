import { Suspense } from "react";

type WithLoadingComponent = {
	Loading: React.ComponentType<any>;
};

type LazyComponentType = React.ComponentType<any> & WithLoadingComponent;

interface WithSuspenseProps {
	Component: LazyComponentType;
}

export function WithSuspense(props: WithSuspenseProps) {
	const { Component } = props;

	if (!Component.Loading) {
		throw new Error("Component is Expected to have .Loading by WithSuspense");
	}

	return (
		<Suspense fallback={<Component.Loading />}>
			<Component />
		</Suspense>
	);
}
