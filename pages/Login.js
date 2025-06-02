import React, { useState, useEffect } from 'react';
import axios from 'axios';

const scenicImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
];

export default function Login() {
  const [backgroundUrl, setBackgroundUrl] = useState(scenicImages[0]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Rotate background every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * scenicImages.length);
      setBackgroundUrl(scenicImages[random]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Magic Link (connects to backend)
  const handleMagicLink = async (e) => {
    e.preventDefault();
    setMessage('Sending magic link...');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/magic-link`, { email });
      if (res.data && res.data.success) {
        setMessage('Check your email for the login link!');
      } else {
        setMessage('Error: ' + (res.data?.message || 'Could not send link'));
      }
    } catch (err) {
      setMessage('Error sending link.');
      console.error(err);
    }
  };

  // Social OAuth
  const handleOAuth = (provider) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${provider}/login`;
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      <main
        style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '2.5rem 2rem',
          borderRadius: '18px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.16)',
          width: '100%',
          maxWidth: '410px',
          margin: '32px',
          display: 'flex',
          flexDirection: 'column',
        }}
        tabIndex={-1}
      >
        <h1 style={{ marginBottom: '1.25rem', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.02em' }}>Sign in to Gime</h1>
        <form onSubmit={handleMagicLink} style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '1.1rem',
              marginBottom: '1.2rem',
              borderRadius: '7px',
              border: '1px solid #d1d5db',
              fontSize: '1.05rem',
              background: '#fafbfc',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1976f7',
              color: 'white',
              fontWeight: 600,
              fontSize: '1.12rem',
              border: 'none',
              borderRadius: '7px',
              cursor: 'pointer',
              marginBottom: '8px',
            }}
          >
            Login with Email
          </button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center', minHeight: 20, color: '#1976f7' }}>{message}</p>
        <div style={{ margin: '2rem 0 0.2rem 0', textAlign: 'center', color: '#555', fontSize: 14 }}>
          Or sign in with
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', gap: '0.5rem' }}>
          <button
            onClick={() => handleOAuth('google')}
            style={{
              backgroundColor: '#db4437',
              color: 'white',
              flex: 1,
              padding: '0.85rem 0',
              border: 'none',
              borderRadius: '7px',
              fontWeight: 600,
              fontSize: '1.04rem',
            }}
          >
            Google
          </button>
          <button
            onClick={() => handleOAuth('reddit')}
            style={{
              backgroundColor: '#ff5700',
              color: 'white',
              flex: 1,
              padding: '0.85rem 0',
              border: 'none',
              borderRadius: '7px',
              fontWeight: 600,
              fontSize: '1.04rem',
            }}
          >
            Reddit
          </button>
          <button
            onClick={() => handleOAuth('icloud')}
            style={{
              backgroundColor: '#333',
              color: 'white',
              flex: 1,
              padding: '0.85rem 0',
              border: 'none',
              borderRadius: '7px',
              fontWeight: 600,
              fontSize: '1.04rem',
            }}
          >
            iCloud
          </button>
        </div>
        <div style={{ marginTop: '2.2rem', fontSize: 12, textAlign: 'center', color: '#888' }}>
          By signing in, you agree to Gime’s Terms of Service & Privacy Policy.
        </div>
      </main>
    </div>
  );
}
