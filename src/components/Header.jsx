import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { label: "Home", href: "/" },
  { label: "National", href: "/?category=National" },
  { label: "International", href: "/?category=International" },
  { label: "Sports", href: "/?category=Sports" },
  { label: "Technology", href: "/?category=Technology" },
  { label: "Business", href: "/?category=Business" },
  { label: "Entertainment", href: "/?category=Entertainment" },
];

export default function Header() {
  const [searchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
const activeCategory = isHomePage 
    ? (searchParams.get("category") || "Home") 
    : null;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="font-serif text-2xl font-bold text-primary">
              NewsPortal
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label;
              return (
                <Link
                  key={cat.label}
                  to={cat.href}
                  className="relative px-3 py-2 text-sm font-medium transition-colors"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${
                    isActive ? "text-primary-foreground" : "text-foreground hover:text-primary"
                  }`}>
                    {cat.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col gap-1 py-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      activeCategory === cat.label ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}