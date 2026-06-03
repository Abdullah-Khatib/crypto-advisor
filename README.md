# 🪙 Crypto Tracker & Advisor

A professional, high-performance single-page application that hooks directly into the CoinGecko API to deliver live cryptocurrency metrics. Beyond basic tracking, it processes raw market data through custom algorithmic momentum grading to separate assets into specialized, data-driven advisor streams.

---

## ⚡ Features

**Live Data Engine** — Synchronizes real-time market data from the CoinGecko API via a centralized state distribution hub, with a 60-second auto-refresh interval and a live countdown timer in the footer.

**Algorithmic Asset Segregation** — Automatically evaluates token metrics to populate three targeted columns:

- **Best Buy Opportunities** — Filters assets showing strong upward momentum relative to their 24h ranges, factoring in distance from All-Time Highs (ATH).
- **Sell / Take Profit** — Targets overbought indicators, sharp negative reversals, or assets nearing saturation bounds.
- **Market Leaders** — Tracks top-tier assets ranked by total market capitalization.

**Adaptive Currency Conversion** — Seamlessly switch between USD ($), EUR (€), and GBP (£) with real-time recalculation across all metrics.

**Bilingual Localization (EN / AR)** — Full English and Arabic support with automatic LTR ↔ RTL layout switching at the DOM level.

**Zero-Router Navigation** — View transitions between the market grid and Contact page use declarative state toggling — no page reloads, no state loss, no re-fetches.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Functional Components + Hooks) |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Internationalization | i18next + react-i18next |
| Data Source | CoinGecko Public API |

---

## 🏗️ Architecture Highlights

### Global Context & Background Polling

`CoinContext.jsx` maintains a single source of truth for all API data. A `useEffect` hook handles fetching on mount and re-fetches every 60 seconds, with proper cleanup on unmount:

```javascript
useEffect(() => {
    fetchAllCoins();

    const interval = setInterval(() => {
        fetchAllCoins();
    }, 60000);

    return () => clearInterval(interval);
}, [currency, i18n.language]);
```

### State-Based View Switching

Views switch instantly via a state variable in `App.jsx` — no router dependency, no network overhead:

```javascript
function App() {
  const [view, setView] = useState("home");

  return (
    <>
      <Header setView={setView} />
      {view === "home" ? <Body /> : <Contact />}
      <Footer />
    </>
  );
}
```

### Contact Form Validation

The Contact page validates all fields with regex before submission:

```javascript
const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    if (!emailRegex.test(formData.email)) tempErrors.email = "Please provide a valid email address.";
    if (!formData.purpose) tempErrors.purpose = "Please select your purpose of contact.";
    if (formData.message.trim().length < 15) tempErrors.message = "Message must be at least 15 characters.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
};
```

---

## 🎨 Color Palette

| Role | Color | Hex |
|---|---|---|
| Primary Background | Slate-Grey Matte | `#343434` |
| Cards & Containers | Deep Onyx Velvet | `#2a2a2a` |
| Body Text | Soft Cream Light | `#dde3c0` |
| Bullish / Buy | Muted Sage Green | `#749a96` |
| Bearish / Sell | Rust Terracotta | `#b56152` |
| Borders & Labels | Desaturated Earth Gold | `#948466` |

---

## 🚀 Getting Started

**Prerequisites:** Node.js v16+

```bash
# 1. Clone the repository
git clone <repository-url>
cd crypto-advisor-website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License

This project is open source. See `LICENSE` for details.
