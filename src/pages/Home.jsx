import { useState, useMemo, useEffect, useRef, useCallback } from "react" // 1. Added useCallback
import { useSearchParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import FeaturedArticle from "../components/FeaturedArticle"
import NewsCard from "../components/NewsCard"
import TrendingSection from "../components/TrendingSection"
import SearchFilter from "../components/SearchFilter"
import SkeletonCard from "../components/SkeletonCard"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
import newsData from "../data/news.json"

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const [displayCount, setDisplayCount] = useState(8)
  const [isFetching, setIsFetching] = useState(false)
  
  // 2. This ref will store the observer so we can disconnect it
  const observerRef = useRef(null)

  useEffect(() => {
    const category = searchParams.get("category") || ""
    setSelectedCategory(category)
    setLoading(true)
    setDisplayCount(8)

    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [searchParams])

  const filteredArticles = useMemo(() => {
    let result = newsData.articles.filter(a => !a.isFeatured)
    if (selectedCategory) result = result.filter(a => a.category === selectedCategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
    }
    return result
  }, [searchQuery, selectedCategory])

  const handleLoadMore = () => {
    setIsFetching(true)
    setTimeout(() => {
      setDisplayCount((prev) => prev + 4)
      setIsFetching(false)
    }, 400)
  }

  // 3. CORRECTED CALLBACK REF
  const loaderRef = useCallback((node) => {
    if (loading) return;

    // Clean up previous observer if it exists
    if (observerRef.current) observerRef.current.disconnect();

    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const first = entries[0];
          if (first.isIntersecting && !isFetching && displayCount < filteredArticles.length) {
            handleLoadMore();
          }
        },
        { threshold: 0.1, rootMargin: "200px" }
      );
      observerRef.current.observe(node);
    }
  }, [loading, isFetching, displayCount, filteredArticles.length]);

  const visibleArticles = filteredArticles.slice(0, displayCount)
  const featuredArticle = newsData.articles.find(a => a.isFeatured) || newsData.articles[0]
  const trendingArticles = [...newsData.articles].sort((a, b) => b.views - a.views).slice(0, 5)

  return (
    <Preloader>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FeaturedArticle article={featuredArticle} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2">
              <SearchFilter
                onSearchChange={setSearchQuery}
                onCategoryChange={(cat) => {
                  setSelectedCategory(cat)
                  cat ? setSearchParams({ category: cat }) : setSearchParams({})
                }}
                currentCategory={selectedCategory}
                currentSearch={searchQuery}
              />

              <AnimatePresence mode="popLayout">
                {loading ? (
                  <motion.div
                    key="skeletons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                  </motion.div>
                ) : (
                  <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {visibleArticles.map((article) => (
                        <motion.div key={article.id} layout transition={{ duration: 0.5 }}>
                          <NewsCard article={article} />
                        </motion.div>
                      ))}
                    </motion.div>
                
                    {/* TRIGGER DIV */}
                    <div
                      ref={loaderRef}
                      className="py-12 flex flex-col items-center justify-center min-h-[120px]"
                    >
                      {displayCount < filteredArticles.length ? (
                        <div className="flex flex-col items-center gap-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                          />
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
                            Loading more stories
                          </p>
                        </div>
                      ) : (
                        <div className="w-full pt-8 border-t border-border/40 mt-8 text-center">
                          <p className="text-sm text-muted-foreground font-serif italic">
                            You have reached the end of the catalog.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <aside>
              <div className="sticky top-24">
                <TrendingSection articles={trendingArticles} />
              </div>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </Preloader>
  )
}