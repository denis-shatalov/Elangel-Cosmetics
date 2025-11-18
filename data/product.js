import bezsulfaniy from '../assets/bezsulfaniy.jpg';
import konditioner from '../assets/konditioner.jpg';
import lipmask from '../assets/lipmask.jpg';

const products = [
  {
    id: 1,
    name: "Шампунь для щоденного застосування",
    price: 700,
    vol: "1 л",
    description: "Нежная пенка с ромашкой для ежедневного очищения кожи.",
    image: bezsulfaniy,
    category: "Догляд за волоссям"
  },
  {
    id: 2,
    name: "Кондиціонер для щоденного застосування",
    price: 800,
    vol: "1 л",
    description: "Глубокое увлажнение на 24 часа.",
    image: konditioner,
    category: "Догляд за волоссям"
  },
  {
    id: 3,
    name: "Безсульфатний шампунь",
    price: 400,
    vol: "400 мл",
    description: "Выравнивает тон кожи, придает сияние.",
    image: bezsulfaniy,
    category: "Догляд за волоссям"
  },
  {
    id: 4,
    name: "Ліпідна маска",
    price: 700,
    vol: "500 г",
    description: "Для гладкості і блиску волосся",
    image: lipmask,
    category: "Догляд за волоссям"
  },
  {
    id: 5,
    name: "Маска вотох",
    price: 800,
    vol: "500 г",
    description: "Для реконструкціі волосяя",
    image: lipmask,
    category: "Догляд за волоссям"
  },
  {
    id: 6,
    name: "Олія для волосся",
    price: 600,
    vol: "30 мл",
    description: "Парфумована олія для волосся",
    image: lipmask,
    category: "Догляд за волоссям"
  }
];

export default products;
