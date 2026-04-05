'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, ShoppingBag, Star, MessageSquare,
  PlusCircle, Wallet, TrendingUp, Package, Clock,
  CheckCircle, AlertTriangle, ChevronRight, ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockOrders, mockAccounts, formatCurrency, orderStatusLabel, orderStatusColor } from '@/lib/mockData';
import styles from './dashboard.module.css';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'purchases', label: 'Pembelian', icon: ShoppingBag },
  { id: 'listings', label: 'Iklanku', icon: Package },
  { id: 'wallet', label: 'Dompet', icon: Wallet },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const myOrders = mockOrders.filter(o => o.buyerId === 'u-me');
  const myListings = mockAccounts.filter(a => a.sellerId === 'u1'); // demo listings

  if (!user) {
    return (
      <div className={styles.notAuth}>
        <h2>Kamu belum login</h2>
        <Link href="/login" className={styles.loginBtn}>Masuk Sekarang</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* User card */}
            <div className={styles.userCard}>
              <div className={styles.avatarWrapper}>
                <img src={user.avatar} alt={user.username} className={styles.avatar} />
                <span className={styles.onlineDot} />
              </div>
              <div className={styles.userInfo}>
                <div className={styles.username}>{user.username}</div>
                <div className={styles.userMeta}>
                  <span className={`badge badge-gold`}>{user.level}</span>
                  {user.verified && <span className={`badge badge-blue`}>✓ Verified</span>}
                </div>
                <div className={styles.userBalance}>
                  <Wallet size={13} />
                  {formatCurrency(user.balance)}
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className={styles.nav}>
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`${styles.navItem} ${activeTab === tab.id ? styles.navActive : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
              <div className={styles.navDivider} />
              <Link href="/sell" className={styles.navItem}>
                <PlusCircle size={16} />
                Jual Akun Baru
              </Link>
              <Link href="/chat" className={styles.navItem}>
                <MessageSquare size={16} />
                Chat
                <span className={styles.chatBadge}>2</span>
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <main className={styles.main}>
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Overview</h2>

                {/* Stats cards */}
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--primary)' }}>
                      <ShoppingBag size={20} />
                    </div>
                    <div className={styles.statValue}>{myOrders.length}</div>
                    <div className={styles.statLabel}>Total Pembelian</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
                      <CheckCircle size={20} />
                    </div>
                    <div className={styles.statValue}>{myOrders.filter(o => o.status === 'completed').length}</div>
                    <div className={styles.statLabel}>Transaksi Selesai</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)' }}>
                      <Clock size={20} />
                    </div>
                    <div className={styles.statValue}>{myOrders.filter(o => o.status === 'escrow_holding').length}</div>
                    <div className={styles.statLabel}>Sedang Escrow</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent)' }}>
                      <Wallet size={20} />
                    </div>
                    <div className={styles.statValue}>{formatCurrency(user.balance)}</div>
                    <div className={styles.statLabel}>Saldo Dompet</div>
                  </div>
                </div>

                {/* Recent orders */}
                <div className={styles.recentSection}>
                  <div className={styles.recentHeader}>
                    <h3 className={styles.recentTitle}>Transaksi Terbaru</h3>
                    <button className={styles.seeAllBtn} onClick={() => setActiveTab('purchases')}>
                      Lihat Semua <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className={styles.orderList}>
                    {myOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Purchases */}
            {activeTab === 'purchases' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Riwayat Pembelian</h2>
                {myOrders.length > 0 ? (
                  <div className={styles.orderList}>
                    {myOrders.map(order => (
                      <OrderCard key={order.id} order={order} detailed />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <ShoppingBag size={40} />
                    <p>Belum ada pembelian</p>
                    <Link href="/browse" className={styles.browseBtn}>Jelajahi Akun FF</Link>
                  </div>
                )}
              </div>
            )}

            {/* Listings */}
            {activeTab === 'listings' && (
              <div className={styles.section}>
                <div className={styles.recentHeader}>
                  <h2 className={styles.sectionTitle}>Iklan Saya</h2>
                  <Link href="/sell" className={styles.addListingBtn}>
                    <PlusCircle size={15} />
                    Tambah Iklan
                  </Link>
                </div>
                <div className={styles.listingGrid}>
                  {myListings.slice(0, 4).map(acc => (
                    <div key={acc.id} className={styles.listingCard}>
                      <img src={acc.images[0]} alt={acc.title} className={styles.listingImg} />
                      <div className={styles.listingInfo}>
                        <div className={styles.listingTitle}>{acc.title}</div>
                        <div className={styles.listingPrice}>{formatCurrency(acc.price)}</div>
                        <div className={styles.listingStats}>
                          <span><TrendingUp size={11} /> {acc.views} views</span>
                          <span className={`badge ${acc.status === 'available' ? 'badge-green' : 'badge-red'}`}>
                            {acc.status === 'available' ? 'Aktif' : 'Terjual'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wallet */}
            {activeTab === 'wallet' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Dompet</h2>
                <div className={styles.walletCard}>
                  <div className={styles.walletGlow} />
                  <div className={styles.walletLabel}>Saldo Tersedia</div>
                  <div className={styles.walletBalance}>{formatCurrency(user.balance)}</div>
                  <div className={styles.walletBtns}>
                    <button className={styles.walletBtnPrimary}>
                      <ArrowUpRight size={16} />
                      Tarik Dana
                    </button>
                    <button className={styles.walletBtnSecondary}>
                      Top Up
                    </button>
                  </div>
                </div>
                <div className={styles.walletInfo}>
                  <AlertTriangle size={14} className={styles.walletWarn} />
                  <span>Penarikan dana membutuhkan 1-2 hari kerja. Minimal penarikan Rp 50.000.</span>
                </div>

                <div className={styles.recentSection}>
                  <h3 className={styles.recentTitle}>Riwayat Transaksi</h3>
                  <div className={styles.txList}>
                    <div className={styles.txItem}>
                      <div className={styles.txIcon} style={{ color: 'var(--success)' }}>
                        <CheckCircle size={16} />
                      </div>
                      <div className={styles.txInfo}>
                        <div className={styles.txLabel}>Pembayaran selesai - Akun FF Diamond</div>
                        <div className={styles.txDate}>1 Mar 2024</div>
                      </div>
                      <div className={styles.txAmount} style={{ color: 'var(--danger)' }}>
                        -{formatCurrency(950000)}
                      </div>
                    </div>
                    <div className={styles.txItem}>
                      <div className={styles.txIcon} style={{ color: 'var(--warning)' }}>
                        <Clock size={16} />
                      </div>
                      <div className={styles.txInfo}>
                        <div className={styles.txLabel}>Pembayaran escrow - Akun FF Sultan</div>
                        <div className={styles.txDate}>1 Apr 2024</div>
                      </div>
                      <div className={styles.txAmount} style={{ color: 'var(--danger)' }}>
                        -{formatCurrency(3500000)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, detailed }: { order: typeof mockOrders[0], detailed?: boolean }) {
  const colorClass = orderStatusColor[order.status];
  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div className={styles.orderTitle}>{order.accountTitle}</div>
        <span className={`badge badge-${colorClass}`}>
          {orderStatusLabel[order.status]}
        </span>
      </div>
      <div className={styles.orderMeta}>
        <span>#{order.id}</span>
        <span>•</span>
        <span>{new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span>•</span>
        <span style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</span>
      </div>
      <div className={styles.orderFooter}>
        <span className={styles.orderPrice}>{formatCurrency(order.price)}</span>
        {order.status === 'escrow_holding' && detailed && (
          <div className={styles.escrowActions}>
            <Link href={`/chat`} className={styles.escrowBtn}>
              <MessageSquare size={13} />
              Chat Seller
            </Link>
            <button className={styles.confirmBtn}>
              <CheckCircle size={13} />
              Konfirmasi Terima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
