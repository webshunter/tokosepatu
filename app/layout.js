
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './component/provider'
import { Header } from './component/header';
import { Footer } from './component/footer';
import AlertContain from './component/provideralert';
import Indexing from './component/indexing';
import Viewers from './component/viewers';
import Analitic from './component/analitics';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RumahJo',
  description: 'Cari properti impian anda.'
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Indexing />
      <link rel="icon" href="/icon.png" type='png' sizes="any" />
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
