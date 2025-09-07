import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/form/LoginForm";
import { useSession } from "@/hooks/api/auth";
import Loader from "@/components/loader";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const { isPending, session } = useSession();
	const navigate = Route.useNavigate();

	useEffect(() => {
		if (session !== undefined) {
			//navigate({ to: "/dashboard" });
		}
	}, [isPending]);

	if (isPending) {
		return <Loader />;
	}
	return (
		<div className="h-screen grid place-items-center">
			<LoginForm />
		</div>
	);
}
