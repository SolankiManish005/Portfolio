# Manish Portfolio

Personal portfolio built with Next.js App Router, Tailwind CSS, MongoDB, and a custom admin panel.

## Features

- Public pages: home, about, projects, contact
- Contact form with validation and MongoDB storage
- Email notification for each contact message (SMTP)
- WhatsApp prefill link after successful submission
- Admin login and protected messages dashboard
- Soft-delete for contact messages

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB + Mongoose
- NextAuth (credentials-based admin login)
- Nodemailer (SMTP email notifications)

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
```

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
