import Footer from '@/components/Footer.js';
import Navbar from '@/components/Navbar.js';
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from '@/components/SessionWrapper';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me A Chai",
  description: "This websote is a crowd funding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/chai.gif' />
      </head>
      <body className='text-white bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
        <SessionWrapper>
          <Navbar />
          <div className="min-h-screen text-white bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
