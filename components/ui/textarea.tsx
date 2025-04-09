// src/components/ui/textarea.tsx
import React from "react";

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
  rows = 4,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`w-full p-3 border border-gray-300 rounded-md resize-none ${className}`}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

export { Textarea };
