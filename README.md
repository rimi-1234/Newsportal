# 📰 News Portal UI (React + Vite)

A modern, fast, and responsive **News Portal Frontend** built with **React 19**, **Vite**, and **Tailwind CSS**.  
This project focuses on performance, clean UI/UX, animations, and scalable architecture.

[**🌐 Live Demo**](https://rimi-1234-newsportal.netlify.app/) | [**📂 GitHub Repo**](https://github.com/rimi-1234/Newsportal)

---

---

## 🚀 Key Highlights

- ⚡ **Vite-powered React 19** for ultra-fast development
- 🎨 **Tailwind CSS 4** with animation utilities
- 🧭 **React Router v6** for seamless navigation
- ✨ **Framer Motion** animations
- 🧩 Modular & reusable component architecture
- 🔍 News search & filtering
- 📈 Trending & featured news sections
- 💀 Skeleton loaders & preloader for better UX
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|------------|
| Framework | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS, PostCSS |
| Routing | React Router DOM |
| Animation | Framer Motion |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge |

---

## 📂 Folder Structure

```bash
news-portal-ui-react-js/
├── public/
│   ├── icon.svg
│   └── apple-icon.png
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── NewsCard.jsx
│   │   ├── FeaturedArticle.jsx
│   │   ├── TrendingSection.jsx
│   │   ├── SearchFilter.jsx
│   │   ├── SkeletonCard.jsx
│   │   └── Preloader.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── NewsDetail.jsx
│   │
│   ├── data/
│   │   └── news.json
│   │
│   ├── lib/
│   │   └── utils.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## ✨ Feature Breakdown

### 🏠 Home Page
Displays the latest news with:
- Featured article spotlight
- Trending news carousel
- Responsive news cards grid

### 📰 News Detail Page
- Dedicated route for each article
- Clean typography for reading comfort
- Smooth page transitions

### 🔍 Search & Filter
- Client-side search from JSON data
- Instant filtering experience
- Optimized UI feedback

### 💀 Skeleton Loading
- Skeleton cards shown while content loads
- Enhances perceived performance

### 🎞️ Animations
- Page transitions using Framer Motion
- Hover and entrance animations

### 🧩 Component-Driven Design
- Highly reusable UI components
- Clean separation of concerns

### 📱 Responsive UI
- Mobile-first approach
- Optimized for all screen sizes

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/rimi-1234/Newsportal.git
cd news-portal-ui-react-js
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

### 4️⃣ Build for Production
```bash
npm run build
```

### 5️⃣ Preview Production Build
```bash
npm run preview
```

---

## 🧪 Sample Data

News content is served from:
```bash
src/data/news.json
```
You can replace this with:
- API integration
- CMS
- Backend service

---

## 🔮 Future Improvements

- 🔐 Authentication
- 🌐 API-based news fetching
- 🌙 Dark mode
- 🧠 AI-powered article summaries
- 📊 Analytics dashboard

---

## 👨‍💻 Author

Built with ❤️ using **React & Tailwind**  
Perfect starter for:
- News portals
- Blogs
- Content platforms
- Media dashboards

---

## 📄 License

This project is **open-source** and free to use.
