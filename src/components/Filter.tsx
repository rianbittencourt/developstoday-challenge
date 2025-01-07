import React, { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  options: FilterOption[];
  onChange: (selectedValue: string) => void;
  text: string;
  disabled?: boolean;
}

const Filter: React.FC<FilterProps> = ({
  options,
  onChange,
  text,
  disabled,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="relative inline-block w-full ">
      <select
        value={selectedValue}
        disabled={disabled}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="" className="hidden">
          {text}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
