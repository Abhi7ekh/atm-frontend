import clsx from 'clsx';

export default function Card({ className, children, as: Component = 'div', ...props }) {
  return (
    <Component
      className={clsx(
        'rounded-xl bg-white shadow-card hover:shadow-card-hover transition-shadow dark:bg-gray-900',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
} 