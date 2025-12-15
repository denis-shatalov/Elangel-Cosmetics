import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageLoader from "./components/PageLoader/PageLoader";
import { CartProvider } from "./context/CartContext"; // <-- импорт CartProvider

// 👉 ЛЕНИВЫЕ СТРАНИЦЫ
const Home = lazy(() => import("./pages/Home/Home"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const About = lazy(() => import("./pages/About/About"));
const DeliveryPage = lazy(() => import("./pages/Delivery/DeliveryPage"));

export default function App() {
  return (
    <CartProvider> {/* <-- оборачиваем всё в CartProvider */}
      <BrowserRouter>
        <Header />

        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/details" element={<About />} />
              <Route path="/delivery" element={<DeliveryPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
