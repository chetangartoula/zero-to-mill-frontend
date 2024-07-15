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

export interface InputFieldProps {
  name: string;
  label: string;
  isDisabled?: boolean;
  placeholder?: string;
}

function InputFormField({
  name,
  label,
  isDisabled,
  placeholder,
}: InputFieldProps & InputProps) {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isDisabled}
              placeholder={placeholder ?? `Please enter the ${label}`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputFormField;
