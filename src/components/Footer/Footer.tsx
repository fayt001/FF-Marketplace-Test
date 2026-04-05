import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Shield, Zap, MessageSquare, AtSign, Globe, Share } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}><ShoppingBag size={20} /></span>
              <span className={styles.logoText}><span className={styles.logoFF}>FF</span>Market</span>
            </div>
            <p className={styles.tagline}>
              Marketplace jual beli akun Free Fire #1 di Indonesia. Aman, transparan, dan terpercaya dengan sistem escrow.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialBtn} aria-label="Instagram"><AtSign size={16} /></a>
              <a href="#" className={styles.socialBtn} aria-label="YouTube"><Globe size={16} /></a>
              <a href="#" className={styles.socialBtn} aria-label="Twitter"><Share size={16} /></a>
            </div>
          </div>

          {/* Links */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Marketplace</h4>
            <ul className={styles.linkList}>
              <li><Link href="/browse" className={styles.link}>Jelajahi Akun</Link></li>
              <li><Link href="/sell" className={styles.link}>Jual Akun FF</Link></li>
              <li><Link href="/browse?category=cheap" className={styles.link}>Akun Murah</Link></li>
              <li><Link href="/browse?category=ultra" className={styles.link}>Akun Sultan</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.heading}>Bantuan</h4>
            <ul className={styles.linkList}>
              <li><Link href="/how-it-works" className={styles.link}>Cara Kerja</Link></li>
              <li><Link href="/how-it-works#escrow" className={styles.link}>Sistem Escrow</Link></li>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link href="/contact" className={styles.link}>Hubungi Kami</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.heading}>Lainnya</h4>
            <ul className={styles.linkList}>
              <li><Link href="/terms" className={styles.link}>Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className={styles.link}>Kebijakan Privasi</Link></li>
              <li><Link href="/admin" className={styles.link}>Admin Panel</Link></li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className={styles.trustBadges}>
          <div className={styles.trustItem}>
            <Shield size={16} className={styles.trustIcon} />
            <span>Dana Escrow 100% Aman</span>
          </div>
          <div className={styles.trustItem}>
            <Zap size={16} className={styles.trustIcon} />
            <span>Transaksi Cepat & Mudah</span>
          </div>
          <div className={styles.trustItem}>
            <MessageSquare size={16} className={styles.trustIcon} />
            <span>CS Online 24/7</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2024 FFMarket.id — Semua hak dilindungi. Platform tidak terafiliasi dengan Garena Free Fire.</p>
        </div>
      </div>
    </footer>
  );
}
