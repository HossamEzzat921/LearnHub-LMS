
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type SelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: { value: string; label: string }[];
  error?: string;
};

const Select = <T extends FieldValues>({
  label,
  name,
  register,
  options,
  error,
}: SelectProps<T>) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-dark  text-sm font-medium leading-3.5 mb-2"
      >
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        className="w-full px-5 py-3 bg-cream rounded-xl border border-light-gray focus:border-teal focus:ring-1 focus:ring-teal outline-none"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} >
            {opt.label}
          </option>
        ))}
      </select>
       <p className="text-red-400">{error}</p>
    </div>
  );
};

export default Select;
