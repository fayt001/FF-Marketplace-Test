'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Star, Shield, Eye, Heart, Share2, Trophy,
  User, CheckCircle, MessageSquare, ShoppingCart, Zap,
  ChevronLeft, ChevronRight, Sword
} from 'lucide-react';
import { mockAccounts, mockReviews, formatCurrency, rankColors, rankGlows } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import styles from './product.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const account = mockAccounts.find(a => a.id === params.id);
  if (!account) {
    return (
      <div className={styles.notFound}>
        <h2>Akun tidak ditemukan</h2>
        <Link href="/browse">Kembali ke Marketplace</Link>
      </div>
    );
  }

  const reviews = mockReviews.filter(r => r.accountId === account.id);
  const rankColor = rankColors[account.rank] || '#94a3b8';
  const rankGlow = rankGlows[account.rank] || 'rgba(148,163,184,0.4)';

  const handleBuy = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    router.push(`/checkout/${account.id}`);
  };

  const handleChat = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    router.push('/chat');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/browse" className={styles.backBtn}>
            <ArrowLeft size={16} />
            Kembali ke Marketplace
          </Link>
        </div>

        <div className={styles.layout}>
          {/* Left: Images & Details */}
          <div className={styles.left}>
            {/* Image gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImage}>
                <img
                  src={account.images[imgIndex]}
                  alt={account.title}
                  className={styles.mainImg}
                />
                <div
                  className={styles.rankOverlay}
                  style={{ color: rankColor, borderColor: rankColor, boxShadow: `0 0 15px ${rankGlow}` }}
                >
                  <Trophy size={14} />
                  {account.rank}
                </div>
                {account.images.length > 1 && (
                  <>
                    <button
                      className={`${styles.galleryBtn} ${styles.galleryBtnPrev}`}
                      onClick={() => setImgIndex(i => Math.max(0, i - 1))}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      className={`${styles.galleryBtn} ${styles.galleryBtnNext}`}
                      onClick={() => setImgIndex(i => Math.min(account.images.length - 1, i + 1))}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              {account.images.length > 1 && (
                <div className={styles.thumbs}>
                  {account.images.map((img, i) => (
                    <button
                      key={i}
                      className={`${styles.thumb} ${imgIndex === i ? styles.thumbActive : ''}`}
                      onClick={() => setImgIndex(i)}
                    >
                      <img src={img} alt={`Screenshot ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account specs */}
            <div className={styles.specsCard}>
              <h3 className={styles.specsTitle}>Spesifikasi Akun</h3>
              <div className={styles.specsGrid}>
                <div className={styles.spec}>
                  <span className={styles.specLabel}>Level</span>
                  <span className={styles.specValue}>{account.level}</span>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specLabel}>Diamonds</span>
                  <span className={styles.specValue}>{account.diamonds.toLocaleString()}</span>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specLabel}>Total Skins</span>
                  <span className={styles.specValue}>{account.totalSkins}</span>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specLabel}>Emotes</span>
                  <span className={styles.specValue}>{account.emotes}</span>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specLabel}>Server</span>
                  <span className={styles.specValue}>{account.server}</span>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specLabel}>Rank</span>
                  <span className={styles.specValue} style={{ color: rankColor }}>{account.rank}</span>
                </div>
              </div>

              {/* Characters */}
              <div className={styles.specSection}>
                <div className={styles.specSectionTitle}>
                  <User size={14} />
                  Karakter
                </div>
                <div className={styles.tagList}>
                  {account.characters.map(c => (
                    <span key={c} className="badge badge-purple">{c}</span>
                  ))}
                </div>
              </div>

              {/* Gun Skins */}
              <div className={styles.specSection}>
                <div className={styles.specSectionTitle}>
                  <Sword size={14} />
                  Gun Skins Unggulan
                </div>
                <div className={styles.tagList}>
                  {account.gunSkins.map(s => (
                    <span key={s} className="badge badge-gold">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={styles.descCard}>
              <h3 className={styles.specsTitle}>Deskripsi Penjual</h3>
              <p className={styles.descText}>{account.description}</p>
            </div>

            {/* Reviews */}
            <div className={styles.reviewsSection}>
              <h3 className={styles.specsTitle}>
                Ulasan ({reviews.length})
              </h3>
              {reviews.length > 0 ? (
                <div className={styles.reviewsList}>
                  {reviews.map(r => (
                    <div key={r.id} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <img src={r.reviewerAvatar} alt={r.reviewerName} className={styles.reviewAvatar} />
                        <div className={styles.reviewMeta}>
                          <span className={styles.reviewName}>{r.reviewerName}</span>
                          <span className={styles.reviewDate}>
                            {new Date(r.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <div className={styles.reviewRating}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < r.rating ? 'currentColor' : 'none'} className={i < r.rating ? styles.starFilled : styles.starEmpty} />
                          ))}
                        </div>
                      </div>
                      <p className={styles.reviewComment}>{r.comment}</p>
                      <div className={styles.reviewHelpful}>
                        👍 {r.helpful} orang merasa terbantu
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noReviews}>Belum ada ulasan untuk akun ini.</p>
              )}
            </div>
          </div>

          {/* Right: Purchase panel */}
          <div className={styles.right}>
            <div className={styles.purchaseCard}>
              {/* Title */}
              <h1 className={styles.productTitle}>{account.title}</h1>

              {/* Badges */}
              <div className={styles.badges}>
                {account.verified && (
                  <span className="badge badge-blue">
                    <Shield size={10} /> Terverifikasi
                  </span>
                )}
                {account.featured && (
                  <span className="badge badge-gold">
                    <Zap size={10} /> Featured
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className={styles.miniStats}>
                <div className={styles.miniStat}>
                  <Eye size={13} />
                  <span>{account.views.toLocaleString()} dilihat</span>
                </div>
                <div className={styles.miniStat}>
                  <Heart size={13} />
                  <span>{account.likes} suka</span>
                </div>
              </div>

              <div className={styles.priceDivider} />

              {/* Price */}
              {account.originalPrice && (
                <div className={styles.originalPrice}>
                  {formatCurrency(account.originalPrice)}
                </div>
              )}
              <div className={styles.price}>{formatCurrency(account.price)}</div>

              {account.originalPrice && (
                <span className="badge badge-red" style={{ alignSelf: 'flex-start' }}>
                  Hemat {formatCurrency(account.originalPrice - account.price)}
                </span>
              )}

              <div className={styles.priceDivider} />

              {/* Escrow notice */}
              <div className={styles.escrowNotice}>
                <Shield size={16} className={styles.escrowIcon} />
                <div>
                  <div className={styles.escrowTitle}>Dana Dilindungi Escrow</div>
                  <div className={styles.escrowDesc}>Pembayaranmu aman ditahan sistem hingga akun diterima & diverifikasi</div>
                </div>
              </div>

              {/* CTA buttons */}
              <button className={styles.buyBtn} id="btn-buy" onClick={handleBuy}>
                <ShoppingCart size={18} />
                Beli Sekarang
              </button>
              <button className={styles.chatBtn} id="btn-chat-seller" onClick={handleChat}>
                <MessageSquare size={18} />
                Chat Penjual
              </button>
              <button
                className={`${styles.wishlistBtn} ${liked ? styles.wishlistActive : ''}`}
                onClick={() => setLiked(v => !v)}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                {liked ? 'Disimpan' : 'Tambah Wishlist'}
              </button>

              <div className={styles.priceDivider} />

              {/* Payment methods */}
              <div className={styles.paymentSection}>
                <div className={styles.paymentLabel}>Metode Pembayaran</div>
                <div className={styles.paymentMethods}>
                  {['QRIS', 'GoPay', 'OVO', 'DANA', 'ShopeePay'].map(p => (
                    <span key={p} className={styles.paymentTag}>{p}</span>
                  ))}
                </div>
              </div>

              <div className={styles.priceDivider} />

              {/* Share */}
              <button className={styles.shareBtn}>
                <Share2 size={14} />
                Bagikan
              </button>
            </div>

            {/* Seller card */}
            <div className={styles.sellerCard}>
              <div className={styles.sellerHeader}>
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${account.sellerName}`}
                  alt={account.sellerName}
                  className={styles.sellerAvatar}
                />
                <div className={styles.sellerInfo}>
                  <div className={styles.sellerName}>
                    {account.sellerName}
                    {account.verified && <CheckCircle size={14} className={styles.verifiedIcon} />}
                  </div>
                  <div className={styles.sellerMeta}>
                    <Star size={12} fill="currentColor" className={styles.starFilled} />
                    <span>{account.sellerRating}</span>
                    <span className={`badge badge-gold`}>{account.sellerLevel}</span>
                  </div>
                </div>
              </div>
              <Link href={`/seller/${account.sellerId}`} className={styles.viewProfileBtn}>
                Lihat Profil Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
