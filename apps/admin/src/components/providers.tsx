import type { ReactElement } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import "../index.css";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
import { Link, useRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { authClient } from "@/lib/auth";
import { queryClient } from "@/main";
import { ViewTransition } from "./extras";
import { CmdK } from "./cmd-k";

export function Providers({ children }: { children: ReactElement }) {
	const router = useRouter();
	return (
		<>
			<ViewTransition>
				<CmdK />
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
					storageKey="vite-ui-theme"
				>
					<QueryClientProvider client={queryClient}>
						<AuthQueryProvider>
							<AuthUIProviderTanstack
								authClient={authClient}
								navigate={(href) => router.navigate({ href })}
								replace={(href) => router.navigate({ href, replace: true })}
								Link={({ href, ...props }) => <Link to={href} {...props} />}
							>
								<NuqsAdapter>{children}</NuqsAdapter>
							</AuthUIProviderTanstack>
						</AuthQueryProvider>
					</QueryClientProvider>
					<Toaster richColors />
				</ThemeProvider>
			</ViewTransition>

			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
