const nodemailer = require('nodemailer');

const OWNER_EMAIL = process.env.OWNER_EMAIL;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

if (!OWNER_EMAIL || !SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.warn('Missing required email environment variables for /api/contact.');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    res.status(400).json({ ok: false, error: 'Missing required fields' });
    return;
  }

  const mail = {
    from: `Website Contact <${SMTP_USER}>`,
    to: OWNER_EMAIL,
    subject: `WEALTHSCAPE Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await transporter.sendMail(mail);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
};

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
