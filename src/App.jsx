import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailView from "./pages/DetailView";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import FavoritesPage from "./pages/Favorites";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokemon/:id" element={<DetailView />}></Route>
        <Route path="/favorites" element={<FavoritesPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
