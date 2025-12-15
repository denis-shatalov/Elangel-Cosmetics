import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.link}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>{product.price} грн</p>
      <button className={styles.addBtn} onClick={() => addToCart(product)}>
        🛒 Додати
      </button>
    </div>
  );
}
