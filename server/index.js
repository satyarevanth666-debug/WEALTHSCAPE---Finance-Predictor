require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OWNER_EMAIL = process.env.OWNER_EMAIL;

if (!OWNER_EMAIL) {
  console.error('OWNER_EMAIL is not set in environment. Set OWNER_EMAIL to the recipient address.');
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Missing required fields' });

  const mail = {
    from: `Website Contact <${process.env.SMTP_USER}>`,
    to: OWNER_EMAIL,
    subject: `WEALTHSCAPE Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${(message || '').replace(/\n/g, '<br>')}</p>`
  };

  try {
    await transporter.sendMail(mail);
    // Emit real-time notification to connected owner/admin clients
    const payload = { ok: true, name, email, message, time: new Date().toISOString() };
    io.emit('new-contact', payload);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Failed to send mail', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

server.listen(PORT, () => console.log(`Contact server listening on port ${PORT}`));
