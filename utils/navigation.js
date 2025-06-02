// File: src/utils/navigation.js

import { useRouter } from 'next/router';

/**
 * Imperatively navigates the Next.js app to a given path.
 * @param {string} path – e.g. '/reminders', '/calendar?view=day'
 */
export function navigate(path) {
  const router = useRouter();
  router.push(path);
}

/**
 * Navigate to the portal’s search page with the given query.
 * @param {string} query
 */
export function navigateToSearch(query) {
  const router = useRouter();
  router.push(`/search?q=${encodeURIComponent(query)}`);
}
