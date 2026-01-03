import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ children }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500); // Small pause at 100%
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32">
              {/* Circular Background Trace */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64" cy="64" r="60"
                  stroke="currentColor" strokeWidth="4"
                  fill="transparent" className="text-muted/20"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="64" cy="64" r="60"
                  stroke="currentColor" strokeWidth="4"
                  fill="transparent" className="text-primary"
                  strokeDasharray="377"
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
                  transition={{ duration: 0.1 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-serif text-xl font-bold">
                {progress}%
              </div>
            </div>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 text-sm tracking-widest uppercase text-muted-foreground"
            >
              Curating Stories...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
}