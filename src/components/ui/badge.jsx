import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-purple-500/20 text-purple-200 hover:bg-purple-500/30',
        secondary:
          'border-transparent bg-blue-500/20 text-blue-200 hover:bg-blue-500/30',
        destructive:
          'border-transparent bg-red-500/20 text-red-200 hover:bg-red-500/30',
        outline: 'text-white border-white/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };