import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import FeaturedArticle from "../components/FeaturedArticle"
import NewsCard from "../components/NewsCard"
import TrendingSection from "../components/TrendingSection"
import SearchFilter from "../components/SearchFilter"
import SkeletonCard from "../components/SkeletonCard"
import newsData from "../data/news.json"

// --- SLOW MOTION SETTINGS ---
// We use these specifically for the layout transitions and hover effects
const slowSpring = {
  type: "spring",
  stiffness: 35, // Very low stiffness = slow, heavy movement
  damping: 15,
  mass: 1.2
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const category = searchParams.get("category") || ""
    setSelectedCategory(category)
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [searchParams])

  const handleSearchChange = (query) => setSearchQuery(query)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    category ? setSearchParams({ category }) : setSearchParams({})
  }

  const filteredArticles = useMemo(() => {
    let result = newsData.articles
    if (selectedCategory) result = result.filter(a => a.category === selectedCategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
    }
    return result
  }, [searchQuery, selectedCategory])

  const featuredArticle = newsData.articles.find(a => a.isFeatured) || newsData.articles[0]
  const trendingArticles = [...newsData.articles].sort((a, b) => b.views - a.views).slice(0, 5)
  const regularArticles = filteredArticles.filter(a => !a.isFeatured)
  const hasNoResults = !loading && filteredArticles.length === 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header with its own internal slow-motion active tab */}
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Featured Article - Renders immediately */}
        <FeaturedArticle article={featuredArticle} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2">
            
            <SearchFilter
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              currentCategory={selectedCategory}
              currentSearch={searchQuery}
            />

            {/* Grid Transitions - Slow Motion filtering */}
            <AnimatePresence mode="popLayout">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </motion.div>
              ) : hasNoResults ? (
                <motion.div 
                  key="no-results" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-center py-12"
                >
                  <h3 className="text-lg font-semibold">No articles found</h3>
                </motion.div>
              ) : (
                <motion.div 
                  key="results"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {regularArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      layout // This makes the cards slide slowly to new positions
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        layout: slowSpring, // Slow movement when list changes
                        opacity: { duration: 1 },
                        y: { duration: 1 }
                      }}
                      whileHover={{ 
                        scale: 1.03, 
                        y: -5,
                        transition: { duration: 0.5 } // Slow hover response
                      }}
                    >
                      <NewsCard article={article} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Renders immediately */}
          <aside className="block">
             <TrendingSection articles={trendingArticles} />
          </aside>
        </div>
      </main>
    </div>
  )
}