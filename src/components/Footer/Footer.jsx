import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Elangel Cosmetics</h3>
        <p>© {new Date().getFullYear()} Все права защищены</p>
      </div>
    </footer>
  );
}
