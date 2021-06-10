import {
  HTMLAttributes,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import classNames from 'classnames';

export function FieldContainer({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const classes = 'my-4 ' + (className || '');
  return (
    <div className={classes}>
      <label {...props}>{children}</label>
    </div>
  );
}

export function FieldLabel({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const classes = 'inline-block w-36 ' + (className || '');
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const classes =
    'mt-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm border-gray-300 rounded-md ' +
    (className || '');
  return <input type="text" className={classes} {...props} />;
}

export function Button({
  appearance = 'default',
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: 'default' | 'primary';
}) {
  const appearanceClasses = {
    default: 'bg-gray-200 hover:bg-gray-300 focus:ring-blue-500 shadow-sm',
    primary:
      'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-sm',
  };
  const classes = classNames(
    appearanceClasses[appearance],
    'inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
    className
  );
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export function Checkbox({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const classes =
    'focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded ' +
    (className || '');
  return <input type="checkbox" className={classes} {...props} />;
}

export function Select({
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  const classes =
    'mt-1 py-1 pl-2 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ' +
    (className || '');
  return (
    <select className={classes} {...props}>
      {children}
    </select>
  );
}
