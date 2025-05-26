// File: src/utils   /intentHandler.js

// 📧 Email
import {
  getUnreadEmails,
  searchEmails,
  sendEmail,
  replyToEmail,
  forwardEmail,
  archiveOldEmails,
  flagEmails,
  markAllRead,
  deleteEmail,
  listFlaggedEmails,
} from './emailClient';

// ⏰ Reminders
import {
  createReminder,
  listReminders,
  snoozeReminder,
  cancelReminder,
  editReminder,
  deleteReminder as deleteReminderById,
  setRecurringReminder,
  listTodayReminders,
} from './reminderClient';

// 📅 Calendar
import {
  getEventsForDate,
  addEvent,
  moveEvent,
  deleteEvent,
  findFreeSlots,
  inviteToEvent,
  deleteRecurringEvent,
  showWeekEvents,
  getNextEvent,
} from './calendarClient';

// ☁️ Weather
import {
  getWeather,
  getWeatherByCity,
  willItRain,
  getForecastWeekend,
  getHumidity,
  getHistoricalHigh,
  setWeatherUnits,
  getUVIndex,
  getSunrise,
  getSunset,
} from './weatherClient';

// 🕰 World Clock
import {
  getTimeInZone,
  addClock,
  removeClock,
  listClocks,
  getTimeDifference,
} from './clockClient';

// ⏱ Timer
import {
  startTimer,
  stopTimer,
  listTimers,
  clearTimers,
  getTimerRemaining,
} from './timerClient';

// ➗ Calculator
import { calculateExpression } from './calculatorClient';

// 💬 Quotes
import { getQuote } from './quotesClient';

// 🎵 Music
import {
  fetchTracks,
  playTrack,
  uploadMusic,
  recommendMusic,
  fetchNewReleases,
} from './musicClient';

// 📣 Social
import { fetchSocialFeed, postToSocial, listSocialPlatforms } from './socialClient';

// 📰 RSS/News
import {
  listRSSFeeds,
  getRSSFeed,
  addRSSFeed,
  removeRSSFeed,
  listNewsSources,
} from './rssClient';

// 🌐 Translator
import { translateText } from './translatorClient';

// 💱 Crypto
import {
  getCryptoPrice,
  setCryptoAlert,
  getCryptoHistory,
} from './cryptoClient';

// 🤖 AI Assistant
import { askAI } from './aiClient';

export async function handleCommand(input) {
  const cmd = input.trim();

  // — EMAIL INTENTS —
  if (/^show (?:my )?unread emails$/i.test(cmd)) {
    return getUnreadEmails();
  }
  if (/^search emails? for (.+)$/i.test(cmd)) {
    const [, query] = cmd.match(/^search emails? for (.+)$/i);
    return searchEmails(query);
  }
  if (/^send email to ([^ ]+) with subject (.+) and body (.+)$/i.test(cmd)) {
    const [, to, subject, body] = cmd.match(
      /^send email to ([^ ]+) with subject (.+) and body (.+)$/i
    );
    return sendEmail(to, subject, body);
  }
  if (/^reply to email (\d+) with (.+)$/i.test(cmd)) {
    const [, id, body] = cmd.match(/^reply to email (\d+) with (.+)$/i);
    return replyToEmail(id, body);
  }
  if (/^forward email (\d+) to ([^ ]+)$/i.test(cmd)) {
    const [, id, to] = cmd.match(/^forward email (\d+) to ([^ ]+)$/i);
    return forwardEmail(id, to);
  }
  if (/^archive emails older than (\d+) days$/i.test(cmd)) {
    const [, days] = cmd.match(/^archive emails older than (\d+) days$/i);
    return archiveOldEmails(Number(days));
  }
  if (/^flag emails? from ([^ ]+)$/i.test(cmd)) {
    const [, from] = cmd.match(/^flag emails? from ([^ ]+)$/i);
    return flagEmails(from);
  }
  if (/^mark all emails as read$/i.test(cmd)) {
    return markAllRead();
  }
  if (/^delete email (\d+)$/i.test(cmd)) {
    const [, id] = cmd.match(/^delete email (\d+)$/i);
    return deleteEmail(id);
  }
  if (/^list (?:my )?flagged emails$/i.test(cmd)) {
    return listFlaggedEmails();
  }

  // — REMINDER INTENTS —
  if (/^remind me to (.+) tomorrow at ([\d: ]+(?:am|pm)?)$/i.test(cmd)) {
    const [, text, time] = cmd.match(/^remind me to (.+) tomorrow at ([\d: ]+(?:am|pm)?)$/i);
    return createReminder(text, { date: 'tomorrow', time });
  }
  if (/^remind me to (.+) in (\d+) hours$/i.test(cmd)) {
    const [, text, hours] = cmd.match(/^remind me to (.+) in (\d+) hours$/i);
    return createReminder(text, { hours: Number(hours) });
  }
  if (/^set a reminder for (.+) on (.+) at ([\d: ]+(?:am|pm)?)$/i.test(cmd)) {
    const [, text, date, time] = cmd.match(
      /^set a reminder for (.+) on (.+) at ([\d: ]+(?:am|pm)?)$/i
    );
    return createReminder(text, { date, time });
  }
  if (/^list all (?:my )?reminders$/i.test(cmd)) {
    return listReminders();
  }
  if (/^snooze reminder (\d+) by (\d+) minutes$/i.test(cmd)) {
    const [, id, mins] = cmd.match(/^snooze reminder (\d+) by (\d+) minutes$/i);
    return snoozeReminder(id, Number(mins));
  }
  if (/^cancel reminder (\d+)$/i.test(cmd)) {
    const [, id] = cmd.match(/^cancel reminder (\d+)$/i);
    return cancelReminder(id);
  }
  if (/^edit reminder (\d+) to (.+)$/i.test(cmd)) {
    const [, id, newText] = cmd.match(/^edit reminder (\d+) to (.+)$/i);
    return editReminder(id, newText);
  }
  if (/^delete reminder (\d+)$/i.test(cmd)) {
    const [, id] = cmd.match(/^delete reminder (\d+)$/i);
    return deleteReminderById(id);
  }
  if (/^set a recurring reminder to (.+) every (.+)$/i.test(cmd)) {
    const [, text, freq] = cmd.match(/^set a recurring reminder to (.+) every (.+)$/i);
    return setRecurringReminder(text, freq);
  }
  if (/^show reminders for today$/i.test(cmd)) {
    return listTodayReminders();
  }

  // — CALENDAR INTENTS —
  if (/^what'?s on my calendar today\??$/i.test(cmd)) {
    return getEventsForDate('today');
  }
  if (/^list events on (.+)$/i.test(cmd)) {
    const [, date] = cmd.match(/^list events on (.+)$/i);
    return getEventsForDate(date);
  }
  if (/^add event (.+) on (.+) at ([\d: ]+(?:am|pm)?)$/i.test(cmd)) {
    const [, title, date, time] = cmd.match(
      /^add event (.+) on (.+) at ([\d: ]+(?:am|pm)?)$/i
    );
    return addEvent({ title, date, time });
  }
  if (/^move event (.+) to (.+) at ([\d: ]+(?:am|pm)?)$/i.test(cmd)) {
    const [, title, date, time] = cmd.match(
      /^move event (.+) to (.+) at ([\d: ]+(?:am|pm)?)$/i
    );
    return moveEvent(title, { date, time });
  }
  if (/^delete event (.+)$/i.test(cmd)) {
    const [, title] = cmd.match(/^delete event (.+)$/i);
    return deleteEvent(title);
  }
  if (/^find free slots on (.+)$/i.test(cmd)) {
    const [, date] = cmd.match(/^find free slots on (.+)$/i);
    return findFreeSlots(date);
  }
  if (/^invite ([^ ]+) to event (.+)$/i.test(cmd)) {
    const [, email, title] = cmd.match(/^invite ([^ ]+) to event (.+)$/i);
    return inviteToEvent(title, email);
  }
  if (/^delete event series (.+)$/i.test(cmd)) {
    const [, title] = cmd.match(/^delete event series (.+)$/i);
    return deleteRecurringEvent(title);
  }
  if (/^show me this week'?s events$/i.test(cmd)) {
    return showWeekEvents();
  }
  if (/^what'?s my next event\??$/i.test(cmd)) {
    return getNextEvent();
  }

  // — WEATHER INTENTS —
  if (/^what'?s the weather\??$/i.test(cmd)) {
    return getWeather();
  }
  if (/^what'?s the weather in (.+)\??$/i.test(cmd)) {
    const [, city] = cmd.match(/^what'?s the weather in (.+)\??$/i);
    return getWeatherByCity(city);
  }
  if (/^will it rain tomorrow in (.+)\??$/i.test(cmd)) {
    const [, city] = cmd.match(/^will it rain tomorrow in (.+)\??$/i);
    return willItRain(city);
  }
  if (/^forecast for (.+) this weekend$/i.test(cmd)) {
    const [, city] = cmd.match(/^forecast for (.+) this weekend$/i);
    return getForecastWeekend(city);
  }
  if (/^what'?s the humidity in (.+)\??$/i.test(cmd)) {
    const [, city] = cmd.match(/^what'?s the humidity in (.+)\??$/i);
    return getHumidity(city);
  }
  if (/^historical high on (.+) in (.+)$/i.test(cmd)) {
    const [, date, city] = cmd.match(/^historical high on (.+) in (.+)$/i);
    return getHistoricalHigh(date, city);
  }
  if (/^set weather units to (celsius|fahrenheit)$/i.test(cmd)) {
    const [, unit] = cmd.match(/^set weather units to (celsius|fahrenheit)$/i);
    return setWeatherUnits(unit);
  }
  if (/^what'?s the uv index in (.+)\??$/i.test(cmd)) {
    const [, city] = cmd.match(/^what'?s the uv index in (.+)\??$/i);
    return getUVIndex(city);
  }
  if (/^when is sunrise in (.+) tomorrow\??$/i.test(cmd)) {
    const [, city] = cmd.match(/^when is sunrise in (.+) tomorrow\??$/i);
    return getSunrise(city);
  }
  if (/^when is sunset in (.+)\??$/i.test(cmd)) {
    const [, city] = cmd.match(/^when is sunset in (.+)\??$/i);
    return getSunset(city);
  }

  // — WORLD CLOCK INTENTS —
  if (/^what('?s| is) the time in (.+)\??$/i.test(cmd)) {
    const [, , zone] = cmd.match(/^what('?s| is) the time in (.+)\??$/i);
    return getTimeInZone(zone);
  }
  if (/^add clock for (.+)$/i.test(cmd)) {
    const [, zone] = cmd.match(/^add clock for (.+)$/i);
    return addClock(zone);
  }
  if (/^remove clock for (.+)$/i.test(cmd)) {
    const [, zone] = cmd.match(/^remove clock for (.+)$/i);
    return removeClock(zone);
  }
  if (/^list (?:my )?clocks$/i.test(cmd)) {
    return listClocks();
  }
  if (/^what time is it in gmt\+?([-\d]+)\??$/i.test(cmd)) {
    const [, offset] = cmd.match(/^what time is it in gmt\+?([-\d]+)\??$/i);
    return getTimeInZone(`GMT+${offset}`);
  }
  if (/^show time difference between (.+) and (.+)$/i.test(cmd)) {
    const [, a, b] = cmd.match(/^show time difference between (.+) and (.+)$/i);
    return getTimeDifference(a, b);
  }

  // — TIMER INTENTS —
  if (/^start a timer for (\d+) (seconds|minutes|hours)$/i.test(cmd)) {
    const [, num, unit] = cmd.match(/^start a timer for (\d+) (seconds|minutes|hours)$/i);
    return startTimer(Number(num), unit);
  }
  if (/^stop timer$/i.test(cmd)) {
    return stopTimer();
  }
  if (/^list timers$/i.test(cmd)) {
    return listTimers();
  }
  if (/^clear timers$/i.test(cmd)) {
    return clearTimers();
  }
  if (/^(?:how much time is left on the timer\??|what'?s left on the timer\??)$/i.test(cmd)) {
    return getTimerRemaining();
  }

  // — CALCULATOR INTENTS —
  if (/^calculate (.+)$/i.test(cmd)) {
    const [, expr] = cmd.match(/^calculate (.+)$/i);
    return calculateExpression(expr);
  }

  // — QUOTES INTENTS —
  if (/^give me a quote(?: about (.+))?$/i.test(cmd)) {
    const match = cmd.match(/^give me a quote(?: about (.+))?$/i);
    return getQuote(match[1]);
  }

  // — MUSIC INTENTS —
  if (/^fetch my tracks$/i.test(cmd)) {
    return fetchTracks();
  }
  if (/^play track (.+)$/i.test(cmd)) {
    const [, title] = cmd.match(/^play track (.+)$/i);
    return playTrack(title);
  }
  if (/^upload music (.+)$/i.test(cmd)) {
    const [, url] = cmd.match(/^upload music (.+)$/i);
    return uploadMusic(url);
  }
  if (/^recommend me (?:jazz )?music$/i.test(cmd)) {
    return recommendMusic(cmd);
  }
  if (/^fetch new releases$/i.test(cmd)) {
    return fetchNewReleases();
  }

  // — SOCIAL INTENTS —
  if (/^fetch social feed(?: from (.+))?$/i.test(cmd)) {
    const [, platforms] = cmd.match(/^fetch social feed(?: from (.+))?$/i);
    return fetchSocialFeed(platforms ? platforms.split(/, ?| and /) : []);
  }
  if (/^post to (.+) (.+)$/i.test(cmd)) {
    const [, platform, msg] = cmd.match(/^post to (.+) (.+)$/i);
    return postToSocial(platform, msg);
  }
  if (/^list social platforms$/i.test(cmd)) {
    return listSocialPlatforms();
  }

  // — RSS/NEWS INTENTS —
  if (/^list rss feeds$/i.test(cmd)) {
    return listRSSFeeds();
  }
  if (/^get rss feed for (.+)$/i.test(cmd)) {
    const [, source] = cmd.match(/^get rss feed for (.+)$/i);
    return getRSSFeed(source);
  }
  if (/^add rss feed (.+)$/i.test(cmd)) {
    const [, url] = cmd.match(/^add rss feed (.+)$/i);
    return addRSSFeed(url);
  }
  if (/^remove rss feed (.+)$/i.test(cmd)) {
    const [, source] = cmd.match(/^remove rss feed (.+)$/i);
    return removeRSSFeed(source);
  }
  if (/^list my news sources$/i.test(cmd)) {
    return listNewsSources();
  }

  // — TRANSLATOR INTENTS —
  if (/^translate (.+) to ([a-z]{2})$/i.test(cmd)) {
    const [, text, to] = cmd.match(/^translate (.+) to ([a-z]{2})$/i);
    return translateText(text, to);
  }

  // — CRYPTO INTENTS —
  if (/^what'?s the price of (.+)$/i.test(cmd)) {
    const [, coin] = cmd.match(/^what'?s the price of (.+)$/i);
    return getCryptoPrice(coin);
  }
  if (/^alert me when (.+) (?:goes above|exceeds) ([\d.]+)$/i.test(cmd)) {
    const [, coin, threshold] = cmd.match(
      /^alert me when (.+) (?:goes above|exceeds) ([\d.]+)$/i
    );
    return setCryptoAlert(coin, Number(threshold));
  }
  if (/^show crypto history for (.+)$/i.test(cmd)) {
    const [, coin] = cmd.match(/^show crypto history for (.+)$/i);
    return getCryptoHistory(coin);
  }

  // — AI ASSISTANT INTENTS —
  if (/^ask ai to (.+)$/i.test(cmd)) {
    const [, prompt] = cmd.match(/^ask ai to (.+)$/i);
    return askAI(prompt);
  }

  throw new Error(`Unrecognized command: "${input}"`);
}
