import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
const categories = [
  { label: "Home", href: "/" },
  { label: "National", href: "/?category=National" },
  { label: "International", href: "/?category=International" },
  { label: "Sports", href: "/?category=Sports" },
  { label: "Technology", href: "/?category=Technology" },
  { label: "Business", href: "/?category=Business" },
  { label: "Entertainment", href: "/?category=Entertainment" },
]

export default function Header({ activeCategory = "Home" }){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (<header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold text-primary">
            NewsPortal
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                to={cat.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === cat.label ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (<nav className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (<Link
                  key={cat.href}
                  to={cat.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === cat.label
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
