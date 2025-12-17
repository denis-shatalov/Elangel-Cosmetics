import { useState } from "react";
import { useCart } from "../../context/CartContext";
import styles from "./CartModal.module.css";

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart, updateQty } = useCart();
  const [phone, setPhone] = useState("+380");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const totalPrice = cart.reduce((sum, p) => sum + p.qty * p.price, 0);

  if (!isOpen) return null;

  const validatePhone = (number) => /^\+380\d{9}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Введіть ім'я");
      return;
    }

    if (!validatePhone(phone)) {
      alert("Введіть правильний номер телефону у форматі +380XXXXXXXXX");
      return;
    }

    if (cart.length === 0) {
      alert("Корзина порожня");
      return;
    }

    const message = `📨 Нова заявка з сайту
---------------------------------
👤 Ім'я: ${name}
📱 Телефон: ${phone}
🛒 Замовлення:
${cart.map(p => `${p.name} × ${p.qty} = ${p.price * p.qty} грн`).join("\n")}
---------------------------------
💰 Загальна сума: ${totalPrice} грн`;

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
      setSuccess(true);
      setPhone("+380");
      setName("");
      clearCart();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Помилка при відправці. Спробуйте ще раз.");
    }
  };

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    updateQty(id, qty);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <h2>Корзина</h2>

        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <>
            <ul className={styles.cartList}>
              {cart.map(p => (
                <li key={p.id} className={styles.cartItem}>
                  <span className={styles.name}>{p.name}</span>
                  <div className={styles.rightControls}>
                    <input
                      type="number"
                      min={1}
                      value={p.qty}
                      onChange={(e) => handleQtyChange(p.id, +e.target.value)}
                      className={styles.qtyInput}
                    />
                    <span className={styles.sum}>{p.price * p.qty} грн</span>
                    <button className={styles.remove} onClick={() => removeFromCart(p.id)}>×</button>
                  </div>
                </li>
              ))}
            </ul>

            <button className={styles.clearBtn} onClick={clearCart}>
              Очистити корзину
            </button>

            <div className={styles.total}>
              <strong>Загальна сума:</strong> {totalPrice} грн
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ваше ім'я"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Телефон +380XXXXXXXXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitBtn}>
                Відправити заявку
              </button>
              {success && <p className={styles.success}>Заявка відправлена!</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
