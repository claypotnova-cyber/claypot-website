# Technical Handover Document: Claypot Indian Bar & Restaurant

This document provides all the necessary information for a technical handover of the Claypot website.

## 1. Project Overview
A premium, responsive web application for Claypot Indian Bar & Restaurant, built for high performance, visual engagement, and customer interaction.

- **URL**: [To be provided by client]
- **Repository**: [GitHub Repository URL]
- **Main Stack**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion.

---

## 2. Getting Started (Local Development)

To run the project locally for development or testing:

### Prerequisites
- **Node.js**: 18.x or higher
- **Package Manager**: npm

### Installation
1.  **Clone the Repository**:
    ```bash
    git clone [repository-url]
    cd claypot-website
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add the following:
    ```env
    # Required for the Spin Wheel (e.g., Upstash Redis)
    REDIS_URL=your_redis_connection_string
    
    # Required for Contact Form (e.g., Resend)
    RESEND_API_KEY=your_resend_api_key
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:3000`.

---

## 3. Deployment (Vercel)

The project is optimized for deployment on **Vercel**.

1.  **Connect Git**: Connect your GitHub repository to a new Vercel Project.
2.  **Configure Framework**: Vercel will automatically detect "Next.js".
3.  **Environment Variables**: In the Vercel Dashboard, go to **Settings > Environment Variables** and add:
    - `REDIS_URL`
    - `RESEND_API_KEY`
4.  **Deploy**: Every push to the `main` branch will trigger an automatic production deployment.

---

## 4. How to Make Changes

The project is designed to be easily modifiable.

### Updating the Menu
Menu data is stored in a structured format for easy updates without touching React logic.
- **Location**: `lib/data/menu.ts`
- **Action**: Add, remove, or edit items in the JSON-like objects.

### Updating Hero Text & Announcements
- **Announcement Bar**: Edit the `TEXT` constant in `components/AnnouncementBar.tsx`.
- **Hero Phrases**: Edit the `CYCLING_PHRASES` array in `components/Hero.tsx`.

### Managing the Spin Wheel
- **Prize Probabilities**: Adjust the `WIN_PROBABILITY` in `app/api/spin/route.ts`.
- **Prize Labels**: Edit the labels in `lib/data/promotions.ts`.
- **Daily Limits**: The daily prize pool can be configured in `lib/prizes.ts`.

---

## 5. Third-Party Services
- **Hosting**: [Vercel](https://vercel.com)
- **Database (Redis)**: [Upstash](https://upstash.com) (Recommended for the Spin Wheel)
- **Email**: [Resend](https://resend.com) (For contact form delivery)

---

## 6. Maintenance & Performance
- **Linting**: Run `npm run lint` to check for code quality issues.
- **Production Build**: Run `npm run build` to verify the site is ready for deployment.
- **Optimization**: All images should be placed in the `public/images` folder and served via the Next.js `<Image />` component for automatic optimization.

## 7. Account & Credential Directory

> [!NOTE]
> All primary accounts listed below are associated with **claypotnova@gmail.com**.  
> **Master Password**: `****` (Please update/change after handover).

### Core Infrastructure & Logins
| Service | Purpose | URL | Login Email | Password / Access |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub** | Source Code | `https://github.com/claypotnova-cyber/claypot-website` | claypotnova@gmail.com | **** |
| **Vercel** | Hosting & CI/CD | `https://vercel.com/dashboard` | claypotnova@gmail.com | [SSO via GitHub] |
| **Upstash** | Redis (Spin Wheel) | `https://console.upstash.com/` | claypotnova@gmail.com | **** |
| **Resend** | Email Service | `https://resend.com/overview` | claypotnova@gmail.com | **** |
| **Wix** | Domain Registrar | `https://wix.com` | claypotnova@gmail.com | **** |

### API Keys (Sensitive)
> [!IMPORTANT]
> These keys must be kept private. They are already configured in Vercel's Environment Variables.
- **REDIS_URL**: Located in Upstash Console > Database > Connect.
- **RESEND_API_KEY**: Located in Resend > API Keys.

### Official URLs
| Type | URL |
| :--- | :--- |
| **Main Website** | `https://www.claypotva.com` |
| **Online Ordering (Toast)** | `https://order.toasttab.com/online/clay-pot-3065-centerville-rd-ste-g` |
| **Google Maps** | `https://maps.app.goo.gl/ArpMFKLvrPVJRpuNA` |
| **Google Business Page** | `https://g.page/claypot-herndon` |

### Social Media Presence
- **Instagram**: `https://instagram.com/claypotva` (Login: claypotnova@gmail.com / PW: ****)
- **Facebook**: `https://facebook.com/claypotva` (Admin access via Meta Business Suite)
- **TikTok**: `https://tiktok.com/@claypotva` (Login: claypotnova@gmail.com / PW: ****)
- **Snapchat**: `https://snapchat.com/add/claypotva`
- **Yelp**: `https://yelp.com/biz/clay-pot-herndon`

---

## 8. Summary of Handover Assets
- ✅ **Clean Code**: Pushed to GitHub `main` branch.
- ✅ **Documentation**: This `HANDOVER.md` file.
- ✅ **Build Status**: Verified `npm run build` pass.
- ✅ **SEO & Analytics**: Metadata and semantic tags implemented.

---
**Handover Date**: May 2026  
**Status**: Production Ready ✅
