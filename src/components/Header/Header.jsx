import { Link } from "react-router-dom";
import "../../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">Elangel Cosmetics</Link>

        <nav className="nav">
          <Link to="/">Головна</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/about">Контакти</Link>
        </nav>
      </div>
    </header>
  );
}
