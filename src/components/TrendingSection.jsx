import { Link } from "react-router-dom"
import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion" // Import motion

export default function TrendingSection({ articles }) {
  const topArticles = articles.slice(0, 5)

  // Variants for the staggered list entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slow sequence
        delayChildren: 0.4,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, ease: "easeOut" } 
    },
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-card rounded-xl p-6 border border-border sticky top-24"
    >
      <div className="flex items-center gap-2 mb-6">
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <TrendingUp className="w-5 h-5 text-primary" />
        </motion.div>
        <h2 className="text-xl font-bold font-serif">Trending Now</h2>
      </div>

      <div className="space-y-2">
        {topArticles.map((article, index) => (
          <motion.div key={article.id} variants={itemVariants}>
            <Link
              to={`/news/${article.slug}`}
              className="flex items-start gap-4 p-3 rounded-lg group transition-colors duration-700"
            >
              {/* Animated Number Circle */}
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 50 }}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md"
              >
                {index + 1}
              </motion.div>

              <div className="flex-grow min-w-0">
                <motion.h3 
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.4 }}
                  className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors duration-500"
                >
                  {article.title}
                </motion.h3>
                
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">
                    {article.views.toLocaleString()} views
                  </p>
                  {/* Slow progress bar based on views placeholder */}
                  <div className="h-1 flex-grow bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }} // This could be dynamic based on view counts
                      transition={{ duration: 2, delay: 1, ease: "circOut" }}
                      className="h-full bg-primary/20"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}