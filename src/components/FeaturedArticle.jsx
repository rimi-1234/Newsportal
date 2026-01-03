import { Link } from "react-router-dom"
import { formatDate } from "../lib/utils"
export default function FeaturedArticle({ article }){
  return (
    <Link to={`/news/${article.slug}`}>
      <article className="group relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-8 cursor-pointer">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
        <img
          src={article.coverImage || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {article.category}
            </span>
            <span className="text-white/70 text-xs">{formatDate(article.publishDate)}</span>
          </div>
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-3 font-serif text-balance leading-tight">
            {article.title}
          </h2>
          <p className="text-white/90 text-sm md:text-base line-clamp-2">{article.description}</p>
        </div>
      </article>
    </Link>
  )
}
