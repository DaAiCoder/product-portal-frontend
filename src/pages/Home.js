// File: src/pages/Home.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard when this page loads
    router.replace('/dashboard');
  }, [router]);

  return null; // Optionally, show a spinner or message here
}
