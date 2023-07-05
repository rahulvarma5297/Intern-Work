import '@/app/globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export const metadata = {
  title: 'Lica - Music Licensing Platform',
  description:
    'Licia is a music licensing platform that helps you clear and secure music rights for your production.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header showLogin={false} showUser={false} />
      {children}
      <Footer />
    </>
  );
}
