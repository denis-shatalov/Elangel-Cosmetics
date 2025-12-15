// src/components/CartModal/CartModal.jsx
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import styles from "./CartModal.module.css";

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    if (!cart.length) return;

    const message = `📨 Нова заявка з сайту Elangel Cosmetics
---------------------------------
🛒 Товари:
${cart.map(p => `${p.name} x ${p.qty}`).join("\n")}
`;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
      setSuccess(true);
      clearCart();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Помилка Telegram:", error);
      alert("Помилка при відправці. Спробуйте ще раз.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>Ваша корзина</h2>
        {cart.length === 0 && <p className={styles.empty}>Корзина пуста</p>}
        {cart.map(item => (
          <div key={item.id} className={styles.item}>
            <span>{item.name} x {item.qty}</span>
            <button className={styles.remove} onClick={() => removeFromCart(item.id)}>❌</button>
          </div>
        ))}
        {cart.length > 0 && (
          <button className={styles.send} onClick={handleSend}>
            {success ? "Відправлено ✅" : "Відправити заявку"}
          </button>
        )}
      </div>
    </div>
  );
}
