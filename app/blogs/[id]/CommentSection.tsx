'use client';
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../../../FirebaseConfig';
import { MessageCircle, LogIn, LogOut, CornerDownRight, Send } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  uid: string;
  comment: string;
  createdAt: any;
  parentId?: string;
}

function timeAgo(ts: any): string {
  if (!ts) return '';
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  return (
    <div className={`w-${size} h-${size} rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0`}
      style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)', minWidth: size * 4, minHeight: size * 4 }}>
      {name?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
}

export default function CommentSection({ postId }: { postId: string }) {
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return unsub;
  }, []);

  const fetchComments = async () => {
    try {
      const q = query(collection(db, 'blogs', postId, 'comments'), orderBy('createdAt', 'asc'));
      const snap = await getDocs(q);
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() }) as Comment));
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchComments(); }, [postId]);

  const signIn = async () => {
    try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch {}
  };

  const submit = async (parentId?: string) => {
    const body = parentId ? replyText : text;
    if (!body.trim() || !user || submitting) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'blogs', postId, 'comments'), {
        name: user.displayName || 'Anonymous',
        uid: user.uid,
        comment: body.trim(),
        createdAt: serverTimestamp(),
        ...(parentId ? { parentId } : {}),
      });
      if (parentId) { setReplyText(''); setReplyTo(null); } else setText('');
      await fetchComments();
    } catch {}
    setSubmitting(false);
  };

  const roots = comments.filter(c => !c.parentId);
  const replies = (id: string) => comments.filter(c => c.parentId === id);

  return (
    <div className="rounded-[20px] p-6 sm:p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <h3 className="text-[17px] font-bold flex items-center gap-2.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
          <MessageCircle size={18} style={{ color: '#818CF8' }} />
          Comments <span className="text-[14px] font-normal" style={{ color: 'var(--text-muted)' }}>({comments.length})</span>
        </h3>
        {user ? (
          <button onClick={() => signOut(auth)} className="flex items-center gap-1.5 text-[12.5px] transition-colors"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}>
            <LogOut size={13} /> Sign out
          </button>
        ) : null}
      </div>

      {/* Auth gate / compose */}
      {!user ? (
        <div className="rounded-[14px] p-6 text-center mb-6" style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.14)' }}>
          <p className="text-[14px] mb-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
            Sign in with Google to join the discussion.
          </p>
          <button onClick={signIn}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
            <LogIn size={14} /> Sign in with Google
          </button>
        </div>
      ) : (
        <div className="flex gap-3 mb-8">
          <Avatar name={user.displayName || 'A'} />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Share your thoughts…"
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-[14px] resize-none outline-none transition-all"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; }}
            />
            <div className="flex justify-end mt-2">
              <button onClick={() => submit()} disabled={!text.trim() || submitting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold text-white disabled:opacity-50 transition-all"
                style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
                <Send size={13} /> Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1,2].map(i => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full shimmer flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded shimmer" />
                <div className="h-12 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      ) : roots.length === 0 ? (
        <p className="text-center py-8 text-[14px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
          No comments yet. Be the first!
        </p>
      ) : (
        <div className="space-y-6">
          {roots.map(c => (
            <div key={c.id}>
              {/* Root comment */}
              <div className="flex gap-3">
                <Avatar name={c.name} />
                <div className="flex-1">
                  <div className="rounded-[14px] px-4 py-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{c.name}</span>
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{timeAgo(c.createdAt)}</span>
                    </div>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>{c.comment}</p>
                  </div>
                  {user && (
                    <button onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                      className="flex items-center gap-1 mt-2 text-[12px] transition-colors"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#818CF8'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}>
                      <CornerDownRight size={12} /> Reply
                    </button>
                  )}
                  {/* Reply form */}
                  {replyTo === c.id && (
                    <div className="mt-3 flex gap-2">
                      <textarea
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder="Write a reply…"
                        rows={2}
                        className="flex-1 px-3 py-2.5 rounded-xl text-[13px] resize-none outline-none transition-all"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; }}
                      />
                      <button onClick={() => submit(c.id)} disabled={!replyText.trim() || submitting}
                        className="self-end px-3 py-2.5 rounded-xl text-[12px] font-semibold text-white disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
                        <Send size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Nested replies */}
              {replies(c.id).map(r => (
                <div key={r.id} className="flex gap-3 mt-3 ml-11">
                  <Avatar name={r.name} size={7} />
                  <div className="flex-1 rounded-[14px] px-4 py-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[12.5px] font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{r.name}</span>
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{timeAgo(r.createdAt)}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}