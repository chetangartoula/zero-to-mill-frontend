import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { cn } from "@/lib/utils";

export interface OTPFormFieldProps {
  name: string;
  label?: string;
  length: number;
  isDisabled?: string;
  fullWidth?: boolean;
}

function OTPFormField({
  name,
  label,
  length,
  fullWidth = false,
}: OTPFormFieldProps) {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className={cn("w-full")}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputOTP
              {...field}
              maxLength={length}
              className={cn("flex gap-4", fullWidth && "w-full")}
            >
              {Array.from({ length }).map((_, index) => (
                <InputOTPGroup
                  key={`${name}[${index}]`}
                  {...field}
                  className={cn("flex-1 gap-4", fullWidth && "w-full")}
                >
                  <InputOTPSlot
                    index={index}
                    className={cn("h-10", fullWidth && "w-full")}
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default OTPFormField;
