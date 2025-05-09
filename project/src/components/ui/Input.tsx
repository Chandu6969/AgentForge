import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              "w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400",
              error && "border-error-500 focus:border-error-500 focus:ring-error-500",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error ? (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;