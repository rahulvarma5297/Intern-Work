import Link from 'next/link';
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
} from 'react-icons/fa';

const NotExpanded = () => (
  <div className="flex flex-col gap-6 text-base min-w-[16.875rem] mx-auto">
    <div className="flex gap-5">
      <div className="flex gap-5">
        <Link href="/">About Us</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Terms of Use</Link>
      </div>
      |
      <div className="flex items-center gap-5 text-navyBlue">
        <h3 className="text-black">Follow us on:</h3>
        <Link href="/">
          <FaYoutube />
        </Link>

        <Link href="/">
          <FaTwitter />
        </Link>

        <Link href="/">
          <FaLinkedin />
        </Link>

        <Link href="/">
          <FaFacebook />
        </Link>

        <Link href="/">
          <FaInstagram />
        </Link>
      </div>
    </div>
  </div>
);

export default NotExpanded;
