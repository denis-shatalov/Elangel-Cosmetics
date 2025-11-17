import { Link } from "react-router-dom";
import "../../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">PINK COSMETICS</Link>

        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/about">О нас</Link>
        </nav>
      </div>
    </header>
  );
}
