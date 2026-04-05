import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'FFMarket — Marketplace Jual Beli Akun Free Fire Terpercaya',
  description: 'Marketplace #1 untuk jual beli akun Free Fire di Indonesia. Aman dengan sistem escrow, pembayaran QRIS, GoPay, OVO, Dana. Anti-scam, terverifikasi.',
  keywords: 'jual beli akun free fire, marketplace FF, akun FF murah, akun FF sultan, escrow FF',
  openGraph: {
    title: 'FFMarket — Jual Beli Akun Free Fire Aman',
    description: 'Platform terpercaya jual beli akun Free Fire dengan sistem escrow.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="page-content">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
