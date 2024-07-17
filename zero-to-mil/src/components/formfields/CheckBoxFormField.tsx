import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { InputFieldProps } from "./InputFormField";
import { cn } from "@/lib/utils";

function CheckBoxFormField({
  name,
  label,
  className,
  formItemProps,
  formControlProps,
  formLabelProps,
  ...props
}: InputFieldProps & CheckboxProps) {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem
          {...formItemProps}
          className={cn("grid gap-2", formItemProps?.className)}
        >
          <FormControl>
            <Checkbox {...field} {...props} />
          </FormControl>
          <FormLabel {...formLabelProps} className={formLabelProps?.className}>
            {label}
          </FormLabel>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CheckBoxFormField;
