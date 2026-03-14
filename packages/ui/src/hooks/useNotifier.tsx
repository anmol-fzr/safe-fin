/**
 * useNotifier is used to inject the `toast` code with coupling to a specific library like `react-hot-toast` or `burnt`
 * */
import { createContext } from "react";
import { useSafeContext } from "./useSafeContext";

type ToastFn = (msg: string, opts: { id: string }) => void;

export interface Notifier {
	loading: ToastFn;
	success: ToastFn;
	error: ToastFn;
}

const NotifierContext = createContext<Notifier | null>(null);
NotifierContext.displayName = "NotifierContext";

const NotifierProvider = NotifierContext.Provider;

const useNotifier = () => {
	return useSafeContext(NotifierContext, useNotifier.name);
};

export { NotifierProvider, useNotifier };
