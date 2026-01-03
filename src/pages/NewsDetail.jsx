import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Eye } from "lucide-react"
import Header from "../components/Header"
import NewsCard from "../components/NewsCard"
import SkeletonCard from "../components/SkeletonCard"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader" // 1. Import your Preloader
import { formatDate } from "../lib/utils"
import newsData from "../data/news.json"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut" } 
  }
}

export default function NewsDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    const foundArticle = newsData.articles.find((a) => a.slug === slug)
    setArticle(foundArticle || null)
    
    // 2. Matching the Preloader's natural timing
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [slug])

  // Related articles logic
  const relatedArticles = article 
    ? newsData.articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)
    : []

  if (!loading && !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">Article not found</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    // 3. Wrap the entire page content in the Preloader
    <Preloader>
      <div className="min-h-screen bg-background">
         <Header />
        
        <motion.main 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {loading ? (
            <SkeletonCard />
          ) : (
            <>
              <motion.div variants={fadeUpVariants}>
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm font-medium group">
                  <motion.span whileHover={{ x: -4 }} transition={{ duration: 0.3 }}>
                    <ArrowLeft className="w-4 h-4" />
                  </motion.span>
                  Back to all news
                </Link>
              </motion.div>

              <article>
                <motion.div 
                  variants={fadeUpVariants}
                  className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-10 shadow-2xl"
                >
                  <motion.img
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    src={article.coverImage || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {article.category}
                  </span>
                  <time className="text-muted-foreground text-sm font-medium">{formatDate(article.publishDate)}</time>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                </motion.div>

                <motion.h1 
                  variants={fadeUpVariants}
                  className="font-serif text-3xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-balance"
                >
                  {article.title}
                </motion.h1>

                <motion.p 
                  variants={fadeUpVariants}
                  className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed font-light"
                >
                  {article.description}
                </motion.p>

                <div className="prose prose-lg max-w-none mb-16">
                  {article.content.map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      variants={fadeUpVariants}
                      className="text-foreground text-lg leading-loose mb-8 text-balance font-serif"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </article>

              {relatedArticles.length > 0 && (
                <motion.div variants={fadeUpVariants} className="border-t border-border pt-16 mt-16">
                  <h2 className="text-3xl font-serif font-bold mb-8">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedArticles.map((relatedArticle) => (
                      <NewsCard key={relatedArticle.id} article={relatedArticle} />
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.main>
        <Footer />
      </div>
    </Preloader>
  )
}