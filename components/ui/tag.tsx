import React from 'react';
import { X } from 'lucide-react';

export interface TagProps {
   text: string;
   onRemove: () => void;
}

export default function Tag ({ text, onRemove }: TagProps) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-md bg-accent-light px-3.5 py-2.5">
      <span className="font-semibold text-main">{text}</span>
      <button onClick={onRemove} className="flex items-center justify-center text-main hover:text-opacity-75">
        <X size={16} strokeWidth={3} />
      </button>
    </div>
  );
};