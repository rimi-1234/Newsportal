import { Link } from "react-router-dom"
import { formatDate } from "../lib/utils"
export default function NewsCard({ article }){
  return (
    <Link to={`/news/${article.slug}`}>
      <article className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={article.thumbnail || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="bg-accent text-accent-foreground px-2.5 py-0.5 rounded text-xs font-semibold">
              {article.category}
            </span>
            <span className="text-muted-foreground text-xs whitespace-nowrap">{formatDate(article.publishDate)}</span>
          </div>
          <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">{article.description}</p>
        </div>
      </article>
    </Link>
  )
}
