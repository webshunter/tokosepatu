
import './globals.css'
import './fontawesome-free-6.5.1-web/css/all.css';
import { Inter } from 'next/font/google'
import Providers from './component/provider'
import { Header } from './component/header';
import { Footer } from './component/footer';
import Indexing from './component/indexing';
import Viewers from './component/viewers';
import Analitic from './component/analitics';

export const metadata = {
  title: 'RumahJo',
  description: 'Cari properti impian anda.',
  metadataBase: new URL('https://rumahjo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/rumahjo.png',
  },
};

const RootLayout = function({ children }) {

  return (
    <html lang="en">
      <Indexing />
      <link rel="icon" href="/rumahjo.png" type='png' sizes="any" />
      <body style={{overflowX:'hidden'}} className="pt-[40px] md:pt-[60px] bg-gray-50">
          <Providers>
            <Header />
              <Viewers>
                  {children}
              </Viewers>
            <Footer />
          </Providers>
          <Analitic/>
      </body>
    </html>
  )
}

export default RootLayout;
