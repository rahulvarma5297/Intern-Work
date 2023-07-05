import { FC, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
}
const Button: FC<
  React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>
> = ({ children, label, className, ...rest }) => (
  <button
    className={twMerge(
      'bg-liciaMidBlue hover:bg-blue-700 text-white p-3 rounded-full navy transition-all',
      className,
    )}
    {...rest}
  >
    {label ?? children}
  </button>
);

export default Button;
