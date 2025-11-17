import { Link } from "react-router-dom";
import "../../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Добро пожаловать в PINK COSMETICS</h1>
      <p className="home-subtitle">
        Натуральная косметика с любовью к вашей коже
      </p>

      <Link to="/catalog" className="home-btn">
        Перейти в каталог
      </Link>
    </div>
  );
}
