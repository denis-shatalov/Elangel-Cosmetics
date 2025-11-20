import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/home.css";

export default function Home() {
  // --- КАРУСЕЛЬ ОТЗЫВОВ ---
  const reviews = [
    { id: 1, name: "Олена", text: "Дуже якісна косметика, волосся стало набагато м'якішим!" },
    { id: 2, name: "Ірина", text: "Шампунь безсульфатний просто топ! Рекомендую всім." },
    { id: 3, name: "Марія", text: "Маска ліпідна — найкраща, що я пробувала. Результат відчутний!" }
  ];

  const images = [
  { id: 1, src: "/images/IMG1.jpg", alt: "Косметика 1" },
  { id: 2, src: "/images/IMG3.jpg", alt: "Косметика 3" },
  { id: 3, src: "/images/IMG4.jpg", alt: "Косметика 4" },
  { id: 4, src: "/images/IMG5.jpg", alt: "Косметика 5" },
  { id: 5, src: "/images/IMG6.jpg", alt: "Косметика 6" },
  { id: 6, src: "/images/IMG7.jpg", alt: "Косметика 7" }
];

  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;


  const [current, setCurrent] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage(prev => (prev + 1) % images.length); // правильно для 7 картинок
  }, 5000);
  return () => clearInterval(interval);
}, []);


  // --- ФОРМА ---
  const [phone, setPhone] = useState("+380");
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validatePhone = (number) => {
    return /^\+380\d{9}$/.test(number);
  };

  // защита префикса +380
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // только цифры после +380
    value = value.replace(/\D/g, "").replace(/^380/, "380");

    // добавляем префикс
    value = "+380" + value.slice(3, 12);

    setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    const message = `
📨 Нова заявка з сайту Elangel Cosmetics
---------------------------------
📱 Телефон: ${phone}
💬 Коментар: ${comment || "немає"}
`;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      setSuccess(true);
      setPhone("+380");
      setComment("");
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      console.error("Помилка Telegram:", error);
      alert("Помилка при відправці. Спробуйте ще раз.");
    }
  };

  return (
    <div>

      {/* ГЛАВНЫЙ БЛОК */}
      <div className="home-container">
        <h1 className="home-title">Вітаємо в Elangel Cosmetics</h1>
        <p className="home-subtitle">Професійний догляд за вашим волоссям</p>

        <Link to="/catalog" className="home-btn">
          До каталогу
        </Link>
      </div>

      {/* --- ФОРМА ЗАЯВКИ --- */}
      <div className="home-order">
        <h2 className="section-title">Залишити заявку</h2>

        <form className="order-form" onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Ваш номер телефону"
            value={phone}
            onChange={handlePhoneChange}
            required
            className={!isValid ? "input-error" : ""}
          />

          {!isValid && (
            <p className="error-text">
              Введіть коректний номер телефону (приклад: +380971234567)
            </p>
          )}

          <textarea
            placeholder="Коментар (необов'язково)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit">Відправити</button>
        </form>

        {success && (
          <p className="form-success">Дякуємо! Ми скоро звʼяжемося ❤️</p>
        )}
      </div>

    <div className="home-carousel">
  <div
    className="carousel-track"
    style={{
      transform: `translateX(-${currentImage * (300 + 20) - (window.innerWidth/2 - 160)}px)`
    }}
  >
    {images.map((img, index) => (
      <img
        key={img.id}
        src={img.src}
        alt={img.alt}
        className={`carousel-image ${index === currentImage ? "active" : ""}`}
      />
    ))}
  </div>
</div>




      {/* --- ВІДГУКИ --- */}
      <div className="home-reviews">
        <h2 className="section-title">Відгуки клієнтів</h2>

        <div className="review-card">
          <p className="review-text">"{reviews[current].text}"</p>
          <p className="review-author">— {reviews[current].name}</p>
        </div>
      </div>

    </div>
  );
}
