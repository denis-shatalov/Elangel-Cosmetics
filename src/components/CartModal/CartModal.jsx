import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import styles from "./CartModal.module.css";

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart, updateQty } = useCart();
  const [phone, setPhone] = useState("+380");
  const [name, setName] = useState("");

  const totalPrice = cart.reduce((sum, p) => sum + p.qty * p.price, 0);
  const validatePhone = (number) => /^\+380\d{9}$/.test(number);

  // Состояние для инпутов количества
  const [qtyInputs, setQtyInputs] = useState({});

  useEffect(() => {
    const newInputs = {};
    cart.forEach(p => {
      newInputs[p.id] = qtyInputs[p.id] ?? p.qty.toString();
    });
    setQtyInputs(newInputs);
  }, [cart]);

  const handleQtyInputChange = (id, value) => {
    // Разрешаем только цифры или пустое поле
    if (/^\d*$/.test(value)) {
      setQtyInputs(prev => ({ ...prev, [id]: value }));
      if (value !== "" && parseInt(value, 10) > 0) {
        updateQty(id, parseInt(value, 10));
      }
    }
  };

  const handleQtyButton = (id, delta) => {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    const newQty = item.qty + delta;
    if (newQty < 1) return;
    updateQty(id, newQty);
    setQtyInputs(prev => ({ ...prev, [id]: newQty.toString() }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").replace(/^380/, "380");
    setPhone("+380" + value.slice(3, 12));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("❌ Введіть ім'я");
    if (!validatePhone(phone)) return toast.error("❌ Телефон у форматі +380XXXXXXXXX");
    if (cart.length === 0) return toast.error("❌ Корзина порожня");

    const message = `📨 Нова заявка з сайту
---------------------------------
👤 Ім'я: ${name}
📱 Телефон: ${phone}
🛒 Замовлення:
${cart.map(p => `${p.name} × ${p.qty} = ${p.price * p.qty} грн`).join("\n")}
---------------------------------
💰 Загальна сума: ${totalPrice} грн`;

    try {
      await fetch(
        `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID, text: message }),
        }
      );
      toast.success("✅ Заявка успішно відправлена!");
      setPhone("+380");
      setName("");
      clearCart();
      setTimeout(() => onClose(), 2500);
    } catch (err) {
      toast.error("❌ Помилка при відправці");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <h2>Корзина</h2>

        {cart.length === 0 ? <p>Корзина пуста</p> : (
          <>
            <ul className={styles.cartList}>
              {cart.map(p => (
                <li key={p.id} className={styles.cartItem}>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.price}>{p.price} грн</span>

                  <div className={styles.rightControls}>
                    <div className={styles.qtyControls}>
                      <button type="button" onClick={() => handleQtyButton(p.id, -1)} className={styles.qtyBtn}>−</button>
                      <input
                        type="text"
                        value={qtyInputs[p.id] ?? p.qty.toString()}
                        onChange={(e) => handleQtyInputChange(p.id, e.target.value)}
                        className={styles.qtyInput}
                      />
                      <button type="button" onClick={() => handleQtyButton(p.id, 1)} className={styles.qtyBtn}>+</button>
                    </div>
                    <span className={styles.sum}>{p.price * p.qty} грн</span>
                    <button className={styles.remove} onClick={() => { removeFromCart(p.id); toast.info("Товар видалено"); }}>×</button>
                  </div>
                </li>
              ))}
            </ul>

            <button className={styles.clearBtn} onClick={() => { clearCart(); toast.info("Корзину очищено"); }}>Очистити корзину</button>

            <div className={styles.total}><strong>Загальна сума:</strong> {totalPrice} грн</div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Ваше імʼя</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Введіть імʼя" />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">Номер телефону</label>
                <input id="phone" type="tel" inputMode="numeric" value={phone} onChange={handlePhoneChange} placeholder="+380XXXXXXXXX" maxLength={13} />
              </div>
              <button type="submit" className={styles.submitBtn}>Відправити заявку</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
