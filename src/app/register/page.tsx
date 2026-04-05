'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShoppingBag, Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from '../auth.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password || !confirm) {
      setError('Semua field wajib diisi');
      return;
    }
    if (password !== confirm) {
      setError('Password tidak cocok');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    if (!agree) {
      setError('Kamu harus menyetujui syarat & ketentuan');
      return;
    }
    // Mock register = just login
    await login(email, password);
    router.push('/dashboard');
  };

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Lemah', 'Sedang', 'Kuat'];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e'];

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoIcon}><ShoppingBag size={22} /></span>
            <span className={styles.logoText}><span className={styles.logoFF}>FF</span>Market</span>
          </Link>
          <h1 className={styles.title}>Buat Akun Baru</h1>
          <p className={styles.subtitle}>Bergabung dengan ribuan trader akun FF terpercaya</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {error && (
            <div className={styles.error}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-username">Username</label>
            <div className={styles.inputWrapper}>
              <User size={16} className={styles.inputIcon} />
              <input
                type="text"
                id="reg-username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="PlayerGod_FF"
                className={styles.input}
                autoComplete="username"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-email">Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                type="email"
                id="reg-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className={styles.input}
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type={showPw ? 'text' : 'password'}
                id="reg-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 6 karakter"
                className={styles.input}
                autoComplete="new-password"
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPw(v => !v)} aria-label="toggle password">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {password && (
              <div className={styles.strengthBar}>
                <div className={styles.strengthTrack}>
                  <div
                    className={styles.strengthFill}
                    style={{ width: `${(pwStrength / 3) * 100}%`, background: strengthColor[pwStrength] }}
                  />
                </div>
                <span style={{ color: strengthColor[pwStrength] }}>{strengthLabel[pwStrength]}</span>
              </div>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-confirm">Konfirmasi Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type="password"
                id="reg-confirm"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Ulangi password"
                className={styles.input}
                autoComplete="new-password"
              />
              {confirm && password === confirm && (
                <CheckCircle size={16} className={styles.checkIcon} />
              )}
            </div>
          </div>

          <label className={styles.checkLabel} htmlFor="agree">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
              className={styles.checkbox}
            />
            <span>
              Saya setuju dengan{' '}
              <Link href="/terms" className={styles.switchLink}>Syarat & Ketentuan</Link>
              {' '}dan{' '}
              <Link href="/privacy" className={styles.switchLink}>Kebijakan Privasi</Link>
            </span>
          </label>

          <button
            type="submit"
            className={styles.submitBtn}
            id="btn-register"
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.loadingSpinner} /> : 'Buat Akun'}
          </button>
        </form>

        <p className={styles.switchText}>
          Sudah punya akun?{' '}
          <Link href="/login" className={styles.switchLink}>Masuk Sekarang</Link>
        </p>
      </div>
    </div>
  );
}
