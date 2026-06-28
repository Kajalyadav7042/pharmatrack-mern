function Select({
  label,
  name,
  register,
  rules,
  error,
  options,
}) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">
        {label}
      </label>

      <select
        {...register(name, rules)}
        className={`w-full rounded-lg border px-4 py-3 outline-none transition-all ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-600"
        }`}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Select;