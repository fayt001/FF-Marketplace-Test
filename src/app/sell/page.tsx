'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Plus, X, Info } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './sell.module.css';

const ranks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Grandmaster', 'Heroic'];
const servers = ['Indonesia', 'Global', 'Thailand', 'Vietnam'];
const characters = ['Chrono', 'Alok', 'Skyler', 'Kapella', 'Maro', 'Clu', 'Wukong', 'Rafael', 'Kla', 'Moco', 'Andrew', 'Maxim'];

export default function SellPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    rank: 'Grandmaster',
    level: '',
    diamonds: '',
    totalSkins: '',
    emotes: '',
    server: 'Indonesia',
    characters: [] as string[],
    gunSkins: '',
    acceptTerms: false,
  });
  const [images, setImages] = useState<string[]>([]);

  if (!isAuthenticated) {
    return (
      <div className={styles.notAuth}>
        <h2>Login untuk menjual akun</h2>
        <Link href="/login" className={styles.loginBtn}>Masuk / Daftar</Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const toggleChar = (char: string) => {
    setForm(f => ({
      ...f,
      characters: f.characters.includes(char)
        ? f.characters.filter(c => c !== char)
        : [...f.characters, char],
    }));
  };

  const addDemoImage = () => {
    const seed = Math.random().toString(36).slice(2, 8);
    setImages(prev => [...prev, `https://picsum.photos/seed/${seed}/600/400`]);
  };

  const removeImage = (i: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>Iklan Berhasil Dibuat!</h2>
          <p className={styles.successDesc}>
            Akun <strong>{form.title}</strong> telah disubmit untuk review admin.
            Iklanmu akan aktif dalam 1-2 jam setelah diverifikasi.
          </p>
          <div className={styles.successActions}>
            <Link href="/dashboard?tab=listings" className={styles.dashBtn}>Lihat Iklanku</Link>
            <Link href="/browse" className={styles.browseBtn}>Jelajahi Marketplace</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={16} />
          Kembali
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Jual Akun Free Fire</h1>
          <p className={styles.subtitle}>Listing gratis — komisi hanya 5% saat berhasil terjual</p>
        </div>

        <div className={styles.layout}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Basic info */}
            <div className={styles.formCard}>
              <h3 className={styles.formSection}>Informasi Dasar</h3>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="sell-title">Judul Iklan *</label>
                <input
                  type="text"
                  id="sell-title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Contoh: Akun FF Sultan — Rank Heroic 2500+ Skin"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.twoCol}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="sell-price">Harga (Rp) *</label>
                  <input
                    type="number"
                    id="sell-price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Contoh: 1500000"
                    className={styles.input}
                    required
                    min={50000}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="sell-rank">Rank *</label>
                  <select id="sell-rank" name="rank" value={form.rank} onChange={handleChange} className={styles.select}>
                    {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="sell-desc">Deskripsi *</label>
                <textarea
                  id="sell-desc"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Jelaskan lengkap isi akun: skins, karakter, heroes, event items, dll."
                  className={styles.textarea}
                  required
                  rows={4}
                />
              </div>
            </div>

            {/* Account details */}
            <div className={styles.formCard}>
              <h3 className={styles.formSection}>Detail Akun</h3>
              <div className={styles.fourCol}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="sell-level">Level *</label>
                  <input type="number" id="sell-level" name="level" value={form.level} onChange={handleChange} className={styles.input} placeholder="60" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="sell-diamonds">Diamonds</label>
                  <input type="number" id="sell-diamonds" name="diamonds" value={form.diamonds} onChange={handleChange} className={styles.input} placeholder="5000" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="sell-skins">Total Skins</label>
                  <input type="number" id="sell-skins" name="totalSkins" value={form.totalSkins} onChange={handleChange} className={styles.input} placeholder="500" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="sell-emotes">Emotes</label>
                  <input type="number" id="sell-emotes" name="emotes" value={form.emotes} onChange={handleChange} className={styles.input} placeholder="20" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="sell-server">Server</label>
                <select id="sell-server" name="server" value={form.server} onChange={handleChange} className={styles.select}>
                  {servers.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Karakter yang Dimiliki</label>
                <div className={styles.charGrid}>
                  {characters.map(char => (
                    <button
                      key={char}
                      type="button"
                      className={`${styles.charBtn} ${form.characters.includes(char) ? styles.charBtnActive : ''}`}
                      onClick={() => toggleChar(char)}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="sell-gunskins">Gun Skins Unggulan</label>
                <input
                  type="text"
                  id="sell-gunskins"
                  name="gunSkins"
                  value={form.gunSkins}
                  onChange={handleChange}
                  placeholder="Pisahkan dengan koma: M1887 Incubator, AK Elite, MP40 OB36"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Images */}
            <div className={styles.formCard}>
              <h3 className={styles.formSection}>Foto Screenshot Akun</h3>
              <div className={styles.imageGrid}>
                {images.map((img, i) => (
                  <div key={i} className={styles.imagePreview}>
                    <img src={img} alt={`Screenshot ${i + 1}`} />
                    <button type="button" className={styles.removeImg} onClick={() => removeImage(i)}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button type="button" className={styles.addImgBtn} onClick={addDemoImage}>
                  <Upload size={20} />
                  <span>Tambah Foto</span>
                  <span className={styles.addImgHint}>(Demo: generate otomatis)</span>
                </button>
              </div>
              <div className={styles.imageHint}>
                <Info size={13} />
                Tambahkan minimal 1 screenshot tampilan lobby atau koleksi skins untuk meningkatkan kepercayaan pembeli
              </div>
            </div>

            {/* Terms */}
            <div className={styles.formCard}>
              <label className={styles.checkLabel} htmlFor="sell-terms">
                <input
                  type="checkbox"
                  id="sell-terms"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className={styles.checkbox}
                  required
                />
                <span>
                  Saya menyatakan bahwa akun ini adalah milik saya dan tidak sedang dalam sengketa.
                  Saya setuju dengan <Link href="/terms" className={styles.termLink}>Syarat & Ketentuan</Link> penjualan FFMarket.
                </span>
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} id="btn-submit-listing">
              <Plus size={18} />
              Publikasikan Iklan
            </button>
          </form>

          {/* Tips sidebar */}
          <aside className={styles.tips}>
            <div className={styles.tipCard}>
              <h4 className={styles.tipTitle}>💡 Tips Jual Cepat</h4>
              <ul className={styles.tipList}>
                <li>Tulis judul yang deskriptif dan menarik</li>
                <li>Sertakan screenshot lengkap koleksi skins</li>
                <li>Harga kompetitif = jual lebih cepat</li>
                <li>Sebutkan update terbaru akun</li>
                <li>Respons chat cepat meningkatkan kepercayaan</li>
              </ul>
            </div>
            <div className={styles.tipCard}>
              <h4 className={styles.tipTitle}>🔒 Keamanan Escrow</h4>
              <p className={styles.tipDesc}>
                Dana pembeli aman ditahan sistem. Kamu hanya menerima dana setelah pembeli mengkonfirmasi akun diterima. Tidak ada risiko charge-back!
              </p>
            </div>
            <div className={styles.tipCard}>
              <h4 className={styles.tipTitle}>💰 Biaya Layanan</h4>
              <p className={styles.tipDesc}>
                Listing <strong>GRATIS</strong>. Komisi <strong>5%</strong> dari harga jual hanya dikenakan saat transaksi berhasil.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
