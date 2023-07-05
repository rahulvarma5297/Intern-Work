import Button from '@/components/Button';
import WhyUseCom from './WhyUseCom';

const WhyUseSection = () => {
  return (
    <div className="flex flex-col justify-items-stretch items-center bg-liciaBlue p-16 w-full">
      <p className="text-3xl p-8">Why use LICIA?</p>
      <ul className="justify-items-start pb-4">
        <WhyUseCom
          title="Effortlessly clear music rights"
          subtitle="Search and clear music rights easily."
        />
        <WhyUseCom
          title="Save time & money"
          subtitle="Efficient clearance process that will save your time and money."
        />
        <WhyUseCom
          title="Avoid headaches"
          subtitle="No more headaches of dealing with complicated music licensing process."
        />
        <WhyUseCom
          title="Focus on creating amazing content"
          subtitle="Spend your time being active."
        />
        <WhyUseCom
          title="Every project in one place"
          subtitle="Everything you do in LICIA is available 24/7 in the cloud."
        />
      </ul>
      <Button label="Try LICIA for Free" className="py-21 px-16" />
    </div>
  );
};

export default WhyUseSection;
