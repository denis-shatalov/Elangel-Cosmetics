import { Link } from "react-router-dom";
import "../../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Вітаємо в Elangel Cosmetics</h1>
      <p className="home-subtitle">
        Професійний догляд за вашим волоссям
      </p>

      <Link to="/catalog" className="home-btn">
        До каталогу
      </Link>
    </div>
  );
}
