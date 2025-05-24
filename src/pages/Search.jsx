// src/pages/Search.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query  = params.get('query') || '';

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [source,  setSource]  = useState(null);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError('');
    setSummary('');
    setSource(null);

    (async () => {
      // 1) "How many X" handler
      const countMatch = query.match(/^how many (.+?)\?*$/i);
      if (countMatch) {
        const subject = countMatch[1].trim();
        try {
          const propsRes = await fetch(
            `https://en.wikipedia.org/w/api.php?` +
              `action=query&titles=${encodeURIComponent(subject)}` +
              `&prop=pageprops&format=json&origin=*`
          );
          const propsJson = await propsRes.json();
          const pages = propsJson.query?.pages;
          const page  = pages && Object.values(pages)[0];
          const qid   = page?.pageprops?.wikibase_item;
          if (!qid) throw new Error('No Wikidata item');

          const sparql = `
            SELECT (COUNT(?item) AS ?count) WHERE {
              ?item wdt:P31 wd:${qid}.
            }
          `;
          const sparqlRes = await fetch(
            `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparql)}&format=json`
          );
          const sparqlJson = await sparqlRes.json();
          const count = sparqlJson.results.bindings[0]?.count.value;
          if (!count) throw new Error('No count result');

          setSummary(`There are ${count} ${subject}.`);
          setSource({
            name: 'Wikidata',
            url: `https://www.wikidata.org/wiki/${qid}`,
          });
          setLoading(false);
          return;
        } catch (e) {
          console.warn('Count lookup failed', e);
        }
      }

      // 2) "How tall is X" handler
      const heightMatch = query.match(/^how tall is (.+?)\?*$/i);
      if (heightMatch) {
        const subject = heightMatch[1].trim();
        try {
          const propsRes = await fetch(
            `https://en.wikipedia.org/w/api.php?` +
              `action=query&titles=${encodeURIComponent(subject)}` +
              `&prop=pageprops&format=json&origin=*`
          );
          const propsJson = await propsRes.json();
          const pages = propsJson.query?.pages;
          const page  = pages && Object.values(pages)[0];
          const qid   = page?.pageprops?.wikibase_item;
          if (!qid) throw new Error('No Wikidata item');

          const claimsRes = await fetch(
            `https://www.wikidata.org/w/api.php?` +
              `action=wbgetclaims&entity=${qid}` +
              `&property=P2048&format=json&origin=*`
          );
          const claimsJson = await claimsRes.json();
          const claim =
            claimsJson.claims?.P2048?.[0]?.mainsnak?.datavalue?.value;
          if (!claim) throw new Error('No height claim');

          const meters = Math.abs(parseFloat(claim.amount));
          const totalInches = meters * 39.3701;
          const feet = Math.floor(totalInches / 12);
          const inches = Math.round(totalInches - feet * 12);

          setSummary(
            `${subject} is approximately ${meters.toFixed(2)} m (${feet}′${inches}″) tall.`
          );
          setSource({ name: 'Wikidata', url: `https://www.wikidata.org/wiki/${qid}` });
          setLoading(false);
          return;
        } catch (e) {
          console.warn('Height lookup failed', e);
        }
      }

      // 3) "Who won X" handler
      const winMatch = query.match(/^who won (.+?)\?*$/i);
      if (winMatch) {
        const subject = winMatch[1].trim();
        try {
          const propsRes = await fetch(
            `https://en.wikipedia.org/w/api.php?` +
              `action=query&titles=${encodeURIComponent(subject)}` +
              `&prop=pageprops&format=json&origin=*`
          );
          const propsJson = await propsRes.json();
          const pages = propsJson.query?.pages;
          const page  = pages && Object.values(pages)[0];
          const qid   = page?.pageprops?.wikibase_item;
          if (!qid) throw new Error('No Wikidata item');

          const claimsRes = await fetch(
            `https://www.wikidata.org/w/api.php?` +
              `action=wbgetclaims&entity=${qid}` +
              `&property=P1346&format=json&origin=*`
          );
          const claimsJson = await claimsRes.json();
          const winnerClaim =
            claimsJson.claims?.P1346?.[0]?.mainsnak?.datavalue?.value;
          let winnerLabel = '';
          if (winnerClaim?.id) {
            const entRes = await fetch(
              `https://www.wikidata.org/wiki/Special:EntityData/${winnerClaim.id}.json`
            );
            const entJson = await entRes.json();
            const ent = entJson.entities[winnerClaim.id];
            winnerLabel = ent.labels.en.value;
          }
          if (winnerLabel) {
            setSummary(`The winner of ${subject} was ${winnerLabel}.`);
            setSource({ name: 'Wikidata', url: `https://www.wikidata.org/wiki/${qid}` });
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Winner lookup failed', e);
        }
      }

      // 4) Wikipedia→DuckDuckGo fallback
      try {
        const searchRes = await fetch(
          `https://en.wikipedia.org/w/api.php?` +
            `action=query&list=search&srsearch=${encodeURIComponent(query)}` +
            `&format=json&origin=*`
        );
        const searchJson = await searchRes.json();
        const hits = searchJson.query?.search;
        if (hits && hits.length) {
          const title = hits[0].title;
          const sumRes = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
          );
          const sumJson = await sumRes.json();
          if (sumJson.extract) {
            setSummary(sumJson.extract);
            setSource({ name: 'Wikipedia', url: sumJson.content_urls.desktop.page });
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Wikipedia fallback failed', e);
      }

      try {
        const ddgRes = await fetch(
          `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}` +
            `&format=json&no_html=1`
        );
        const ddgJson = await ddgRes.json();
        let text = ddgJson.AbstractText;
        let url  = ddgJson.AbstractURL;
        if ((!text || !url) && Array.isArray(ddgJson.RelatedTopics) && ddgJson.RelatedTopics.length) {
          const first = ddgJson.RelatedTopics[0];
          text = first.Text;
          url  = first.FirstURL;
        }
        if (text) {
          setSummary(text);
          setSource({ name: 'DuckDuckGo', url });
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn('DuckDuckGo fallback failed', e);
      }

      // 5) AI fallback via HF model
      try {
        const aiRes = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: query }),
        });
        const aiJson = await aiRes.json();
        if (aiJson.answer) {
          setSummary(aiJson.answer);
          setSource({ name: 'AI Model', url: null });
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn('AI fallback failed', e);
      }

      // 6) No result
      setSummary('No summary found for that query.');
      setLoading(false);
    })();
  }, [query]);

  if (!query) {
    return (
      <div className="p-6">
        <p>Please enter a search query.</p>
        <Link to="/" className="text-blue-600 hover:underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Results for “{query}”</h1>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">
            <p className="text-gray-800 dark:text-gray-200">{summary}</p>
          </div>
          {source && (
            <a
              href={source.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Source: {source.name}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
