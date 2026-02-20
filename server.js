/**
 * NCORE Foundation - Form submission backend
 * Sends volunteer, donate, and partner forms to contact@ncorefoundation.org
 *
 * Set SMTP in .env (see .env.example). Run: node server.js
 * Serves static site and POST /api/send-form for form emails.
 */

require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const TO_EMAIL = process.env.TO_EMAIL || 'contact@ncorefoundation.org';

// SMTP transport (set in .env)
function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE === 'true';

  if (!host || !user || !pass) {
    console.warn('Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in .env. Form emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure,
    auth: { user, pass },
  });
}

const transport = getTransport();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/send-form', async (req, res) => {
  const { to = TO_EMAIL, subject, text } = req.body;

  if (!subject || !text) {
    return res.status(400).json({ ok: false, error: 'Missing subject or text' });
  }

  if (!transport) {
    return res.status(503).json({
      ok: false,
      error: 'Email not configured. Set SMTP_* in .env.',
    });
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@ncorefoundation.org';

  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM_LABEL ? `"${process.env.SMTP_FROM_LABEL}" <${from}>` : from,
      to: to.trim(),
      subject: subject.trim(),
      text: text.trim(),
      replyTo: req.body.replyTo || undefined,
    });
    res.json({ ok: true, message: 'Email sent' });
  } catch (err) {
    console.error('Send mail error:', err);
    res.status(500).json({ ok: false, error: err.message || 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`NCORE server running at http://localhost:${PORT}`);
  if (!transport) console.log('Configure .env with SMTP_* to enable form email sending.');
});
