import { yupResolver } from "@hookform/resolvers/yup";
import { type FieldValues, type UseFormProps, useForm } from "react-hook-form";
import type { ObjectSchema } from "yup";

type UseYupFormProps<
	TFieldValues extends FieldValues,
	TSchema extends ObjectSchema<TFieldValues>,
	TContext = any,
> = Omit<UseFormProps<TFieldValues, TContext>, "resolver"> & {
	schema: TSchema;
	resolverOptions?: Parameters<typeof yupResolver>[1];
};

/**
 * Hook to integrate Yup with react-hook-form in a type-safe way.
 *
 * @param schema - The Yup schema to validate the form values.
 * @param props - Additional props for the useForm hook.
 * @returns A react-hook-form instance integrated with Yup validation.
 */
export function useYupForm<
	TFieldValues extends FieldValues,
	TSchema extends ObjectSchema<TFieldValues>,
	TContext = any,
>({
	schema,
	resolverOptions,
	...props
}: UseYupFormProps<TFieldValues, TSchema, TContext>) {
	const form = useForm<TFieldValues, TContext>({
		resolver: yupResolver(schema, resolverOptions),
		...props,
	});

	return form;
}
