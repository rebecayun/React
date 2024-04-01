import { Routes, Route } from "react-router-dom";
import { History } from "./pages/History";
import { Home } from "./pages/Home";

export function Router () {
  return (
    <Routes>
      <Route path="/history" element={<History />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
