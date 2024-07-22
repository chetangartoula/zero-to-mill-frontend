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

export interface OTPFormFieldProps {
  name: string;
  label?: string;
  length: number;
  isDisabled?: string;
}

function OTPFormField({ name, label, length }: OTPFormFieldProps) {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl className="">
            <InputOTP {...field} maxLength={length}>
              {Array.from({ length }).map((_, index) => (
                <InputOTPGroup key={`${name}[${index}]`} {...field}>
                  <InputOTPSlot index={index} />
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
