import clsx from 'clsx';

// Design-system button variants
const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-shadow';

const variantStyles = {
  primary: 'bg-primary text-white hover:shadow-card-hover focus-visible:ring-primary',
  secondary: 'bg-secondary text-white hover:shadow-card-hover focus-visible:ring-secondary',
  outline: 'border border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary',
  ghost: 'text-primary hover:bg-primary/10 focus-visible:ring-primary',
};

export default function Button({
  variant = 'primary',
  className,
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
} 