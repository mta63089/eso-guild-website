# 📜 ESO Guild Website

Welcome to the **ESO Guild Website** project!  
This site serves as a portal for an Elder Scrolls Online guild, featuring:

- 🎮 Member accounts (Discord OAuth login)
- 📸 Media upload (user-specific screenshot galleries)
- 📢 Announcements and blog posts (admin managed)
- 🛡️ Admin dashboard (rank management, donations, attendance, vacation tracking)
- 🎣 Dynamic event tracking (live leaderboards, prize pools, countdowns)
- 🚀 Full CI/CD deployment pipeline

---

## ✨ Tech Stack

| Layer           | Technology                                            |
| :-------------- | :---------------------------------------------------- |
| Frontend        | [Next.js 15](https://nextjs.org/) (TypeScript)        |
| Styling         | [TailwindCSS](https://tailwindcss.com/)               |
| Hosting         | [AWS EC2](https://aws.amazon.com/ec2/) (Ubuntu 24.04) |
| Web Server      | Apache 2.4 with SSL (Let's Encrypt)                   |
| Deployment      | GitHub Actions CI/CD                                  |
| Process Manager | PM2                                                   |
| Authentication  | Discord OAuth 2.0                                     |

---

## 🚀 Deployment Pipeline

- **Build** and **test** on GitHub Actions (Node.js 22)
- **Deploy artifacts** (prebuilt `.next/`, `public/`, etc.) to EC2 via SCP
- **Restart PM2 app** (`eso-guild`) automatically via SSH
- **Zero downtime** deployments
- **No building on the server** — production-optimized!

---

## 📂 Project Structure

```plaintext
/
├── app/              # Next.js app directory (routes, layouts)
├── components/       # Reusable React components
├── config/           # Application configuration
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries
├── public/           # Static assets (images, icons)
├── .next/            # Next.js build output (generated)
├── package.json      # Project dependencies and scripts
├── next.config.ts    # Next.js configuration
└── tailwind.config.ts# TailwindCSS configuration
```

---

## ⚙️ Local Development

1. **Clone the repo:**

   ```bash
   git clone https://github.com/mta63089/eso-guild-website.git
   cd eso-guild-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🛡️ Production Deployment

| Action              | Command         |
| :------------------ | :-------------- |
| Build optimized app | `npm run build` |
| Start server        | `npm run start` |

**Note:**  
On production (EC2), only the built `.next/` folder and necessary files are uploaded.  
No builds are performed on the server to conserve CPU and RAM.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🏆 Special Thanks

- ESO community and players!
- The open-source maintainers behind Next.js, TailwindCSS, shadcn, Radix, and openai.

---

## 📢 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## 🎯 Current Status

✅ Basic site skeleton deployed  
✅ Full SSL/HTTPS setup  
✅ GitHub Actions CI/CD live  
✅ Apache reverse proxy working  
🚀 **Phase 2** features under active development!

---

## 📷 Example Screenshot

(Coming soon — once we design the homepage!)

---

## 📋 GitHub Actions Badge

```markdown
![Deploy](https://github.com/your-username/eso-guild-website/actions/workflows/deploy.yml/badge.svg)
```
