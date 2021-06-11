import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

export function Button({
  appearance = 'default',
  size = 'default',
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: 'default' | 'primary';
  size?: 'default' | 'large';
}) {
  const appearanceClasses = {
    default: 'bg-gray-200 hover:bg-gray-300 focus:ring-blue-500 shadow-sm',
    primary:
      'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-sm',
  };
  const sizeClasses = {
    default: 'py-1 px-3',
    large: 'py-2 px-4',
  };
  const classes = classNames(
    appearanceClasses[appearance],
    sizeClasses[size],
    'inline-flex justify-center border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
    className
  );
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export function DeleteButton({
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>) {
  const classes = classNames(
    'w-4 h-4 text-gray-400 hover:text-red-600 focus:text-red-600 mx-2 inline-block',
    className
  );
  return (
    <button className={classes} title="Delete" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
}
