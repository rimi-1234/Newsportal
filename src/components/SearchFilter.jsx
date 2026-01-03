import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
const categories = ["All", "National", "International", "Sports", "Technology", "Business", "Entertainment"]

export default function SearchFilter({
  onSearchChange,
  onCategoryChange,
  currentCategory = "All",
  currentSearch = "",
}){
  const [searchQuery, setSearchQuery] = useState(currentSearch)
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, onSearchChange])
  const isAllSelected = currentCategory === "" || currentCategory === "All"

  return (<div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {searchQuery && (<button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (<button
            key={cat}
            onClick={() => onCategoryChange(cat === "All" ? "" : cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              (isAllSelected && cat === "All") || currentCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Filters Info */}
      {(searchQuery || currentCategory) && (<div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            {searchQuery && currentCategory
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
            className="text-sm text-primary hover:underline mt-2"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}
