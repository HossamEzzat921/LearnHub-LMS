
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TextareaProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  placeholder: string;
  error?: string;
};

const Textarea = <TFieldValue extends FieldValues>({
  label,

  register,
  name,
  placeholder,
  error,
}: TextareaProps<TFieldValue>) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-dark text-sm font-medium leading-3.5 mb-2"
      >
        {label}
      </label>
      <textarea
        id={name}
        {...register(name)}
        placeholder={placeholder}
        rows={6}
     
        className="w-full px-4 py-3 bg-cream rounded-xl border border-light-gray focus:border-teal focus:ring-1 focus:ring-teal outline-none resize-none"
      />
      <p className="text-red-400">{error}</p>
    </div>
  );
};

export default Textarea;
