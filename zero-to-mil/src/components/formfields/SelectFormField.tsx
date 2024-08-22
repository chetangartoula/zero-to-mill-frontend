import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  isDisabled?: boolean;
}

function SelectFormField({
  name,
  label,
  placeholder,
  options,
  isDisabled = false,
}: SelectFormFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  disabled={isDisabled}
                  onValueChange={onChange}
                  value={value}
                >
                  <SelectTrigger ref={ref}>
                    <SelectValue
                      placeholder={placeholder ?? `Select a ${label}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectFormField;
