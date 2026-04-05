'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Menu,
  X,
  Bell,
  MessageSquare,
  Search,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Shield,
  User,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/lib/mockData';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <ShoppingBag size={22} />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoFF}>FF</span>Market
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
            Beranda
          </Link>
          <Link href="/browse" className={`${styles.navLink} ${pathname === '/browse' ? styles.active : ''}`}>
            Jelajahi
          </Link>
          <Link href="/sell" className={`${styles.navLink} ${pathname === '/sell' ? styles.active : ''}`}>
            Jual Akun
          </Link>
          <Link href="/how-it-works" className={`${styles.navLink} ${pathname === '/how-it-works' ? styles.active : ''}`}>
            Cara Kerja
          </Link>
        </div>

        {/* Right Actions */}
        <div className={styles.actions}>
          <Link href="/browse" className={styles.iconBtn} aria-label="Search">
            <Search size={18} />
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/chat" className={styles.iconBtn} aria-label="Chat">
                <MessageSquare size={18} />
                <span className={styles.notifDot} />
              </Link>
              <Link href="/dashboard" className={styles.iconBtn} aria-label="Notifications">
                <Bell size={18} />
              </Link>

              {/* Profile dropdown */}
              <div className={styles.profileWrapper} ref={profileRef}>
                <button
                  className={styles.profileBtn}
                  onClick={() => setProfileOpen(v => !v)}
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                  id="profile-menu-btn"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className={styles.avatar}
                  />
                  <div className={styles.profileInfo}>
                    <span className={styles.profileName}>{user?.username}</span>
                    <span className={styles.profileBalance}>{formatCurrency(user?.balance || 0)}</span>
                  </div>
                  <ChevronDown size={14} className={`${styles.chevron} ${profileOpen ? styles.chevronOpen : ''}`} />
                </button>

                {profileOpen && (
                  <div className={styles.dropdown} role="menu">
                    <div className={styles.dropdownHeader}>
                      <span className={`badge badge-gold`}>{user?.level}</span>
                      {user?.verified && (
                        <span className="badge badge-blue">✓ Terverifikasi</span>
                      )}
                    </div>
                    <div className={styles.dropdownDivider} />
                    <Link href="/dashboard" className={styles.dropdownItem} role="menuitem">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link href="/sell" className={styles.dropdownItem} role="menuitem">
                      <PlusCircle size={15} /> Jual Akun
                    </Link>
                    <Link href="/profile" className={styles.dropdownItem} role="menuitem">
                      <User size={15} /> Profil Saya
                    </Link>
                    {user?.role === 'admin' && (
                      <Link href="/admin" className={styles.dropdownItem} role="menuitem">
                        <Shield size={15} /> Admin Panel
                      </Link>
                    )}
                    <Link href="/settings" className={styles.dropdownItem} role="menuitem">
                      <Settings size={15} /> Pengaturan
                    </Link>
                    <div className={styles.dropdownDivider} />
                    <button
                      className={`${styles.dropdownItem} ${styles.dropdownDanger}`}
                      onClick={logout}
                      role="menuitem"
                    >
                      <LogOut size={15} /> Keluar
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authBtns}>
              <Link href="/login" className={styles.btnOutline}>
                Masuk
              </Link>
              <Link href="/register" className={styles.btnPrimary}>
                Daftar
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileLink}>Beranda</Link>
          <Link href="/browse" className={styles.mobileLink}>Jelajahi</Link>
          <Link href="/sell" className={styles.mobileLink}>Jual Akun</Link>
          <Link href="/how-it-works" className={styles.mobileLink}>Cara Kerja</Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className={styles.mobileLink}>Dashboard</Link>
              <Link href="/chat" className={styles.mobileLink}>Chat</Link>
              <button className={`${styles.mobileLink} ${styles.mobileDanger}`} onClick={logout}>
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.mobileLink}>Masuk</Link>
              <Link href="/register" className={`${styles.mobileLink} ${styles.mobilePrimary}`}>Daftar</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
