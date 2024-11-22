import React from 'react';
import clsx from 'clsx';

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500':
            variant === 'primary',
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500':
            variant === 'secondary',
          'border border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500':
            variant === 'danger',
          'px-2.5 py-1.5 text-xs': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}