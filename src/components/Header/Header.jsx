import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartModal from "../CartModal/CartModal";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, p) => sum + p.qty, 0);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logo}>Elangel Cosmetics</Link>
        <img src="/images/image2vector.svg" alt="Logo" width="70px" />

        {/* Десктоп: навигация + корзина */}
        <div className={styles.navAndCart}>
          <nav className={styles.nav}>
            <Link to="/">Головна</Link>
            <Link to="/catalog">Каталог</Link>
            <Link to="/details">Деталі</Link>
            <Link to="/delivery">Доставка та оплата</Link>
          </nav>
          <button
            className={styles.cartBtn}
            onClick={() => setCartOpen(true)}
          >
            🛒 {totalItems > 0 && totalItems}
          </button>
        </div>

        {/* Мобильные контролы: бургер + корзина рядом */}
        <div className={styles.mobileControls}>
          <button
            className={styles.cartBtnMobile}
            onClick={() => setCartOpen(true)}
          >
            🛒 {totalItems > 0 && totalItems}
          </button>
          <div
            className={`${styles.burger} ${isMenuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <Link to="/" onClick={toggleMenu}>Головна</Link>
        <Link to="/catalog" onClick={toggleMenu}>Каталог</Link>
        <Link to="/details" onClick={toggleMenu}>Деталі</Link>
        <Link to="/delivery" onClick={toggleMenu}>Доставка та оплата</Link>
      </div>

      {/* Модалка корзины */}
      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
