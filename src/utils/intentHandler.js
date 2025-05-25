// File: src/utils/intentHandler.js

import { create as parseDate } from 'sugar-date';

import {
  getUnreadEmails,
  searchEmails,
  composeEmail,
  replyEmail,
  forwardEmail,
  archiveOldEmails,
  flagEmails,
  markAllRead,
  deleteEmail,
} from '../pages/api/emailAPI';

import {
  createReminder,
  listReminders,
  snoozeReminder,
  cancelReminder,
  createRecurringReminder,
  editReminder,
  deleteReminder,
} from '../pages/api/reminderAPI';

import {
  listEvents,
  createEvent,
  moveEvent,
  deleteEvent,
  findFreeSlots,
  inviteToEvent,
  deleteEventSeries,
} from '../pages/api/calendarAPI';

import {
  getCurrentWeather,
  willItRain,
  getForecast,
  getHumidity,
  getHistoricalHigh,
  setWeatherUnits,
  getUVIndex,
  getSunriseSunset,
} from '../pages/api/weatherAPI';

import {
  listClocks,
  addClock,
  removeClock,
  getTimeInZone,
} from '../pages/api/timeAPI';

import {
  startTimer,
  stopTimer,
  listTimers,
  clearTimers,
} from '../pages/api/timeAPI';

import {
  startStopwatch,
  stopStopwatch,
  resetStopwatch,
  lapStopwatch,
  getStopwatchTime,
} from '../pages/api/stopwatchAPI';

import { calculate } from '../pages/api/calculatorAPI';

import { getQuote, getQuotesByCategory } from '../pages/api/quotesAPI';

import {
  uploadMusic,
  fetchTracks,
  getRecommendations,
} from '../pages/api/musicAPI';

import {
  fetchSocialFeed,
  postToSocial,
  listSocialPlatforms,
} from '../pages/api/socialAPI';

import {
  listRSSFeeds,
  getRSSFeed,
  addRSSFeed,
  removeRSSFeed,
} from '../pages/api/rssAPI';

import { translateText } from '../pages/api/translatorAPI';

import {
  getCryptoPrice,
  alertCryptoThreshold,
  getCryptoHistory,
} from '../pages/api/cryptoAPI';

import { askAI } from '../pages/api/aiAPI';

export default async function handleIntent(t) {
  let m;

  // ─── AI Assistant ────────────────────────────────────────────────────────
  if ((m = t.match(/^ask ai to (.+)$/i))) {
    await askAI(m[1]);
    return;
  }

  // ─── Email ───────────────────────────────────────────────────────────────
  if (/^what(?:'s| is) my unread emails\??$/i.test(t)) {
    await getUnreadEmails();
    return;
  }
  if ((m = t.match(/^search emails for (.+)$/i))) {
    await searchEmails(m[1]);
    return;
  }
  if ((m = t.match(/^send email to (.+?) with subject (.+?) and body (.+)$/i))) {
    await composeEmail({ to: m[1], subject: m[2], body: m[3] });
    return;
  }
  if ((m = t.match(/^reply to email (.+?) with (.+)$/i))) {
    await replyEmail(m[1], m[2]);
    return;
  }
  if ((m = t.match(/^forward email (.+?) to (.+)$/i))) {
    await forwardEmail(m[1], m[2]);
    return;
  }
  if ((m = t.match(/^archive emails older than (\d+) days$/i))) {
    await archiveOldEmails(parseInt(m[1], 10));
    return;
  }
  if ((m = t.match(/^flag emails from (.+)$/i))) {
    await flagEmails(m[1]);
    return;
  }
  if (/^mark all emails as read$/i.test(t)) {
    await markAllRead();
    return;
  }
  if ((m = t.match(/^delete email (.+)$/i))) {
    await deleteEmail(m[1]);
    return;
  }

  // ─── Reminders ────────────────────────────────────────────────────────────
  // NLP fallback via sugar-date: “remind me to <task> <date-time>”
  if (/^remind me to\s+/i.test(t)) {
    const cmd = t.replace(/^remind me to\s*/i, '').trim();
    const dt = parseDate(cmd);
    if (dt instanceof Date && !isNaN(dt)) {
      await createReminder({ text: cmd, datetime: dt.toISOString() });
      return;
    }
  }
  if ((m = t.match(/^remind me to (.+?) (in|after) (\d+)\s*(minutes|hours)$/i))) {
    const [, task,, num, unit] = m;
    const minutes = unit.toLowerCase().startsWith('hour') ? +num * 60 : +num;
    await createReminder({ text: task, offsetMinutes: minutes });
    return;
  }
  if ((m = t.match(/^set a reminder for (.+?) on (.+) at (.+)$/i))) {
    await createReminder({ text: m[1], datetime: `${m[2]} ${m[3]}` });
    return;
  }
  if (/^list (all )?reminders$/i.test(t)) {
    await listReminders();
    return;
  }
  if (/^snooze reminder (.+?) by (\d+)\s*(minutes|hours)$/i.test(t)) {
    const [, id, num, unit] = t.match(/snooze reminder (.+?) by (\d+)\s*(minutes|hours)/i);
    const minutes = unit.toLowerCase().startsWith('hour') ? +num * 60 : +num;
    await snoozeReminder(id, { minutes });
    return;
  }
  if ((m = t.match(/^cancel reminder (.+)$/i))) {
    await cancelReminder(m[1]);
    return;
  }
  if ((m = t.match(/^edit reminder (.+) to (.+)$/i))) {
    await editReminder(m[1], m[2]);
    return;
  }
  if ((m = t.match(/^delete reminder (.+)$/i))) {
    await deleteReminder({ id: m[1] });
    return;
  }
  if ((m = t.match(/^set a recurring reminder to (.+?) every (.+)$/i))) {
    await createRecurringReminder({ text: m[1], interval: m[2] });
    return;
  }

  // ─── Calendar ────────────────────────────────────────────────────────────
  if (/^what(?:'s| is) on my calendar today\??$/i.test(t)) {
    await listEvents({ date: new Date().toISOString().split('T')[0] });
    return;
  }
  if ((m = t.match(/^list events on (.+)$/i))) {
    await listEvents({ date: m[1] });
    return;
  }
  if ((m = t.match(/^add event:?\s*(.+?)\s+(on|at)\s+(.+)$/i))) {
    await createEvent({ title: m[1], datetime: m[3] });
    return;
  }
  if ((m = t.match(/^move event (.+?) to (.+)$/i))) {
    await moveEvent(m[1], m[2]);
    return;
  }
  if ((m = t.match(/^delete event (.+?) on (.+)$/i))) {
    await deleteEvent({ title: m[1], date: m[2] });
    return;
  }
  if ((m = t.match(/^find free slots on (.+)$/i))) {
    await findFreeSlots(m[1]);
    return;
  }
  if ((m = t.match(/^invite (.+) to event (.+)$/i))) {
    await inviteToEvent(m[2], m[1]);
    return;
  }
  if ((m = t.match(/^delete event series (.+)$/i))) {
    await deleteEventSeries(m[1]);
    return;
  }

  // ─── Weather ─────────────────────────────────────────────────────────────
  if (/^what(?:'s| is) the weather(?: in (.+))?\??$/i.test(t)) {
    await getCurrentWeather(RegExp.$1 || '');
    return;
  }
  if ((m = t.match(/^will it rain(?: tomorrow)?(?: in (.+))?$/i))) {
    await willItRain(m[1] || '');
    return;
  }
  if ((m = t.match(/^forecast for (.+)$/i))) {
    await getForecast(m[1]);
    return;
  }
  if ((m = t.match(/^humidity in (.+)$/i))) {
    await getHumidity(m[1]);
    return;
  }
  if ((m = t.match(/^historical high on (.+?)(?: in (.+))?$/i))) {
    await getHistoricalHigh({ date: m[1], location: m[2] });
    return;
  }
  if ((m = t.match(/^set weather units to (celsius|fahrenheit)$/i))) {
    await setWeatherUnits(m[1]);
    return;
  }
  if ((m = t.match(/^what(?:'s| is) the uv index(?: in (.+))?$/i))) {
    await getUVIndex(m[1] || '');
    return;
  }
  if ((m = t.match(/^when is (sunrise|sunset)(?: in (.+))?$/i))) {
    await getSunriseSunset(m[1], m[2] || '');
    return;
  }

  // ─── World Clock ─────────────────────────────────────────────────────────
  if ((m = t.match(/^what(?:'s| is) the time in (.+)$/i))) {
    await getTimeInZone(m[1]);
    return;
  }
  if ((m = t.match(/^add clock for (.+)$/i))) {
    await addClock(m[1]);
    return;
  }
  if ((m = t.match(/^remove clock for (.+)$/i))) {
    await removeClock(m[1]);
    return;
  }
  if (/^list my clocks$/i.test(t)) {
    await listClocks();
    return;
  }

  // ─── Timer ───────────────────────────────────────────────────────────────
  if ((m = t.match(/^start a timer for (\d+)\s*(seconds|minutes|hours)$/i))) {
    const [, num, unit] = m;
    const secs = unit.toLowerCase().startsWith('hour')
      ? +num * 3600
      : unit.toLowerCase().startsWith('minute')
      ? +num * 60
      : +num;
    await startTimer(secs);
    return;
  }
  if (/^stop timer$/i.test(t)) {
    await stopTimer();
    return;
  }
  if (/^list timers$/i.test(t)) {
    await listTimers();
    return;
  }
  if (/^clear timers$/i.test(t)) {
    await clearTimers();
    return;
  }

  // ─── Stopwatch ───────────────────────────────────────────────────────────
  if (/^start stopwatch$/i.test(t)) {
    await startStopwatch();
    return;
  }
  if (/^stop stopwatch$/i.test(t)) {
    await stopStopwatch();
    return;
  }
  if (/^reset stopwatch$/i.test(t)) {
    await resetStopwatch();
    return;
  }
  if (/^lap stopwatch$/i.test(t)) {
    await lapStopwatch();
    return;
  }
  if (/^(what(?:'s| is) )?stopwatch time$/i.test(t)) {
    await getStopwatchTime();
    return;
  }

  // ─── Calculator ──────────────────────────────────────────────────────────
  if ((m = t.match(/^calculate (.+)$/i))) {
    await calculate(m[1]);
    return;
  }

  // ─── Quotes ──────────────────────────────────────────────────────────────
  if (/^give me a quote$/i.test(t)) {
    await getQuote();
    return;
  }
  if ((m = t.match(/^give me a quote about (.+)$/i))) {
    await getQuotesByCategory(m[1]);
    return;
  }

  // ─── Music ───────────────────────────────────────────────────────────────
  if ((m = t.match(/^play track (.+)$/i))) {
    const tracks = await fetchTracks();
    const idx = tracks.findIndex(s => s.title === m[1]);
    if (idx !== -1) uploadMusic(tracks[idx].url);
    return;
  }
  if (/^pause music$/i.test(t)) {
    await pauseMusic();
    return;
  }
  if (/^recommend me music$/i.test(t)) {
    await getRecommendations();
    return;
  }

  // ─── Social ──────────────────────────────────────────────────────────────
  if ((m = t.match(/^fetch social feed(?: from (.+))?$/i))) {
    await fetchSocialFeed(m[1] ? [m[1]] : []);
    return;
  }
  if ((m = t.match(/^post to (.+?) (.+)$/i))) {
    await postToSocial(m[1], m[2]);
    return;
  }
  if (/^list social platforms$/i.test(t)) {
    await listSocialPlatforms();
    return;
  }

  // ─── RSS / News ─────────────────────────────────────────────────────────
  if ((m = t.match(/^get rss feed for (.+)$/i))) {
    await getRSSFeed(m[1]);
    return;
  }
  if (/^list rss feeds$/i.test(t)) {
    await listRSSFeeds();
    return;
  }
  if ((m = t.match(/^add rss feed (.+)$/i))) {
    await addRSSFeed(m[1]);
    return;
  }
  if ((m = t.match(/^remove rss feed (.+)$/i))) {
    await removeRSSFeed(m[1]);
    return;
  }

  // ─── Translator ──────────────────────────────────────────────────────────
  if ((m = t.match(/^translate (.+) to ([a-z]{2})$/i))) {
    await translateText(m[1], m[2]);
    return;
  }
  if ((m = t.match(/^translate (.+) from ([a-z]{2}) to ([a-z]{2})$/i))) {
    await translateText(m[1], m[3], m[2]);
    return;
  }

  // ─── Crypto ─────────────────────────────────────────────────────────────
  if ((m = t.match(/^what(?:'s| is) the price of (.+)$/i))) {
    await getCryptoPrice(m[1]);
    return;
  }
  if ((m = t.match(/^alert me when (.+) (?:goes above|exceeds) (.+)$/i))) {
    await alertCryptoThreshold(m[1], { above: m[2] });
    return;
  }
  if ((m = t.match(/^show crypto history for (.+)$/i))) {
    await getCryptoHistory(m[1]);
    return;
  }

  // ─── Fallback ────────────────────────────────────────────────────────────
  console.warn('Unknown command:', t);
}
