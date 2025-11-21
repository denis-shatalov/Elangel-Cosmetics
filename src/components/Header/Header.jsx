// Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">Elangel Cosmetics</Link>
        <img src="/images/logo.jpg" alt="Logo" width="80px" />

        {/* Десктоп навигация */}
        <nav className="nav">
          <Link to="/">Головна</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/details">Деталі</Link>
          <Link to="/delivery">Доставка та оплата</Link>
        </nav>

        {/* Бургер для мобилок */}
        <div className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Модальное меню */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={toggleMenu}>Головна</Link>
          <Link to="/catalog" onClick={toggleMenu}>Каталог</Link>
          <Link to="/details" onClick={toggleMenu}>Деталі</Link>
          <Link to="/delivery" onClick={toggleMenu}>Доставка та оплата</Link>
        </div>
      </div>
    </header>
  );
}
