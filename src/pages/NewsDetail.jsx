import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Eye } from "lucide-react"
import Header from "../components/Header"
import NewsCard from "../components/NewsCard"
import SkeletonCard from "../components/SkeletonCard"
import { formatDate } from "../lib/utils"
import newsData from "../data/news.json"

export default function NewsDetail(){
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const foundArticle = newsData.articles.find((a) => a.slug === slug)
    setArticle(foundArticle || null)
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [slug])
  if (loading || !slug){
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkeletonCard />
        </main>
      </div>
    )
  }

  if (!article){
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Article not found</h1>
            <p className="text-muted-foreground mb-4">Sorry, we couldn&apos;t find this article.</p>
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // Get related articles (same category)
  const relatedArticles = newsData.articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3)
  return (
    <div className="min-h-screen bg-background">
      <Header activeCategory={article.category} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to all news
        </Link>

        {/* Article Content */}
        <article>
          {/* Cover Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-8">
            <img
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              {article.category}
            </span>
            <time className="text-muted-foreground text-sm">{formatDate(article.publishDate)}</time>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Eye className="w-4 h-4" />
              <span>{article.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 leading-tight text-balance">{article.title}</h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{article.description}</p>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-foreground text-base leading-relaxed mb-6 text-balance">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (<div className="border-t border-border pt-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
