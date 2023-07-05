'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface NavLinkProps {
  label: string;
  path: string;
}

const NavLink: FC<NavLinkProps> = ({ label, path }) => {
  const pathname = usePathname();
  const isSelected = pathname === path;
  return (
    <Link
      href={path}
      className={clsx('text-2xl text-navyBlue hover:text-liciaMidBlue', {
        'border-b-2 border-navyBlue': isSelected,
      })}
    >
      {label}
    </Link>
  );
};

export default NavLink;
