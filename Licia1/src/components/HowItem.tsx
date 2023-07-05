import Image from 'next/image';

interface HowItemProps {
  image: string;
  title: string;
  subTitle: string;
}

const HowItem = ({ image, title, subTitle }: HowItemProps) => {
  return (
    <div className="flex flex-col items-center justify-between p-8">
      <Image
        src={image}
        width={128}
        height={128}
        className="max-w-[128] pb-3"
        alt="list-item"
      />
      <p className="flex flex-col justify-center items-center">
        <span className="text-4xl font-bold text-center text-[#2C4D6D]">
          {title}
        </span>
        {subTitle}
      </p>
    </div>
  );
};

export default HowItem;
