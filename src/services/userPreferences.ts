// File: product-portal-frontend/src/services/userPreferences.ts
export async function getFollowedTopics(): Promise<string[]> {
  const res = await fetch('/users/me/followed-topics');
  if (!res.ok) throw new Error('Failed to fetch followed topics');
  const { topics } = await res.json() as { topics: string[] };
  return topics;
}

export async function setFollowedTopics(topics: string[]): Promise<void> {
  const res = await fetch('/users/me/followed-topics', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics }),
  });
  if (!res.ok) throw new Error('Failed to update followed topics');
}

export async function getRSSFeeds(): Promise<string[]> {
  const res = await fetch('/users/me/rss-feeds');
  if (!res.ok) throw new Error('Failed to fetch RSS feeds');
  const { feeds } = await res.json() as { feeds: string[] };
  return feeds;
}

export async function setRSSFeeds(feeds: string[]): Promise<void> {
  const res = await fetch('/users/me/rss-feeds', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feeds }),
  });
  if (!res.ok) throw new Error('Failed to update RSS feeds');
}
