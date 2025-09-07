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
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<div className="mx-auto h-12 w-12 text-primary" />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Oops, something went wrong!
				</h1>
				<p className="mt-4 text-muted-foreground">{error.toString()}</p>
				<p className="mt-4 text-muted-foreground">
					{
						"We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue persists."
					}
				</p>
				<div className="mt-6">
					<Link
						onClick={resetErrorBoundary}
						to="/"
						className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						Go to Homepage
					</Link>
				</div>
			</div>
		</div>
	);
}

export function Providers({ children }: { children: ReactElement }) {
	const router = useRouter();
	return (
		<>
			<ErrorBoundary
				fallbackRender={Fallback}
				onReset={(details) => {
					console.log(details);
				}}
			>
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
			</ErrorBoundary>

			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
