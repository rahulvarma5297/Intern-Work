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

const Expanded = () => (
  <div className="flex-1 w-full flex md:justify-center flex-wrap max-md:mt-10 gap-20 sm:gap-10">
    <div className="flex flex-col gap-6 text-base min-w-[16.875rem]">
      <h3>Contact Us:</h3>
      <div className="flex flex-col gap-5">
        <Link href="/">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-5 text-navyBlue" />
            345 Faulconer Drive, Suite 4 <br />
            Charlottesville, CA, 12345
          </div>
        </Link>

        <Link href="/">
          <div className="flex items-center">
            <FaPhone className="mr-5 text-navyBlue" />
            <span>(123) 456-7890</span>
          </div>
        </Link>
      </div>
    </div>

    <div className="flex flex-col gap-6 text-base min-w-[16.875rem] mt-7 mx-10">
      <div className="flex flex-col gap-5 items-stretch lg:items-center">
        <Link href="/">About Us</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Terms of Use</Link>
      </div>
    </div>

    <div className="flex flex-col gap-6 text-base min-w-[16.875rem] items-stretch lg:items-center">
      <h3>Follow us on:</h3>
      <div className="flex flex-row gap-5 items-stretch lg:justify-center">
        <Link href="/">
          <FaTwitter />
        </Link>

        <Link href="/">
          <FaLinkedin />
        </Link>

        <Link href="/">
          <FaFacebook />
        </Link>
      </div>
      <div className="flex flex-row gap-5 items-stretch lg:justify-center text-navyBlue">
        <Link href="/">
          <FaYoutube />
        </Link>

        <Link href="/">
          <FaInstagram />
        </Link>
      </div>
    </div>
  </div>
);

export default Expanded;
