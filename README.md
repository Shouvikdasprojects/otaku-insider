# 🌸 Otaku Insider

![Otaku Insider Banner](public/logo.jpg)

**Otaku Insider** is a next-generation, high-performance anime tracking and discovery platform. Built for anime enthusiasts, it offers a seamless, blazingly fast experience for discovering new anime, tracking your watch progress, viewing airing schedules, and staying up-to-date with anime news.

Built with cutting-edge web technologies, it leverages edge computing and serverless databases to deliver a premium, responsive experience anywhere in the world.

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

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication:** [Better-Auth](https://better-auth.com/)
- **Database:** [Neon PostgreSQL](https://neon.tech/) (Serverless)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/) (via [OpenNext](https://opennext.js.org/))
- **Data Source:** [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs)

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
   # or
   pnpm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file to create your own local environment file:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and fill in the required variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `BETTER_AUTH_SECRET`: Generate a random base64 secret (e.g., using `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`).

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

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built with ❤️ for Anime fans around the world.*
