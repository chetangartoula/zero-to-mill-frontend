import React from "react";
import { Input, InputProps } from "../ui/input";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { get } from "lodash";

export interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
  formItemProps?: React.ComponentProps<typeof FormItem>;
  formLabelProps?: React.ComponentProps<typeof FormLabel>;
  formControlProps?: React.ComponentProps<typeof FormControl>;
}

function InputFormField({
  name,
  label,
  isDisabled,
  placeholder,
  formControlProps,
  formLabelProps,
  type,
}: InputFieldProps & InputProps) {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel {...formLabelProps}>{label}</FormLabel>
          <FormControl {...formControlProps}>
            <Input
              {...field}
              type={type ?? "text"}
              disabled={isDisabled}
              placeholder={placeholder ?? `Please enter the ${label}`}
              {...(type === "number" && {
                inputMode: "numeric",
                onChange: (e) => {
                  const value = get(e, "target.value", "0");
                  field.onChange(parseInt(value, 10));
                },
              })}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputFormField;
