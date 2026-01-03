import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: "easeOut" } 
    }
  }

  const linkHover = {
    scale: 1.05,
    x: 5,
    transition: { duration: 0.4 }
  }

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible" // Only animates when the user scrolls down to it
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-card border-t border-border mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-primary">
              NewsPortal
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Delivering high-fidelity journalism and real-time updates with a cinematic perspective on world events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Categories</h4>
            <ul className="space-y-4">
              {["National", "Technology", "Business", "Sports", "Entertainment"].map((item) => (
                <motion.li key={item} whileHover={linkHover}>
                  <Link to={`/?category=${item}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                <motion.li key={item} whileHover={linkHover}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with our slowest, most cinematic news delivery.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button className="absolute right-1 top-1 bg-primary text-primary-foreground p-1.5 rounded-md hover:opacity-90 transition-opacity">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">
            © {currentYear} GeminiNews Media Group. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}