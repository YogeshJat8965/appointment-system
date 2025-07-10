'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'success' | 'danger';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'md';
  isLoading?: boolean;
  children: React.ReactNode;
}

// Function to generate button variant classes - needed for alert-dialog
export const buttonVariants = ({
  variant = 'default',
  size = 'default',
}: {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'success' | 'danger';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'md';
} = {}) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    primary: 'bg-blue-600 text-white hover:bg-blue-600/90',
    success: 'bg-green-600 text-white hover:bg-green-600/90',
    danger: 'bg-red-600 text-white hover:bg-red-600/90',
  };
  
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
    md: 'h-10 px-4 py-2',
  };

  return cn(baseClasses, variantClasses[variant], sizeClasses[size]);
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'default',
  size = 'default',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';