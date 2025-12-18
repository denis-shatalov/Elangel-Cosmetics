import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`🛒 ${product.name} додано в корзину`);
  };

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

        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.meta}>
          <p className={styles.vol}>{product.vol}</p>
          <p className={styles.price}>{product.price} грн</p>
        </div>
      </Link>

      <button className={styles.addBtn} onClick={handleAdd}>
        🛒 Додати до заявки
      </button>
    </div>
  );
}
