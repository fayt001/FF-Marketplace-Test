'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle, QrCode, Smartphone, Clock } from 'lucide-react';
import { mockAccounts, formatCurrency } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import styles from './checkout.module.css';

const paymentMethods = [
  { id: 'qris', label: 'QRIS', desc: 'Scan QR semua e-wallet & bank', icon: QrCode },
  { id: 'gopay', label: 'GoPay', desc: 'Bayar via GoPay', icon: Smartphone },
  { id: 'ovo', label: 'OVO', desc: 'Bayar via OVO', icon: Smartphone },
  { id: 'dana', label: 'DANA', desc: 'Bayar via DANA', icon: Smartphone },
  { id: 'shopepay', label: 'ShopeePay', desc: 'Bayar via ShopeePay', icon: Smartphone },
];

const escrowSteps = [
  { step: 1, label: 'Kamu Bayar', desc: 'Pembayaran dikonfirmasi sistem' },
  { step: 2, label: 'Dana Ditahan', desc: 'Uang aman di escrow FFMarket' },
  { step: 3, label: 'Akun Dikirim', desc: 'Seller kirim data akun via chat' },
  { step: 4, label: 'Kamu Verifikasi', desc: 'Cek akun, klik konfirmasi' },
  { step: 5, label: 'Selesai', desc: 'Dana dilepas ke seller' },
];

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState('qris');
  const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');

  const account = mockAccounts.find(a => a.id === params.id);

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (!account) {
    return (
      <div className={styles.notFound}>
        <h2>Akun tidak ditemukan</h2>
        <Link href="/browse">Kembali</Link>
      </div>
    );
  }

  const serviceFee = Math.round(account.price * 0.03);
  const total = account.price + serviceFee;

  if (step === 'success') {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <CheckCircle size={48} />
          </div>
          <h1 className={styles.successTitle}>Pembayaran Berhasil!</h1>
          <p className={styles.successDesc}>
            Dana sebesar <strong>{formatCurrency(total)}</strong> telah masuk ke escrow.
            Seller akan segera mengirimkan data akun via chat.
          </p>
          <div className={styles.successSteps}>
            {escrowSteps.map((s, i) => (
              <div key={s.step} className={`${styles.escrowStep} ${i <= 1 ? styles.escrowDone : ''}`}>
                <div className={styles.escrowStepNum}>{i <= 1 ? '✓' : s.step}</div>
                <div>
                  <div className={styles.escrowStepLabel}>{s.label}</div>
                  <div className={styles.escrowStepDesc}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.successActions}>
            <Link href="/chat" className={styles.chatBtn}>
              Chat dengan Seller
            </Link>
            <Link href="/dashboard" className={styles.dashBtn}>
              Lihat Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href={`/product/${account.id}`} className={styles.backBtn}>
          <ArrowLeft size={16} />
          Kembali ke Produk
        </Link>

        <div className={styles.layout}>
          {/* Left: Payment form */}
          <div className={styles.left}>
            {step === 'review' && (
              <>
                <div className={styles.stepCard}>
                  <h2 className={styles.stepTitle}>Review Pesananmu</h2>
                  <div className={styles.accountPreview}>
                    <img src={account.images[0]} alt={account.title} className={styles.previewImg} />
                    <div className={styles.previewInfo}>
                      <h3 className={styles.previewTitle}>{account.title}</h3>
                      <div className={styles.previewStats}>
                        <span>Rank: <strong>{account.rank}</strong></span>
                        <span>•</span>
                        <span>Level: <strong>{account.level}</strong></span>
                        <span>•</span>
                        <span>Server: <strong>{account.server}</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.escrowInfo}>
                    <Shield size={18} className={styles.escrowIcon} />
                    <div>
                      <div className={styles.escrowTitle}>Dilindungi Escrow FFMarket</div>
                      <div className={styles.escrowDesc}>
                        Uangmu aman ditahan hingga kamu konfirmasi akun diterima. Seller tidak bisa menarik dana sebelum kamu puas.
                      </div>
                    </div>
                  </div>
                  <button className={styles.nextBtn} onClick={() => setStep('payment')}>
                    Lanjut ke Pembayaran
                  </button>
                </div>
              </>
            )}

            {step === 'payment' && (
              <div className={styles.stepCard}>
                <h2 className={styles.stepTitle}>Pilih Metode Pembayaran</h2>
                <div className={styles.paymentList}>
                  {paymentMethods.map(pm => {
                    const Icon = pm.icon;
                    return (
                      <label
                        key={pm.id}
                        className={`${styles.paymentOption} ${selectedPayment === pm.id ? styles.paymentSelected : ''}`}
                        htmlFor={`payment-${pm.id}`}
                      >
                        <input
                          type="radio"
                          id={`payment-${pm.id}`}
                          name="payment"
                          value={pm.id}
                          checked={selectedPayment === pm.id}
                          onChange={() => setSelectedPayment(pm.id)}
                          className={styles.radioHidden}
                        />
                        <div className={styles.paymentIconWrapper}>
                          <Icon size={20} />
                        </div>
                        <div className={styles.paymentInfo}>
                          <div className={styles.paymentName}>{pm.label}</div>
                          <div className={styles.paymentDesc}>{pm.desc}</div>
                        </div>
                        <div className={`${styles.radioIndicator} ${selectedPayment === pm.id ? styles.radioChecked : ''}`} />
                      </label>
                    );
                  })}
                </div>

                {selectedPayment === 'qris' && (
                  <div className={styles.qrisCard}>
                    <div className={styles.qrisHeader}>
                      <QrCode size={16} />
                      <span>QRIS — Scan untuk Bayar</span>
                    </div>
                    <div className={styles.qrisBox}>
                      <div className={styles.qrisPlaceholder}>
                        <div className={styles.qrisPattern}>
                          {/* Simulated QR pattern */}
                          <div className={styles.qrCorner} />
                          <div className={`${styles.qrCorner} ${styles.qrCornerTR}`} />
                          <div className={`${styles.qrCorner} ${styles.qrCornerBL}`} />
                          <div className={styles.qrCenter} />
                        </div>
                        <div className={styles.qrisLabel}>FFMarket.id</div>
                        <div className={styles.qrisAmount}>{formatCurrency(total)}</div>
                      </div>
                    </div>
                    <div className={styles.qrisTip}>
                      <Clock size={13} />
                      QR Code expired dalam <strong>15:00</strong>
                    </div>
                  </div>
                )}

                <button className={styles.payBtn} id="btn-confirm-payment" onClick={() => setStep('success')}>
                  Konfirmasi Pembayaran
                </button>
                <button className={styles.backPayBtn} onClick={() => setStep('review')}>
                  <ArrowLeft size={14} />
                  Kembali
                </button>
              </div>
            )}
          </div>

          {/* Right: Order summary */}
          <div className={styles.right}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Ringkasan Pesanan</h3>
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Harga Akun</span>
                  <span>{formatCurrency(account.price)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Biaya Layanan (3%)</span>
                  <span>{formatCurrency(serviceFee)}</span>
                </div>
                <div className={styles.divider} />
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className={styles.escrowBadge}>
                <Shield size={14} />
                Dana dilindungi Escrow
              </div>
            </div>

            {/* Escrow flow */}
            <div className={styles.escrowCard}>
              <h4 className={styles.escrowCardTitle}>Alur Transaksi</h4>
              {escrowSteps.map(s => (
                <div key={s.step} className={styles.escrowFlowStep}>
                  <div className={styles.escrowFlowNum}>{s.step}</div>
                  <div>
                    <div className={styles.escrowFlowLabel}>{s.label}</div>
                    <div className={styles.escrowFlowDesc}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
