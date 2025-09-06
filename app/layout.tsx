import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub - a daily tool for creating, saving and organizing notes',
  openGraph: {
    title: "NoteHub",
    description:"NoteHub helps you create, save and organize your notes quickly and easily",
    url:'https://notehub.com/',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 425,
      height:283,
      alt:'NoteHub Preview',
    }]
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
