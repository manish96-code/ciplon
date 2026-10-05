import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Reusable SearchBar component for admin panel and forms.
 * Follows clean, flat aesthetic without heavy shadows or borders.
 *
 * @param {Object} props
 * @param {string} props.value - Current search term
 * @param {function} props.onChange - Event handler for input changes
 * @param {function} [props.onClear] - Optional callback when clear button is clicked
 * @param {string} [props.placeholder='Search...'] - Placeholder text
 * @param {string} [props.className='relative flex-1 w-full'] - Container class
 * @param {string} [props.inputClassName=''] - Custom classes for the input
 * @param {boolean} [props.showClear=true] - Whether to show the clear 'X' button
 * @param {boolean} [props.disabled=false] - Disable the input
 */
export default function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  className = 'relative flex-1 w-full',
  inputClassName = '',
  showClear = true,
  disabled = false,
  ...props
}) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  const hasValue = Boolean(value && String(value).length > 0);

  return (
    <div className={className}>
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full pl-9 ${hasValue && showClear ? 'pr-9' : 'pr-4'} py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none text-slate-800 placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed ${inputClassName}`}
        {...props}
      />
      {hasValue && showClear && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          title="Clear search"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
