'use client';
import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const Input: FC<React.PropsWithChildren<HTMLAttributes<HTMLInputElement>>> = ({
  className,
  onChange,
  placeholder,
  error,
  ...rest
}) => (
  <>
    <input
      className={twMerge(
        'w-80 h-16 p-8 bg-[#EDEFF2] rounded-full focus:outline-none text-black font-normal',
        className,
      )}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
    {error && <div className="text-red-500 ml-8 mt-1">{error}</div>}
  </>
);
export default Input;
