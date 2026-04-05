'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { mockAccounts } from '@/lib/mockData';
import styles from './browse.module.css';

const categories = [
  { label: 'Semua', value: 'all' },
  { label: 'Murah (< 500rb)', value: 'cheap' },
  { label: 'Mid-Range', value: 'mid' },
  { label: 'Premium', value: 'premium' },
  { label: 'Ultra Sultan', value: 'ultra' },
];

const ranks = ['Semua', 'Heroic', 'Grandmaster', 'Platinum', 'Gold', 'Silver', 'Bronze'];
const servers = ['Semua', 'Indonesia', 'Global', 'Thailand', 'Vietnam'];
const sortOptions = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Harga Terendah', value: 'price_asc' },
  { label: 'Harga Tertinggi', value: 'price_desc' },
  { label: 'Rating Seller', value: 'rating' },
  { label: 'Paling Diminati', value: 'likes' },
];

export default function BrowsePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [rank, setRank] = useState('Semua');
  const [server, setServer] = useState('Semua');
  const [sort, setSort] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let accounts = mockAccounts.filter(a => a.status === 'available');

    if (search) {
      const q = search.toLowerCase();
      accounts = accounts.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.rank.toLowerCase().includes(q)
      );
    }

    if (category !== 'all') accounts = accounts.filter(a => a.category === category);
    if (rank !== 'Semua') accounts = accounts.filter(a => a.rank === rank);
    if (server !== 'Semua') accounts = accounts.filter(a => a.server === server);
    if (minPrice) accounts = accounts.filter(a => a.price >= Number(minPrice));
    if (maxPrice) accounts = accounts.filter(a => a.price <= Number(maxPrice));

    switch (sort) {
      case 'price_asc': accounts.sort((a, b) => a.price - b.price); break;
      case 'price_desc': accounts.sort((a, b) => b.price - a.price); break;
      case 'rating': accounts.sort((a, b) => b.sellerRating - a.sellerRating); break;
      case 'likes': accounts.sort((a, b) => b.likes - a.likes); break;
      default: accounts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return accounts;
  }, [search, category, rank, server, sort, minPrice, maxPrice]);

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setRank('Semua');
    setServer('Semua');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
  };

  const hasFilters = search || category !== 'all' || rank !== 'Semua' || server !== 'Semua' || minPrice || maxPrice;

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Jelajahi Akun FF</h1>
            <p className={styles.subtitle}>{filtered.length} akun tersedia</p>
          </div>
        </div>

        {/* Search + Sort bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Cari berdasarkan rank, skin, karakter..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
              id="browse-search"
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className={`${styles.filterToggle} ${filterOpen ? styles.filterActive : ''}`}
            onClick={() => setFilterOpen(v => !v)}
          >
            <SlidersHorizontal size={16} />
            Filter
            {hasFilters && <span className={styles.filterBadge} />}
          </button>

          <div className={styles.sortWrapper}>
            <ChevronDown size={14} className={styles.sortIcon} />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className={styles.sortSelect}
              id="browse-sort"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.layout}>
          {/* Sidebar filters */}
          <aside className={`${styles.sidebar} ${filterOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarHeader}>
              <span>Filter</span>
              {hasFilters && (
                <button className={styles.resetBtn} onClick={resetFilters}>Reset</button>
              )}
            </div>

            {/* Category */}
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>Kategori</div>
              <div className={styles.filterOptions}>
                {categories.map(c => (
                  <button
                    key={c.value}
                    className={`${styles.filterOption} ${category === c.value ? styles.filterOptionActive : ''}`}
                    onClick={() => setCategory(c.value)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rank */}
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>Rank</div>
              <div className={styles.filterOptions}>
                {ranks.map(r => (
                  <button
                    key={r}
                    className={`${styles.filterOption} ${rank === r ? styles.filterOptionActive : ''}`}
                    onClick={() => setRank(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Server */}
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>Server</div>
              <div className={styles.filterOptions}>
                {servers.map(s => (
                  <button
                    key={s}
                    className={`${styles.filterOption} ${server === s ? styles.filterOptionActive : ''}`}
                    onClick={() => setServer(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>Rentang Harga (Rp)</div>
              <div className={styles.priceRange}>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className={styles.priceInput}
                  id="price-min"
                />
                <span className={styles.priceSep}>—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className={styles.priceInput}
                  id="price-max"
                />
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className={styles.products}>
            {filtered.length > 0 ? (
              <div className="grid-products">
                {filtered.map(acc => (
                  <ProductCard key={acc.id} account={acc} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>🔍</div>
                <h3>Tidak ada akun ditemukan</h3>
                <p>Coba ubah filter pencarianmu</p>
                <button className={styles.emptyBtn} onClick={resetFilters}>Reset Filter</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
