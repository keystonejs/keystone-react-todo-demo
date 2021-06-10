import { HTMLAttributes } from 'react';
import classNames from 'classnames';

export function H1({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const classes = classNames('text-2xl my-4', className);
  return (
    <h1 className={classes} {...props}>
      {children}
    </h1>
  );
}
