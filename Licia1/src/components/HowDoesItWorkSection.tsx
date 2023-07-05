import HowItem from './HowItem';
const HowDoesItWorksSection = () => {
  return (
    <div className="items-center justify-center flex flex-col w-full bg-white">
      <p className="text-3xl p-12">How does it work?</p>
      <div className="flex flex-row">
        <HowItem
          image="/images/music.svg"
          title="Search"
          subTitle="for a music"
        />
        <HowItem
          image="/images/identity.svg"
          title="IDENTIFY"
          subTitle="the right holders"
        />
        <HowItem
          image="/images/create.svg"
          title="CREATE"
          subTitle="your request"
        />
        <HowItem
          image="/images/contact.svg"
          title="CONTACT"
          subTitle="right holders"
        />
        <HowItem
          image="/images/check.svg"
          title="NEGOTIATE"
          subTitle="&get approval"
        />
      </div>
    </div>
  );
};

export default HowDoesItWorksSection;
