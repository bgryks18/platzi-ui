import * as React from 'react'

import clsx from 'clsx'

// const inputVariants = cva(
//   'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
//   {
//     variants: {
//       variant: {
//         default: '',
//         error: 'border-destructive ring-red-500',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//     },
//   }
// )
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <textarea
        className={clsx(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      ></textarea>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, Textarea }
