# शाक्य बज्राचार्य समाज, यल — Shakya Bajracharya Samaj Yala

Official bilingual (नेपाली / English) website of **The Society of Shakya, Bajracharya Lalitpur, Nepal**.

Built with **Next.js (App Router) + PostgreSQL (Drizzle ORM) + Tailwind CSS**.

## Features
- Public site: About, Objectives, Executive Committee, Activities, Notices, Gallery, Donate, Contact
- Members Directory (Founder / Honorary / Life / General) with privacy-protected profiles
- Member Portal: login, self-registration, password reset, profile editor, **CV generator with 3 printable templates**
- Admin CPanel (`/admin`): manage members, activities, gallery, notices, committee, messages, settings
- Traditional Games: playable **Bagh Chal (बाघचाल)** with AI opponent
- Language toggle (नेपाली ⇄ English)

---

## 1. Run locally

```bash
npm install
cp .env.example .env        # then edit DATABASE_URL / secrets
npx drizzle-kit push        # creates the tables
npm run dev                 # http://localhost:3000
```

Default logins (change before going live — see §5):
| Portal | URL | Username / Email | Password |
|---|---|---|---|
| Admin CPanel | `/admin/login` | `admin` | `yala2075` |
| Member (demo) | `/member/login` | `sunil.shakya@example.com` or `SBS-GM-001` | `member123` |

---

## 2. Push the code to GitHub

### Option A — GitHub Desktop (no terminal needed)
1. Install **GitHub Desktop** → sign in.
2. `File → Add Local Repository` → choose this project folder → **Create repository**.
3. Write a summary (e.g. *Initial website*) → **Commit to main**.
4. Click **Publish repository** → name it `shakya-bajracharya-samaj-yala` → untick *Keep private* if you want it public → **Publish**.

### Option B — Terminal
```bash
git init
git add .
git commit -m "Initial commit: Shakya Bajracharya Samaj Yala website"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/shakya-bajracharya-samaj-yala.git
git push -u origin main
```
> `.env` is in `.gitignore`, so your database password is **never** uploaded. ✅

---

## 3. Create a free cloud PostgreSQL database (Neon)
1. Go to **https://neon.tech** → Sign up → **New Project** (region: *Asia Pacific – Singapore*).
2. Copy the **Connection string** (looks like `postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require`).
3. Create the tables in that database (run once from your computer):
   ```bash
   DATABASE_URL="<paste-neon-url>" npx drizzle-kit push --config drizzle.config.prod.ts
   ```
   The app seeds the admin account, sample members, activities, gallery, etc. automatically on first visit.

---

## 4. Deploy on Vercel (free)
1. Go to **https://vercel.com** → *Continue with GitHub* → **Add New → Project** → **Import** your repo.
2. Framework is auto-detected as **Next.js**. Open **Environment Variables** and add:
   | Name | Value |
   |---|---|
   | `DATABASE_URL` | your Neon connection string |
   | `ADMIN_SECRET` | a long random string (`openssl rand -hex 32`) |
   | `MEMBER_SECRET` | another long random string |
3. Click **Deploy**. In ~2 minutes you get a live URL like `https://shakya-bajracharya-samaj-yala.vercel.app`.
4. Every future `git push` to `main` redeploys automatically.

> **Image uploads note:** Vercel's filesystem is read-only, so the *"Choose File"* upload button in the CPanel will not persist files there. Use the **Image URL** field instead (host photos on Google Drive/Imgur/Cloudinary and paste the link). If you prefer server-side uploads, deploy on **Railway** or **Render** (persistent disk) — same steps, or add Vercel Blob storage.

---

## 5. Connect your domain `shakyabajracharyasamajyala.org.np`

**.np domains (register.com.np) don't host DNS — use free Cloudflare DNS:**

1. **Cloudflare** → https://dash.cloudflare.com → *Add a site* → enter `shakyabajracharyasamajyala.org.np` → Free plan. Note the two nameservers shown (e.g. `ana.ns.cloudflare.com`, `bob.ns.cloudflare.com`).
2. **register.com.np** → log in → *My Domains* → your domain → **Update Nameservers** → enter the two Cloudflare nameservers → Save (propagation 1–24 h).
3. **Vercel** → Project → *Settings → Domains* → add `shakyabajracharyasamajyala.org.np` **and** `www.shakyabajracharyasamajyala.org.np`. Vercel shows the DNS values you need.
4. **Cloudflare → DNS → Records** → add (set Proxy status to **DNS only / grey cloud**):
   | Type | Name | Content |
   |---|---|---|
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |
5. Back in Vercel the domain turns **Valid ✅** and a free **HTTPS certificate** is issued automatically.

---

## 6. Before going live — security checklist
- [ ] Set strong `ADMIN_SECRET` / `MEMBER_SECRET` in Vercel.
- [ ] Change the default admin password:
  ```bash
  # 1) generate the hash (use the SAME ADMIN_SECRET as in Vercel)
  ADMIN_SECRET="<your-secret>" node -e "const c=require('crypto');console.log(c.pbkdf2Sync(process.argv[1],process.env.ADMIN_SECRET,1000,32,'sha256').toString('hex'))" "MyNewStrongPassword"
  # 2) store it (psql / Neon SQL editor)
  UPDATE admin_users SET password_hash='<hash-from-step-1>' WHERE username='admin';
  ```
- [ ] Delete or re-password the demo members from **CPanel → Members**.
- [ ] Update bank details on the Donate page (`src/lib/translations.ts`).

---

## Useful commands
| Command | Purpose |
|---|---|
| `npm run dev` | local dev server |
| `npm run build && npm start` | production build & run |
| `npx drizzle-kit push` | sync schema to the local DB (`drizzle.config.json`) |
| `npx drizzle-kit push --config drizzle.config.prod.ts` | sync schema to the production DB (`DATABASE_URL`) |

---
© Shakya Bajracharya Samaj Yala (Reg. No. 5587/2075) · हःखाटोल, ललितपुर · shakyabajracharyasamajyala@gmail.com
