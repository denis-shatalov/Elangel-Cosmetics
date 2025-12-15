import products from "../../../data/product.json";
import "../../styles/catalog.css";
import { lazy, Suspense } from "react";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";

const ProductCard = lazy(() =>
  import("../../components/ProductCard/ProductCard")
);

export default function Catalog() {
  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Каталог товарів</h2>

      <Suspense
        fallback={
          <div className="catalog-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="catalog-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
