import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "../components/Header"
import FeaturedArticle from "../components/FeaturedArticle"
import NewsCard from "../components/NewsCard"
import TrendingSection from "../components/TrendingSection"
import SearchFilter from "../components/SearchFilter"
import SkeletonCard from "../components/SkeletonCard"
import newsData from "../data/news.json"

export default function Home(){
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get("category") || ""
    setSelectedCategory(category)
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [searchParams])
  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    // Update URL when category changes
    if (category){
      setSearchParams({ category })
    } else {
      setSearchParams({})
    }
  }

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = newsData.articles

    // Filter by category
    if (selectedCategory){
      result = result.filter((article) => article.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery){
      const query = searchQuery.toLowerCase()
      result = result.filter((article) => article.title.toLowerCase().includes(query) || article.description.toLowerCase().includes(query),
      )
    }

    return result
  }, [searchQuery, selectedCategory])
  const featuredArticle = newsData.articles.find((a) => a.isFeatured) || newsData.articles[0]
  const trendingArticles = [...newsData.articles].sort((a, b) => b.views - a.views).slice(0, 5)
  const regularArticles = filteredArticles.filter((a) => !a.isFeatured)
  const hasNoResults = !loading && filteredArticles.length === 0

  return (
    <div className="min-h-screen bg-background">
      <Header activeCategory="Home" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Article */}
        {!loading && <FeaturedArticle article={featuredArticle} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <SearchFilter
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              currentCategory={selectedCategory}
              currentSearch={searchQuery}
            />

            {/* News Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : hasNoResults ? (<div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("")
                    setSearchParams({})
                  }}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Reset filters
                </button>
              </div>
            ) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularArticles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Trending */}
          {!loading && <TrendingSection articles={trendingArticles} />}
        </div>
      </main>
    </div>
  )
}
