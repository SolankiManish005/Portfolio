# Manish Portfolio

Personal portfolio built with Next.js App Router, Tailwind CSS, MongoDB, and a custom admin panel.

## Features

- Public pages: home, about, projects, contact
- Contact form with validation and MongoDB storage
- Email notification for each contact message (SMTP)
- WhatsApp prefill link after successful submission
- Admin login and protected messages dashboard
- Soft-delete for contact messages
- Floating AI chatbot powered by Gemini
- Local portfolio fallback when Gemini is unavailable

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB + Mongoose
- NextAuth (credentials-based admin login)
- Nodemailer (SMTP email notifications)
- Google Generative AI (Gemini chatbot)
- Google Generative AI (Gemini chatbot with local fallback)

## Project Structure

- src/app/(main): public pages and admin pages
- src/app/api: API routes
- src/components: UI components
- src/lib: auth, db, mailer, validations
- src/models: Mongoose models

## Prerequisites

- Node.js 20+
- npm
- MongoDB running locally or Atlas connection string

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
copy .env.example .env.local
```

3. Fill values in .env.local.

4. Start dev server:

```bash
npm run dev
```

5. Open http://localhost:3000

## Environment Variables

Use this example in .env.local:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/portfolioDB

# NextAuth
NEXTAUTH_SECRET=replace_with_a_long_random_secret
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_strong_password

# Optional internal cron route key (if you decide to enforce it in code)
CRON_SECRET=replace_with_random_secret

# SMTP for contact email notification
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_16_char_gmail_app_password
SMTP_FROM=yourgmail@gmail.com
CONTACT_RECEIVER_EMAIL=yourgmail@gmail.com

# WhatsApp prefill target number (international format without +)
WHATSAPP_NUMBER=919999999999

# Gemini chatbot
GEMINI_API_KEY=your_google_ai_studio_api_key
GEMINI_MODEL=gemini-2.0-flash

# Google Sheets webhook sync (for auto-syncing chat conversations)
SHEETS_WEBHOOK_SECRET=replace_with_32_char_random_string
```

## Gemini Setup

1. Open Google AI Studio and create an API key.
2. Add the key to GEMINI_API_KEY.
3. Restart the dev server.
4. Ask the chatbot about skills, projects, experience, or contact details.

If Gemini is unavailable, the chatbot still answers using your portfolio data and FAQ content.

## Gmail SMTP Notes

- Enable 2-Step Verification on your Google account.
- Create an App Password and use it in SMTP_PASS.
- Do not use your normal Gmail password.
- If authentication fails, regenerate App Password and restart the dev server.

## Available Scripts

- npm run dev: start development server
- npm run build: create production build
- npm run start: run production server
- npm run lint: run ESLint
- npm run format: run Prettier

## Chatbot Visitor Tracking

Automatically capture visitor information when they use the AI chatbot:

### What Gets Tracked

- **Visitor Name** (optional) - User provides via chat form
- **Email** (optional) - User provides via chat form
- **IP Address** (automatic) - Server extracts from request headers
- **Session ID** - Unique per browser/device
- **Message Count** - Number of exchanged messages
- **Conversation Date** - When first message was sent

### Admin Dashboard

View all conversations at `/admin/conversations` (requires admin login):

- **List View**: See all visitor conversations with name, email, IP, message count, and last updated date
- **Detail View**: Click any conversation to see the full chat history
- **Export**: Download all data as CSV file for import into Google Sheets or Excel
- **Copy IP**: Click IP address to copy to clipboard for whitelisting/blocking

### Auto-Sync to Google Sheets

Automatically sync conversations to your Google Sheet every 30 minutes:

1. Create a Google Sheet and share it with your Google account
2. Add the webhook secret to `.env.local`: `SHEETS_WEBHOOK_SECRET=your_32_char_random_key`
3. Follow [Google Apps Script setup guide](./GOOGLE_APPS_SCRIPT.md)
4. Conversations auto-sync each time new ones are ready

**Synced Columns**: Visitor Name, Email, IP Address, Message Count, Created Date, Updated Date

See [GOOGLE_APPS_SCRIPT.md](./GOOGLE_APPS_SCRIPT.md) for detailed setup.

## Contact Flow (Current)

1. Visitor submits contact form.
2. Data is validated and saved in MongoDB.
3. SMTP email is sent to CONTACT_RECEIVER_EMAIL (if SMTP configured).
4. Response includes a WhatsApp prefill URL.
5. Client opens WhatsApp link in a new tab.

## Deployment

Deploy on Vercel or any Node.js hosting platform.

- Add all environment variables in your deployment settings.
- Ensure MONGODB_URI points to production database.
- Ensure NEXTAUTH_URL matches your deployed domain.

## Security Notes

- Never commit .env.local.
- Rotate secrets immediately if leaked.
- Use strong admin password and random NEXTAUTH_SECRET.
- If you exposed a Gemini API key in .env.local, revoke it and create a new one.
