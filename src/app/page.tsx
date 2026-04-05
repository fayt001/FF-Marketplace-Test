'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Shield, Zap, Users, Star, TrendingUp,
  ChevronRight, Lock, CheckCircle, Flame, Crown
} from 'lucide-react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { mockAccounts, formatCurrency } from '@/lib/mockData';
import styles from './page.module.css';

const categories = [
  { label: 'Semua', value: 'all' },
  { label: '🔥 Murah', value: 'cheap' },
  { label: '⚡ Mid-Range', value: 'mid' },
  { label: '💎 Premium', value: 'premium' },
  { label: '👑 Ultra Sultan', value: 'ultra' },
];

const stats = [
  { value: '12,500+', label: 'Akun Terjual', icon: TrendingUp },
  { value: '8,900+', label: 'Pembeli Puas', icon: Users },
  { value: '4.9★', label: 'Rating Platform', icon: Star },
  { value: '100%', label: 'Uang Aman', icon: Shield },
];

const howItWorks = [
  {
    step: '01',
    title: 'Pilih & Checkout',
    desc: 'Temukan akun FF impianmu, klik beli, dan selesaikan pembayaran via QRIS/e-Wallet.',
    icon: Zap,
  },
  {
    step: '02',
    title: 'Dana Ditahan Escrow',
    desc: 'Uangmu aman ditahan sistem kami. Penjual tidak bisa kabur — dana hanya cair setelah kamu puas.',
    icon: Lock,
  },
  {
    step: '03',
    title: 'Terima & Konfirmasi',
    desc: 'Penjual kirim data akun via chat. Kamu verifikasi akun, konfirmasi, baru dana dilepas.',
    icon: CheckCircle,
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const featured = mockAccounts.filter(a => a.featured && a.status === 'available');
  const filtered = activeCategory === 'all'
    ? mockAccounts.filter(a => a.status === 'available')
    : mockAccounts.filter(a => a.category === activeCategory && a.status === 'available');

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGlow1} />
          <div className={styles.heroGlow2} />
          <div className={styles.heroGrid} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroLabel}>
            <Flame size={14} />
            <span>Marketplace #1 Akun Free Fire Indonesia</span>
          </div>
          <h1 className={styles.heroTitle}>
            Jual Beli Akun FF
            <span className={`gradient-text ${styles.heroTitleAccent}`}> Sultan</span>
            <br />dengan 100% Aman
          </h1>
          <p className={styles.heroDesc}>
            Platform terpercaya dengan sistem <strong>Escrow</strong> — uangmu aman
            sampai akun diterima. Ratusan akun terverifikasi siap dimainkan!
          </p>
          <div className={styles.heroActions}>
            <Link href="/browse" className={styles.heroCta}>
              Jelajahi Akun <ArrowRight size={18} />
            </Link>
            <Link href="/sell" className={styles.heroCtaSecondary}>
              Jual Akun Saya
            </Link>
          </div>
          <div className={styles.heroTrust}>
            <Shield size={14} className={styles.heroTrustIcon} />
            <span>Dana escrow 100% aman</span>
            <span className={styles.heroDot}>•</span>
            <Zap size={14} className={styles.heroTrustIcon} />
            <span>QRIS & E-Wallet diterima</span>
            <span className={styles.heroDot}>•</span>
            <CheckCircle size={14} className={styles.heroTrustIcon} />
            <span>Akun terverifikasi</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <Icon size={20} />
                  </div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionLabel}>
                <Crown size={14} />
                <span>Pilihan Editor</span>
              </div>
              <h2 className={styles.sectionTitle}>Akun <span className="gradient-text">Sultan</span> Pilihan</h2>
            </div>
            <Link href="/browse?featured=true" className={styles.seeAll}>
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid-products">
            {featured.slice(0, 4).map(acc => (
              <ProductCard key={acc.id} account={acc} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`section ${styles.howSection}`}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
                <Lock size={14} />
                <span>Anti Scam</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Cara Kerja <span className="gradient-text">Escrow</span>
              </h2>
              <p className={styles.howDesc}>
                Sistem keamanan triple-layer yang melindungi pembeli dan penjual
              </p>
            </div>
          </div>
          <div className={styles.howGrid}>
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className={styles.howCard}>
                  <div className={styles.howStep}>{step.step}</div>
                  <div className={styles.howIconWrapper}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.howTitle}>{step.title}</h3>
                  <p className={styles.howText}>{step.desc}</p>
                  {i < howItWorks.length - 1 && (
                    <div className={styles.howArrow}><ChevronRight size={20} /></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionLabel}>
                <Flame size={14} />
                <span>Marketplace</span>
              </div>
              <h2 className={styles.sectionTitle}>Semua <span className="gradient-text">Akun FF</span></h2>
            </div>
            <Link href="/browse" className={styles.seeAll}>
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>

          {/* Category filter */}
          <div className={styles.categoryFilter}>
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`${styles.categoryBtn} ${activeCategory === cat.value ? styles.categoryActive : ''}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid-products">
            {filtered.map(acc => (
              <ProductCard key={acc.id} account={acc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Punya akun FF yang mau dijual?
              </h2>
              <p className={styles.ctaDesc}>
                Listing gratis, bayar hanya saat berhasil jual. Jangkau ribuan pembeli aktif!
              </p>
              <Link href="/sell" className={styles.ctaBtn}>
                Mulai Jual Sekarang <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
