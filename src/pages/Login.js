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

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * scenicImages.length);
      setBackgroundUrl(scenicImages[random]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setMessage('Sending magic link...');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/magic-link`, {
        email,
      });
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
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-image 5s ease-in-out',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          maxWidth: '480px',
          width: '90%',
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>Login/Register</h1>
        <form onSubmit={handleMagicLink}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '1.25rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#0070f3',
              color: 'white',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Login with Email 
          </button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>Or login with</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '0.5rem' }}>
            <button
              onClick={() => handleOAuth('google')}
              style={{ backgroundColor: '#db4437', color: 'white', padding: '1rem 1.5rem', border: 'none', borderRadius: '6px' }}
            >
              Google
            </button>
            <button
              onClick={() => handleOAuth('reddit')}
              style={{ backgroundColor: '#ff5700', color: 'white', padding: '1rem 1.5rem', border: 'none', borderRadius: '6px' }}
            >
              Reddit
            </button>
            <button
              onClick={() => handleOAuth('icloud')}
              style={{ backgroundColor: '#333', color: 'white', padding: '1rem 1.5rem', border: 'none', borderRadius: '6px' }}
            >
              iCloud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


