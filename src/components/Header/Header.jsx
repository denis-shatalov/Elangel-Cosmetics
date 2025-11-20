import { Link } from "react-router-dom";
import "../../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">Elangel Cosmetics</Link>
        <img src="/images/logo.jpg" alt="" width="80px"/>

        <nav className="nav">
          <Link to="/">Головна</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/details">Деталі</Link>
          <Link to="/delivery">Доставка та оплата</Link>
        </nav>
      </div>
    </header>
  );
}
