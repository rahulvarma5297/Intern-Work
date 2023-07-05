import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/../public/images/licia_logo.svg';
import Button from '@/components/Button';
import UserMenu from './UserMenu';
import NavLink from './NavLink';

interface HeaderProps {
  showLogin: boolean;
  showUser: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showLogin, showUser, onLogout }) => {
  return (
    <div className="w-full min-w-full md:h-[4.5rem] flex flex-row justify-between  items-center px-9 border-b-[1px] border-black bg-liciaBlue">
      <Image src={Logo} alt="Licia Logo" priority={true} />
      {showLogin && (
        <Link href="/login">
          <Button label="Login or Sign Up" className="w-60" />
        </Link>
      )}
      {showUser && (
        <div className="flex flex-row items-center space-x-8 relative">
          <NavLink label="Search" path="/search" />
          <NavLink label="Projects" path="/projects" />
          <UserMenu />
        </div>
      )}
    </div>
  );
};

export default Header;
