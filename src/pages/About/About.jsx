import "../../styles/about.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>Про Нас</h1>
      <p>
        Elangel Cosmetics — це бренд професійної косметики для догляду за волоссям з Незламного Харкова.
        Ми пропонуємо тільки якісні продукти, перевірені та безпечні для щоденного
        використання.
      </p>

      <h2>Наша місія</h2>
      <p>
        Допомагати людям відчувати себе впевнено і доглядати за собою без шкоди для здоров’я.
      </p>

      <h2>Контактна інформація</h2>
      <p>Email: info@elangel-cosmetics.com</p>
          <p>Телефон: +380971234567</p>
          <p>Адреса: м. Харків, вул. Греківська, буд. 3</p>

          <div className="socials">
  <h3>Слідкуйте за нами:</h3>
  <a 
    href="https://www.instagram.com/elangel_cosmetics/" 
    target="_blank" 
    rel="noopener noreferrer"
  >Instagram</a>
</div>


      <img src="/images/logo.jpg" alt="Elangel Logo" width="200px" />
    </div>
  );
}
