import { useParams } from "react-router-dom";
import products from "../../../data/product.json";
import "../../styles/product.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="product-not-found">Товар не найден</div>;
  }

  return (
    <div className="product-container">
      <div className="product-grid">
        <div className="image-wrapper">
          {!imgLoaded && <div className="image-skeleton" />}

          <img
            src={product.image}
            alt={product.name}
            className={`product-image ${imgLoaded ? "loaded" : ""}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">{product.price} грн</p>
          <p className="product-desc">{product.vol}</p>
          <p className="product-desc">{product.description}</p>

          <button
            className="product-btn"
            onClick={() => addToCart(product)}
          >
            🛒 Додати до заявки
          </button>
        </div>
      </div>
    </div>
  );
}
