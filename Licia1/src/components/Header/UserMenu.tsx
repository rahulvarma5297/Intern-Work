'use client';
import LogoutIcon from '@/../public/images/ic_logout.svg';
import ProfileIcon from '@/../public/images/ic_profile.svg';
import UserIcon from '@/../public/images/ic_user_circle.svg';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, Fragment } from 'react';

interface UserMenuProps {
  onLogout?: () => void;
}

const UserMenu: FC<UserMenuProps> = ({ onLogout }) => (
  <Menu as="div" className="relative inline-block text-right">
    <Menu.Button className="flex flex-row items-center space-x-2">
      <Image src={UserIcon} alt="User" width={32} height={32} />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={`absolute right-0 mt-2 w-40 origin-top-right divide-y 
                  divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none`}
      >
        <Menu.Item>
          {({ active }) => (
            <Link
              href="/profile"
              className={`${
                active ? 'text-licalPureBlue' : 'text-gray-900'
              } group flex w-full items-center px-4 py-3 text-sm justify-evenly cursor-pointer`}
            >
              <Image src={ProfileIcon} alt="Profile" width={24} height={24} />{' '}
              Profile
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              onClick={onLogout}
              className={`${
                active ? 'text-licalPureBlue' : 'text-gray-900'
              } group flex w-full items-center px-4 py-3 justify-evenly text-sm cursor-pointer`}
            >
              <Image src={LogoutIcon} alt="Logout" width={24} height={24} />{' '}
              Logout
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default UserMenu;
