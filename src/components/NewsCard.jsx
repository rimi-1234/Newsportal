import { Link } from "react-router-dom"
import { motion } from "framer-motion" // Import motion
import { formatDate } from "../lib/utils"

export default function NewsCard({ article }) {
  return (
    <Link to={`/news/${article.slug}`}>
      <motion.article
        // --- Weighted Slow Hover Effect ---
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="group bg-card rounded-lg overflow-hidden cursor-pointer h-full flex flex-col border border-border/50"
        transition={{ type: "spring", stiffness: 40, damping: 15 }} // Slow-motion physics
      >
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <motion.img
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.08 } // Very slow, smooth zoom
            }}
            transition={{ duration: 1.2, ease: "easeOut" }} // Extra slow zoom
            src={article.thumbnail || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          
          {/* Subtle Overlay on hover */}
          <motion.div 
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 0.1 }
            }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="bg-accent text-accent-foreground px-2.5 py-0.5 rounded text-xs font-semibold">
              {article.category}
            </span>
            <span className="text-muted-foreground text-xs whitespace-nowrap">
              {formatDate(article.publishDate)}
            </span>
          </div>

          <motion.h3 
            variants={{
              rest: { x: 0 },
              hover: { x: 4 } // Small, slow movement to the right
            }}
            transition={{ duration: 0.6 }}
            className="font-serif text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-500"
          >
            {article.title}
          </motion.h3>

          <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">
            {article.description}
          </p>
          
          {/* Subtle slow-motion underline appear on hover */}
          <motion.div 
            variants={{
              rest: { width: 0 },
              hover: { width: "100%" }
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-0.5 bg-primary/30 mt-4 rounded-full"
          />
        </div>
      </motion.article>
    </Link>
  )
}