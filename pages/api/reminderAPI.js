// File: src/pages/api/reminderAPI.js

let reminders = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, text, date, time, hours, id, minutes, frequency } = req.body;

    // CREATE REMINDER
    if (action === 'create') {
      const newReminder = {
        id: Date.now(),
        text,
        date: date || null,
        time: time || null,
        hours: hours || null,
        frequency: frequency || null,
        created: new Date().toISOString(),
      };
      reminders.push(newReminder);
      return res.status(200).json({ success: true, reminder: newReminder });
    }

    // SNOOZE
    if (action === 'snooze') {
      const rem = reminders.find(r => r.id == id);
      if (rem) rem.time = `Snoozed by ${minutes} minutes`;
      return res.status(200).json({ success: !!rem, reminder: rem });
    }

    // CANCEL
    if (action === 'cancel') {
      reminders = reminders.filter(r => r.id != id);
      return res.status(200).json({ success: true });
    }

    // EDIT
    if (action === 'edit') {
      const rem = reminders.find(r => r.id == id);
      if (rem) rem.text = text;
      return res.status(200).json({ success: !!rem, reminder: rem });
    }

    // DELETE
    if (action === 'delete') {
      reminders = reminders.filter(r => r.id != id);
      return res.status(200).json({ success: true });
    }

    // RECURRING
    if (action === 'recurring') {
      const newReminder = {
        id: Date.now(),
        text,
        frequency,
        created: new Date().toISOString(),
        recurring: true,
      };
      reminders.push(newReminder);
      return res.status(200).json({ success: true, reminder: newReminder });
    }
  }

  // GET reminders
  if (req.method === 'GET') {
    // Today filter (optional)
    if (req.query.action === 'today') {
      // Basic filter: all reminders created today
      const today = new Date().toISOString().slice(0, 10);
      return res.status(200).json(reminders.filter(r => r.created.slice(0, 10) === today));
    }
    return res.status(200).json(reminders);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
