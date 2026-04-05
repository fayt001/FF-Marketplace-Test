// Types for FF Marketplace

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'buyer' | 'seller' | 'admin';
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  verified: boolean;
  joinedAt: string;
  totalSales: number;
  rating: number;
  reviewCount: number;
  balance: number;
}

export interface FFAccount {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerLevel: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rank: string;
  level: number;
  diamonds: number;
  totalSkins: number;
  gunSkins: string[];
  characters: string[];
  emotes: number;
  server: 'Indonesia' | 'Global' | 'Thailand' | 'Vietnam';
  likes: number;
  views: number;
  status: 'available' | 'sold' | 'pending';
  category: 'cheap' | 'mid' | 'premium' | 'ultra';
  createdAt: string;
  featured: boolean;
  verified: boolean;
}

export interface Order {
  id: string;
  accountId: string;
  accountTitle: string;
  buyerId: string;
  sellerId: string;
  price: number;
  status: 'waiting_payment' | 'payment_confirmed' | 'escrow_holding' | 'account_delivered' | 'buyer_confirming' | 'completed' | 'disputed' | 'cancelled';
  paymentMethod: 'qris' | 'ovo' | 'gopay' | 'dana' | 'shopepay';
  escrowReleaseAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: string;
  accountId: string;
  accountTitle: string;
  unreadCount: number;
}

export interface Review {
  id: string;
  accountId: string;
  orderId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order_update' | 'chat' | 'review' | 'payment' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
