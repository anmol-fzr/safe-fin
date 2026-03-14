import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorDetails } from "./ErrorDetails";
import { ErrorType, reportCrash } from "@/utils/crashReporting";

interface Props {
	children: ReactNode;
	catchErrors: "always" | "dev" | "prod" | "never";
}

interface State {
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

/**
 * This component handles whenever the user encounters a JS error in the
 * app. It follows the "error boundary" pattern in React. We're using a
 * class component because according to the documentation, only class
 * components can be error boundaries.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/concept/Error-Boundary/}
 * @see [React Error Boundaries]{@link https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary}
 * @param {Props} props - The props for the `ErrorBoundary` component.
 * @returns {JSX.Element} The rendered `ErrorBoundary` component.
 */
export class ErrorBoundary extends Component<Props, State> {
	state = { error: null, errorInfo: null };

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		if (!this.isEnabled()) {
			return;
		}

		this.setState({
			error,
			errorInfo,
		});

		reportCrash(error, ErrorType.FATAL);
	}

	resetError = () => {
		this.setState({ error: null, errorInfo: null });
	};

	shouldComponentUpdate(
		nextProps: Readonly<Props>,
		nextState: Readonly<State>,
	): boolean {
		return nextState.error !== this.state.error;
	}

	isEnabled(): boolean {
		return (
			this.props.catchErrors === "always" ||
			(this.props.catchErrors === "dev" && __DEV__) ||
			(this.props.catchErrors === "prod" && !__DEV__)
		);
	}

	render() {
		return this.isEnabled() && this.state.error ? (
			<ErrorDetails
				onReset={this.resetError}
				error={this.state.error}
				errorInfo={this.state.errorInfo}
			/>
		) : (
			this.props.children
		);
	}
}
