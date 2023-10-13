import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './component/provider'
import { Header } from './component/header';
import { Footer } from './component/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RumahJo',
  description: 'Cari properti impian anda.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="./favicon.png" type='png' sizes="any" />
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
