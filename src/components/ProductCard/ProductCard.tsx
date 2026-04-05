'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, Star, Shield, Zap, Trophy } from 'lucide-react';
import { FFAccount } from '@/types';
import { formatCurrency, rankColors, rankGlows } from '@/lib/mockData';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  account: FFAccount;
}

export default function ProductCard({ account }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(account.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(v => !v);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  const rankColor = rankColors[account.rank] || '#94a3b8';
  const rankGlow = rankGlows[account.rank] || 'rgba(148,163,184,0.4)';
  const discount = account.originalPrice
    ? Math.round((1 - account.price / account.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${account.id}`} className={styles.card} aria-label={account.title}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <img
          src={account.images[0]}
          alt={account.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageOverlay} />

        {/* Badges */}
        <div className={styles.topBadges}>
          {account.featured && (
            <span className={`badge badge-gold ${styles.featuredBadge}`}>
              <Zap size={10} /> Featured
            </span>
          )}
          {account.verified && (
            <span className={`badge badge-blue ${styles.verifiedBadge}`}>
              <Shield size={10} /> Aman
            </span>
          )}
          {discount > 0 && (
            <span className={`badge badge-red`}>-{discount}%</span>
          )}
        </div>

        {/* Like button */}
        <button
          className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
          onClick={handleLike}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
          <span>{likeCount}</span>
        </button>

        {/* Rank badge */}
        <div
          className={styles.rankBadge}
          style={{ color: rankColor, boxShadow: `0 0 10px ${rankGlow}`, borderColor: rankColor }}
        >
          <Trophy size={10} />
          <span>{account.rank}</span>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.title}>{account.title}</h3>

        {/* Stats row */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Level</span>
            <span className={styles.statValue}>{account.level}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statLabel}>Diamonds</span>
            <span className={styles.statValue}>{account.diamonds.toLocaleString()}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statLabel}>Skins</span>
            <span className={styles.statValue}>{account.totalSkins}</span>
          </div>
        </div>

        {/* Seller */}
        <div className={styles.seller}>
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${account.sellerName}`}
            alt={account.sellerName}
            className={styles.sellerAvatar}
          />
          <span className={styles.sellerName}>{account.sellerName}</span>
          <div className={styles.sellerRating}>
            <Star size={11} fill="currentColor" />
            <span>{account.sellerRating}</span>
          </div>
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <div>
            <div className={styles.price}>{formatCurrency(account.price)}</div>
            {account.originalPrice && (
              <div className={styles.originalPrice}>{formatCurrency(account.originalPrice)}</div>
            )}
          </div>
          <div className={styles.views}>
            <Eye size={12} />
            <span>{account.views >= 1000 ? `${(account.views / 1000).toFixed(1)}k` : account.views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
