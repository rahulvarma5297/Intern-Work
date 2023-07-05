import Expanded from './Expanded';
import NotExpanded from './NotExpanded';

interface FooterProps {
  isExpanded?: boolean;
}

const Footer = ({ isExpanded }: FooterProps) => (
  <footer className="w-full flex flex-col mt-5 border-t border-gray-100 bg-lightgrayShade">
    <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
      {isExpanded && <Expanded />}
      {!isExpanded && <NotExpanded />}
    </div>

    <div className="relative flex pb-10 justify-center text-gray-500">
      {isExpanded && (
        <div className="border-t border-solid border-grayShade absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5"></div>
      )}
      <p className="text-grayShade text-sm mt-2">
        &copy; Licia 2023. All rights reserved
      </p>
    </div>
  </footer>
);

export default Footer;
