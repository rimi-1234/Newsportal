import { Link } from "react-router-dom"
import { TrendingUp } from "lucide-react"
export default function TrendingSection({ articles }){
  const topArticles = articles.slice(0, 5)
  return (<div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold font-serif">Trending Now</h2>
      </div>
      <div className="space-y-4">
        {topArticles.map((article, index) => (
          <Link
            key={article.id}
            to={`/news/${article.slug}`}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{article.views.toLocaleString()} views</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
