'use client';

import React, { useState } from 'react';
import {
  Shield, LayoutDashboard, Users, ShoppingBag, AlertTriangle,
  TrendingUp, CheckCircle, XCircle, Eye, Search,
  Ban, Star, Settings
} from 'lucide-react';
import { mockUsers, mockAccounts, mockOrders, formatCurrency, orderStatusLabel } from '@/lib/mockData';
import styles from './admin.module.css';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Kelola User', icon: Users },
  { id: 'listings', label: 'Verifikasi Listing', icon: ShoppingBag },
  { id: 'orders', label: 'Semua Order', icon: TrendingUp },
  { id: 'disputes', label: 'Sengketa', icon: AlertTriangle },
];

const adminStats = [
  { label: 'Total User', value: '12,543', change: '+234 minggu ini', color: 'var(--accent)' },
  { label: 'Total Akun Listing', value: '3,891', change: '+89 minggu ini', color: 'var(--primary)' },
  { label: 'Total Transaksi', value: '8,421', change: '+341 minggu ini', color: 'var(--success)' },
  { label: 'Revenue Platform', value: 'Rp 28,4jt', change: '+12% vs minggu lalu', color: 'var(--secondary)' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userSearch, setUserSearch] = useState('');
  const [listingSearch, setListingSearch] = useState('');

  const filteredUsers = mockUsers.filter(u =>
    u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredListings = mockAccounts.filter(a =>
    a.title.toLowerCase().includes(listingSearch.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Shield size={20} />
            </div>
            <div>
              <h1 className={styles.title}>Admin Panel</h1>
              <p className={styles.subtitle}>FFMarket.id — Dashboard Administrator</p>
            </div>
          </div>
          <div className={styles.adminBadge}>
            <Shield size={12} />
            Administrator
          </div>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
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
                  {tab.id === 'disputes' && (
                    <span className={styles.alertBadge}>3</span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Content */}
          <main className={styles.main}>

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Platform Overview</h2>

                <div className={styles.statsGrid}>
                  {adminStats.map(stat => (
                    <div key={stat.label} className={styles.statCard}>
                      <div className={styles.statValue} style={{ color: stat.color }}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                      <div className={styles.statChange}>{stat.change}</div>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className={styles.tableCard}>
                  <div className={styles.tableHeader}>
                    <h3 className={styles.tableTitle}>Transaksi Terbaru</h3>
                  </div>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Akun</th>
                        <th>Buyer</th>
                        <th>Status</th>
                        <th>Nominal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map(order => (
                        <tr key={order.id}>
                          <td className={styles.tdMono}>#{order.id}</td>
                          <td>{order.accountTitle.slice(0, 30)}...</td>
                          <td>{order.buyerId}</td>
                          <td><span className={`badge badge-blue`}>{orderStatusLabel[order.status]}</span></td>
                          <td className={styles.tdPrice}>{formatCurrency(order.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* USERS */}
            {activeTab === 'users' && (
              <div className={styles.section}>
                <div className={styles.sectionRow}>
                  <h2 className={styles.sectionTitle}>Kelola User</h2>
                  <div className={styles.searchBox}>
                    <Search size={14} className={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="Cari user..."
                      value={userSearch}
                      onChange={e => setUserSearch(e.target.value)}
                      className={styles.searchInput}
                      id="admin-user-search"
                    />
                  </div>
                </div>
                <div className={styles.tableCard}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Level</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(u => (
                        <tr key={u.id}>
                          <td>
                            <div className={styles.userCell}>
                              <img src={u.avatar} alt={u.username} className={styles.userCellAvatar} />
                              <div>
                                <div className={styles.userCellName}>{u.username}</div>
                                <div className={styles.userCellEmail}>{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td><span className={`badge badge-purple`}>{u.role}</span></td>
                          <td><span className={`badge badge-gold`}>{u.level}</span></td>
                          <td>
                            <span className={`badge ${u.verified ? 'badge-green' : 'badge-red'}`}>
                              {u.verified ? '✓ Verified' : 'Unverified'}
                            </span>
                          </td>
                          <td>
                            <div className={styles.ratingCell}>
                              <Star size={12} fill="currentColor" style={{ color: 'var(--primary)' }} />
                              {u.rating > 0 ? u.rating : '—'}
                            </div>
                          </td>
                          <td>
                            <div className={styles.actionBtns}>
                              <button className={styles.actionBtn} title="Lihat Profil">
                                <Eye size={13} />
                              </button>
                              <button className={styles.actionBtn} title="Verifikasi">
                                <CheckCircle size={13} />
                              </button>
                              <button className={`${styles.actionBtn} ${styles.actionDanger}`} title="Ban User">
                                <Ban size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* LISTINGS */}
            {activeTab === 'listings' && (
              <div className={styles.section}>
                <div className={styles.sectionRow}>
                  <h2 className={styles.sectionTitle}>Verifikasi Listing</h2>
                  <div className={styles.searchBox}>
                    <Search size={14} className={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="Cari listing..."
                      value={listingSearch}
                      onChange={e => setListingSearch(e.target.value)}
                      className={styles.searchInput}
                      id="admin-listing-search"
                    />
                  </div>
                </div>
                <div className={styles.tableCard}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Akun</th>
                        <th>Seller</th>
                        <th>Harga</th>
                        <th>Rank</th>
                        <th>Status Verify</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredListings.map(acc => (
                        <tr key={acc.id}>
                          <td>
                            <div className={styles.listingCell}>
                              <img src={acc.images[0]} alt={acc.title} className={styles.listingThumb} />
                              <span className={styles.listingTitle}>{acc.title.slice(0, 30)}...</span>
                            </div>
                          </td>
                          <td>{acc.sellerName}</td>
                          <td className={styles.tdPrice}>{formatCurrency(acc.price)}</td>
                          <td><span className="badge badge-gold">{acc.rank}</span></td>
                          <td>
                            <span className={`badge ${acc.verified ? 'badge-green' : 'badge-red'}`}>
                              {acc.verified ? '✓ Diverifikasi' : '⏳ Pending'}
                            </span>
                          </td>
                          <td>
                            <div className={styles.actionBtns}>
                              <button className={styles.actionBtn} title="Lihat Detail">
                                <Eye size={13} />
                              </button>
                              <button className={styles.actionBtnSuccess} title="Approve">
                                <CheckCircle size={13} />
                              </button>
                              <button className={`${styles.actionBtn} ${styles.actionDanger}`} title="Tolak">
                                <XCircle size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {activeTab === 'orders' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Semua Order</h2>
                <div className={styles.tableCard}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Akun</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map(order => (
                        <tr key={order.id}>
                          <td className={styles.tdMono}>#{order.id}</td>
                          <td>{order.accountTitle.slice(0, 20)}...</td>
                          <td>{order.buyerId}</td>
                          <td>{order.sellerId}</td>
                          <td className={styles.tdMono} style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</td>
                          <td><span className="badge badge-blue">{orderStatusLabel[order.status]}</span></td>
                          <td className={styles.tdPrice}>{formatCurrency(order.price)}</td>
                          <td>
                            <button className={styles.actionBtn}>
                              <Settings size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* DISPUTES */}
            {activeTab === 'disputes' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Sengketa Aktif</h2>
                <div className={styles.disputeList}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className={styles.disputeCard}>
                      <div className={styles.disputeHeader}>
                        <div className={styles.disputeIcon}>
                          <AlertTriangle size={18} />
                        </div>
                        <div>
                          <div className={styles.disputeTitle}>Sengketa #{i}001 — Akun tidak sesuai deskripsi</div>
                          <div className={styles.disputeMeta}>Dilaporkan oleh: FFHunter99 • 2 Apr 2024</div>
                        </div>
                        <span className="badge badge-red">Aktif</span>
                      </div>
                      <p className={styles.disputeDesc}>
                        Pembeli melaporkan bahwa akun yang diterima tidak sesuai dengan deskripsi yang tertera.
                        Rank diklaim Grandmaster namun saat login hanya Gold.
                      </p>
                      <div className={styles.disputeActions}>
                        <button className={styles.disputeBtnBuyer}>Kembalikan ke Buyer</button>
                        <button className={styles.disputeBtnSeller}>Lepas ke Seller</button>
                        <button className={styles.disputeBtnInvestigate}>Investigasi</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
