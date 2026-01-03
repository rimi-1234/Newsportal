import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { formatDate } from "../lib/utils"

export default function FeaturedArticle({ article }) {
  return (
    <Link to={`/news/${article.slug}`}>
      <motion.article 
        className="group relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8 cursor-pointer shadow-2xl"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* 1. Slow Darkening Overlay */}
        <motion.div 
          variants={{
            rest: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
            hover: { backgroundColor: "rgba(0, 0, 0, 0.6)" }
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-10" 
        />

        {/* 2. Ken Burns Zoom Effect */}
        <motion.img
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 2.5, ease: "easeOut" }} // Very slow, majestic zoom
          src={article.coverImage || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover"
        />

        {/* 3. Parallax Content Section */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-20">
          <motion.div
            variants={{
              rest: { y: 0 },
              hover: { y: -10 } // Subtle lift on hover
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                {article.category}
              </motion.span>
              <span className="text-white/80 text-xs font-medium">
                {formatDate(article.publishDate)}
              </span>
            </div>

            <motion.h2 
              variants={{
                rest: { x: 0 },
                hover: { x: 10 } // Cinematic slide
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-white text-3xl md:text-5xl font-bold mb-4 font-serif text-balance leading-[1.1]"
            >
              {article.title}
            </motion.h2>

            <motion.p 
              variants={{
                rest: { opacity: 0.9, y: 0 },
                hover: { opacity: 1, y: -5 }
              }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-white/90 text-sm md:text-lg line-clamp-2 max-w-2xl leading-relaxed"
            >
              {article.description}
            </motion.p>
          </motion.div>

          {/* 4. Slow motion decorative line */}
          <motion.div 
            variants={{
              rest: { width: "40px", opacity: 0.5 },
              hover: { width: "120px", opacity: 1 }
            }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-1 bg-primary mt-6 rounded-full"
          />
        </div>
      </motion.article>
    </Link>
  )
}