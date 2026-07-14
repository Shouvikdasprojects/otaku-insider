<div align="center">
  
# 🌸 Otaku Insider

**Your Next-Generation Anime Tracking & Discovery Platform**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-5A67D8?style=for-the-badge&logo=cloudflare&logoColor=white)](https://otaku-insider.shouvikdaswork.workers.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Neon Database](https://img.shields.io/badge/Neon_Postgres-Serverless-00E599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

*Otaku Insider offers a seamless, blazingly fast experience for discovering new anime, tracking your watch progress, viewing airing schedules, and staying up-to-date with anime news.*

</div>

---

## 📌 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **📺 Comprehensive Anime Database:** Powered by the AniList API for up-to-date and extensive anime data.
- **📅 Live Airing Schedule:** Keep track of exactly when the next episode of your favorite seasonal anime is airing.
- **🔐 Secure Authentication:** Seamless user login and session management powered by [Better-Auth](https://better-auth.com/).
- **⚡ Edge-Optimized:** Deployed on Cloudflare Workers via OpenNext for incredible global performance and low latency.
- **💾 Serverless Database:** Uses Neon PostgreSQL and Drizzle ORM for fast, scalable, and reliable data storage.
- **📱 Responsive & Beautiful UI:** A fully responsive, dark-mode-first user interface built with Tailwind CSS and Shadcn UI.
- **🎯 Personalized Watchlists:** Track your currently watching, completed, and planned anime easily.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Data
- **Authentication:** [Better-Auth](https://better-auth.com/)
- **Database:** [Neon PostgreSQL](https://neon.tech/) (Serverless)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **External API:** [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs)

### Deployment & Infrastructure
- **Hosting:** [Cloudflare Workers](https://workers.cloudflare.com/)
- **Adapter:** [OpenNext](https://opennext.js.org/)
- **CI/CD:** GitHub Actions

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Neon Database](https://neon.tech/) account (for serverless Postgres)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shouvikdasprojects/otaku-insider.git
   cd otaku-insider
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file to create your own local environment file:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and fill in the required variables (see below).

4. **Initialize the Database:**
   Push the Drizzle schema to your Neon database:
   ```bash
   npm run db:push
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```env
# Neon PostgreSQL connection string (with ?sslmode=require)
DATABASE_URL=postgres://user:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
BETTER_AUTH_SECRET=your_random_base64_secret

# The canonical URL of your app
BETTER_AUTH_URL=http://localhost:3000
```

---

## ☁️ Deployment

This project is configured to be deployed on **Cloudflare Workers** using **OpenNext**. 
The repository includes a configured GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the application to Cloudflare on every push to the `main` branch.

To deploy manually via CLI:
```bash
npm run deploy
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check out the [issues page](https://github.com/Shouvikdasprojects/otaku-insider/issues) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---
<div align="center">
  <i>Built with ❤️ for Anime fans around the world.</i>
</div>
