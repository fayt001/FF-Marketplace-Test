'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Search, ArrowLeft, CheckCheck, Circle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockConversations, mockMessages } from '@/lib/mockData';
import styles from './chat.module.css';

export default function ChatPage() {
  const { user } = useAuth();
  const [activeConv, setActiveConv] = useState(mockConversations[0].id);
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  if (!user) {
    return (
      <div className={styles.notAuth}>
        <h2>Login untuk mengakses chat</h2>
        <Link href="/login" className={styles.loginBtn}>Masuk</Link>
      </div>
    );
  }

  const activeConvData = mockConversations.find(c => c.id === activeConv);
  const convMessages = messages.filter(m => m.conversationId === activeConv);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      conversationId: activeConv,
      senderId: 'u-me',
      senderName: user.username,
      content: input.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages(prev => [...prev, msg]);
    setInput('');
  };

  const filteredConvs = mockConversations.filter(c =>
    c.accountTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.chatLayout}>
        {/* Conversation list */}
        <aside className={styles.convList}>
          <div className={styles.convHeader}>
            <h2 className={styles.convTitle}>Pesan</h2>
          </div>
          <div className={styles.convSearch}>
            <Search size={15} className={styles.convSearchIcon} />
            <input
              type="text"
              placeholder="Cari percakapan..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.convSearchInput}
            />
          </div>
          <div className={styles.convItems}>
            {filteredConvs.map(conv => {
              const otherParticipant = conv.participants.find(p => p !== 'u-me') || '';
              return (
                <button
                  key={conv.id}
                  className={`${styles.convItem} ${activeConv === conv.id ? styles.convItemActive : ''}`}
                  onClick={() => setActiveConv(conv.id)}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherParticipant}`}
                    alt="Avatar"
                    className={styles.convAvatar}
                  />
                  <div className={styles.convInfo}>
                    <div className={styles.convName}>{otherParticipant}</div>
                    <div className={styles.convAccountLabel}>{conv.accountTitle}</div>
                    <div className={styles.convLastMsg}>{conv.lastMessage}</div>
                  </div>
                  <div className={styles.convMeta}>
                    <span className={styles.convTime}>
                      {new Date(conv.lastMessageAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className={styles.unreadBadge}>{conv.unreadCount}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Chat window */}
        <div className={styles.chatWindow}>
          {/* Chat header */}
          <div className={styles.chatHeader}>
            <button className={styles.backMobile} aria-label="Back">
              <ArrowLeft size={18} />
            </button>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConvData?.participants.find(p => p !== 'u-me')}`}
              alt="Avatar"
              className={styles.chatHeaderAvatar}
            />
            <div>
              <div className={styles.chatHeaderName}>
                {activeConvData?.participants.find(p => p !== 'u-me')}
              </div>
              <div className={styles.chatHeaderSub}>
                {activeConvData?.accountTitle}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {/* Date separator */}
            <div className={styles.dateSep}>1 April 2024</div>

            {convMessages.map(msg => {
              const isMe = msg.senderId === 'u-me';
              return (
                <div key={msg.id} className={`${styles.msgWrapper} ${isMe ? styles.msgWrapperMe : ''}`}>
                  {!isMe && (
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.senderId}`}
                      alt={msg.senderName}
                      className={styles.msgAvatar}
                    />
                  )}
                  <div className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleThem}`}>
                    <p className={styles.bubbleText}>{msg.content}</p>
                    <div className={styles.bubbleMeta}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                      {isMe && (
                        msg.read
                          ? <CheckCheck size={12} className={styles.readIcon} />
                          : <Circle size={10} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className={styles.chatInputBar}>
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              className={styles.chatInput}
              id="chat-input"
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message"
              id="btn-send-message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
