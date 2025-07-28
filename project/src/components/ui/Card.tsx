import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({
  className,
  variant = 'default',
  padding = 'md',
  children,
  ...props
}: CardProps) => {
  const variants = {
    default: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-lg border border-neutral-100',
    outline: 'bg-transparent border border-neutral-300',
    glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-xl',
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: boolean;
}

const CardHeader = ({
  className,
  separator = false,
  children,
  ...props
}: CardHeaderProps) => {
  return (
    <div
      className={cn(
        'space-y-1.5',
        separator && 'pb-4 border-b border-neutral-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <h3
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = ({ className, children, ...props }: CardDescriptionProps) => {
  return (
    <p
      className={cn('text-sm text-neutral-500', className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div
      className={cn('pt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: boolean;
}

const CardFooter = ({
  className,
  separator = false,
  children,
  ...props
}: CardFooterProps) => {
  return (
    <div
      className={cn(
        'flex items-center pt-4',
        separator && 'border-t border-neutral-200 mt-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };