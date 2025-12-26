import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

import Navbar from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NextCash by Vladimir',
  description: 'Web application for Finance tracking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
          <Navbar />
          <div className="min-h-100 h-[calc(100vh-160px)]">{children}</div>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
