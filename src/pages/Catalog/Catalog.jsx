import products from "../../../data/product.json";
import { Link } from 'react-router-dom';
import '../../styles/catalog.css';

export default function Catalog() {
  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Каталог товарів</h2>
      <div className="catalog-grid">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="catalog-card">
            <img src={product.image} alt={product.name} className="catalog-image" />
            <h3 className="catalog-name">{product.name}</h3>
            <p className="catalog-price">{product.price} грн</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
