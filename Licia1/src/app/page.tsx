import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImgBusyManager from '@/../public/images/img_busy_manager.svg';
import Image from 'next/image';
import Button from '@/components/Button';
import WhyUseSection from '@/components/WhyUseSection/WhyUseSection';
import HowDoesItWorksSection from '@/components/HowDoesItWorkSection';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-row justify-center flex-wrap bg-liciaBlue">
      <Header showLogin={true} showUser={false} />
      <div className="w-full p-2 md:h-[calc(100vh-4.5rem)] md:p-9 flex flex-col-reverse md:flex-row justify-between">
        <div className="flex-1 w-full md:max-w-[35.625rem]">
          <div className="text-3xl w-full">
            Clear <span className="font-semibold">music rights</span> in a wink.
          </div>
          <div className="text-xl w-full mt-8">
            <p>
              If you need to clear and secure music rights for your production,
              you&apos;re in the best place.
            </p>
            <br />
            <p>
              We create a one-stop app in the cloud to help you managing this
              opaque and complex task.
            </p>
            <br />
            <p>
              Music licensing made easy. Take the pain out of music rights
              clearance.
            </p>
            <br />
            <p className="font-semibold">
              Get the licensing you need quickly and easily.
            </p>
          </div>
          <div className="w-full text-center mt-[6.875rem]">
            <Button label="Get Started" className="w-64 mt-8 text-base" />
          </div>
        </div>
        <Image
          src={ImgBusyManager}
          alt="Busy Manager"
          className="w-6/12 h-4/5"
        />
      </div>
      <HowDoesItWorksSection />
      <WhyUseSection />
      <Footer isExpanded={true} />
    </main>
  );
}
