import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NewsDetail from "./pages/NewsDetail"

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:slug" element={<NewsDetail />} />
    </Routes>
  )
}
