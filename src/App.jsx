import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import ProductPage from "./pages/ProductPage/ProductPage";
import About from "./pages/About/About";
import DeliveryPage from "./pages/Delivery/DeliveryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/details" element={<About />} />
          <Route path="/delivery" element={<DeliveryPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
