'use client';

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

interface TechnologiesInputProps {
  value: string[];
  onChange: (technologies: string[]) => void;
  placeholder?: string;
  label?: string;
  id?: string;
}

export default function TechnologiesInput({ 
  value, 
  onChange, 
  placeholder = "React, Node.js, MongoDB (comma separated)",
  label = "Technologies",
  id
}: TechnologiesInputProps) {
  const [inputValue, setInputValue] = useState('');

  // Update input value when value prop changes
  useEffect(() => {
    setInputValue(Array.isArray(value) ? value.join(', ') : '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    
    // Parse technologies from input
    const technologies = newInputValue
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    
    onChange(technologies);
  };

  // Parse current input to show preview
  const previewTechnologies = inputValue
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</Label>
      <input
        id={id}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors outline-none text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        autoComplete="off"
        spellCheck="false"
      />
      {previewTechnologies.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {previewTechnologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
} 