import Image from 'next/image';

interface WhyUseComProps {
  title: string;
  subtitle: string;
}

const WhyUseCom = ({ title, subtitle }: WhyUseComProps) => {
  return (
    <li className="flex flex-row p-3">
      <Image
        src="./images/checkmark.svg"
        width={20}
        height={20}
        alt="list-item"
      />
      <p className="text-xl pl-4">
        <span className="text-2xl">{title}: </span>
        {subtitle}
      </p>
    </li>
  );
};

export default WhyUseCom;
