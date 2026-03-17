"use client";

interface RadioOption {
  value: string;
  label: string;
  color?: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

const defaultColors: Record<string, string> = {
  "○": "text-success",
  "△": "text-warning",
  "×": "text-danger",
};

export default function RadioGroup({
  name,
  options,
  value,
  onChange,
}: RadioGroupProps) {
  return (
    <div className="flex gap-1.5">
      {options.map((option) => {
        const isSelected = value === option.value;
        const colorClass = option.color || defaultColors[option.label] || "text-foreground";

        return (
          <label
            key={option.value}
            className={`
              flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer
              text-2xl font-bold transition-all duration-200 border-2
              ${
                isSelected
                  ? `${colorClass} border-current bg-white scale-110 shadow-sm`
                  : "text-secondary/30 border-transparent hover:border-border"
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
