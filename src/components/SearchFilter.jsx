import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["All", "National", "International", "Sports", "Technology", "Business", "Entertainment"]

export default function SearchFilter({
  onSearchChange,
  onCategoryChange,
  currentCategory = "All",
  currentSearch = "",
}) {
  const [searchQuery, setSearchQuery] = useState(currentSearch)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, onSearchChange])

  const isAllSelected = currentCategory === "" || currentCategory === "All"

  return (
    <div className="space-y-6 mb-8">
      {/* 1. Search Bar - Slow Scale Entrance */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-500"
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. Category Filter - Sliding Pill Animation */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => {
          const isActive = (isAllSelected && cat === "All") || currentCategory === cat
          
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat === "All" ? "" : cat)}
              className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-500"
            >
              {/* The Text Label */}
              <span className={`relative z-10 transition-colors duration-500 ${
                isActive ? "text-primary-foreground" : "text-foreground hover:text-primary"
              }`}>
                {cat}
              </span>

              {/* The Sliding Background (Slow Motion) */}
              {isActive ? (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 35, // Very slow motion
                    damping: 15,
                    mass: 1.2
                  }}
                />
              ) : (
                // Static background for inactive buttons
                <div className="absolute inset-0 bg-muted rounded-full -z-0" />
              )}
            </button>
          )
        })}
      </div>

      {/* 3. Active Filters Info - Slow Slide Down */}
      <AnimatePresence>
        {(searchQuery || (currentCategory && currentCategory !== "All")) && (
          <motion.div 
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-muted/50 border border-border rounded-xl flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {searchQuery && currentCategory && currentCategory !== "All"
                  ? `Showing results for "${searchQuery}" in ${currentCategory}`
                  : searchQuery
                    ? `Showing results for "${searchQuery}"`
                    : `Showing results in ${currentCategory}`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  onSearchChange("")
                  onCategoryChange("")
                }}
                className="text-sm font-semibold text-primary hover:opacity-70 transition-opacity"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}