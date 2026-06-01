# Contact form setup (Supabase + Resend)

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → paste and run `supabase/schema.sql`.
3. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (secret) → `SUPABASE_SERVICE_ROLE_KEY`  
     Never expose the service role key in the browser.

## 2. Resend (email)

1. Sign up at [resend.com](https://resend.com).
2. Create an API key → `RESEND_API_KEY`.
3. For testing, use `RESEND_FROM_EMAIL=onboarding@resend.dev`.
4. For production, verify your domain in Resend and set e.g. `bookings@yourdomain.com`.
5. Set `CONTACT_TO_EMAIL=shalmonir@yahoo.com` (or your inbox).

## 3. Local `.env.local`

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

Restart `npm run dev` after saving.

## 4. Vercel

In the project → **Settings → Environment Variables**, add the same keys for **Production** (and Preview if you want).

Redeploy after adding variables.

## Viewing leads

Supabase → **Table Editor** → `contact_leads`.

Each submit also sends an email when `RESEND_API_KEY` is set. If email fails, the lead is still saved in the database.
