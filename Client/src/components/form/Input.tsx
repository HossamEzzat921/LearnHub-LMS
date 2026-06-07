import React from "react";
import type { Path, FieldValues, UseFormRegister, FieldError } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  placeholder: string;
  error?: FieldError;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  titleAvailabilityStatus?: string;
  isNumber?: boolean;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  type = "text",
  register,
  name,
  placeholder,
  error,
  titleAvailabilityStatus,
  isNumber,
  onBlur,
}: InputProps<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-dark text-sm font-medium leading-3.5 mb-2"
      >
        {label}
      </label>
      {titleAvailabilityStatus === "checking" && (
        <span className="text-xs text-gray-400">Checking...</span>
      )}
      {titleAvailabilityStatus === "available" && (
        <span className="text-xs text-green-500">Title Available!</span>
      )}
      {titleAvailabilityStatus === "notAvailable" && (
        <span className="text-xs text-red-500">Title Taken!</span>
      )}
      {isNumber ? (
        <input
          {...register(name, { valueAsNumber: true })}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          type={type}
          className="w-full placeholder:text-sm px-4 py-3 bg-cream rounded-xl border border-light-gray focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all"
        />
      ) : (
        <input
          {...register(name)}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          type={type}
          className="w-full placeholder:text-sm px-4 py-3 bg-cream rounded-xl border border-light-gray focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all"
        />
      )}
    
      <p className="text-red-400">{error?.message}</p>
    </div>
  );
};

export default Input;
