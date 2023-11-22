
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './component/provider'
import { Header } from './component/header';
import { Footer } from './component/footer';
import AlertContain from './component/provideralert';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RumahJo',
  description: 'Cari properti impian anda.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/icon.png" type='png' sizes="any" />
      <body style={{overflowX:'hidden'}} className="pt-[40px] md:pt-[60px] bg-gray-50">
        <AlertContain>
          <Providers>
            <Header />
              {children}
            <Footer />
          </Providers>
        </AlertContain>
      </body>
    </html>
  )
}
