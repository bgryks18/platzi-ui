import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

const buttonVariants = {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border hover:bg-accent bg-slate-300',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'underline-offset-4 hover:underline text-primary',
    },
    size: {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-11 px-8 rounded-md',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, asChild = false, children, loading, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={clsx(
          'flex items-center justify-center rounded-md border border-violet4 bg-violet11 p-2 text-sm text-white hover:bg-violet12 [&.disabled]:hover:bg-violet11 [&:disabled]:opacity-70',
          className,
          { disabled: loading || disabled }
        )}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
