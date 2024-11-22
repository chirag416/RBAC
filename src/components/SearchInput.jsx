import React from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray400 focus:ring2 focus:ring-inset focus:ring-indigo600 sm:text-sm sm:leading-six"
        placeholder={placeholder || "Search..."}
      />
    </div>
  );
}