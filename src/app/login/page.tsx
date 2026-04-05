'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShoppingBag, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from '../auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('demo@ffmarket.id');
  const [password, setPassword] = useState('demo123');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email dan password wajib diisi');
      return;
    }
    const ok = await login(email, password);
    if (ok) {
      router.push('/dashboard');
    } else {
      setError('Email atau password salah');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
      </div>

      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoIcon}><ShoppingBag size={22} /></span>
            <span className={styles.logoText}><span className={styles.logoFF}>FF</span>Market</span>
          </Link>
          <h1 className={styles.title}>Selamat Datang!</h1>
          <p className={styles.subtitle}>Masuk ke akunmu untuk mulai trading akun FF</p>
        </div>

        {/* Demo hint */}
        <div className={styles.demoHint}>
          <AlertCircle size={14} />
          <span>Demo: gunakan email & password yang sudah terisi</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {error && (
            <div className={styles.error}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className={styles.input}
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="login-password">Password</label>
              <Link href="/forgot-password" className={styles.forgotLink}>Lupa password?</Link>
            </div>
            <div className={styles.inputWrapper}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type={showPw ? 'text' : 'password'}
                id="login-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            id="btn-login"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingSpinner} />
            ) : 'Masuk'}
          </button>
        </form>

        <div className={styles.divider}><span>atau</span></div>

        <p className={styles.switchText}>
          Belum punya akun?{' '}
          <Link href="/register" className={styles.switchLink}>Daftar Sekarang</Link>
        </p>
      </div>
    </div>
  );
}
