import React from "react";
import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../ui/form";
import { DevTool } from "@hookform/devtools";

type FormHelpers<TData extends FieldValues> = Pick<
  UseFormReturn<TData>,
  "reset" | "resetField" | "setError" | "getValues" | "setValue"
>;

export interface AppFormProps<FValues extends FieldValues>
  extends Omit<UseFormProps<FValues>, "resolver"> {
  schema: z.Schema<FValues>;
  onSubmit: (data: FValues, formHelpers: FormHelpers<FValues>) => void;
  debug?: boolean;
  children?:
    | React.ReactNode
    | ((form: UseFormReturn<FValues>) => React.ReactNode);
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

function AppForm<FValues extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  className,
  debug = false,
  children,
  ...props
}: AppFormProps<FValues>) {
  const form = useForm<FValues>({
    ...props,
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit((data) => onSubmit(data, form))}
        onReset={() => form.reset()}
      >
        {typeof children === "function" ? children(form) : children}
        {debug && <DevTool control={form.control} />}
      </form>
    </Form>
  );
}

export default AppForm;
