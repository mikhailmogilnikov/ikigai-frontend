import { ApiComponents } from '../..';

const COURSES = [
  'Основы криптовалют и блокчейна',
  'Трейдинг Bitcoin для начинающих',
  'Продвинутый анализ Ethereum',
  'DeFi: Децентрализованные финансы',
  'NFT и цифровое искусство',
  'Смарт-контракты на Solana',
  'Майнинг криптовалют: от теории к практике',
  'Криптопортфель: управление рисками',
  'Web3 разработка: основы',
  'Токенизация активов',
  'Криптовалютная аналитика',
  'Стейблкоины и их применение',
  'Layer 2 решения Ethereum',
  'Криптовалютная безопасность',
  'DAO: Децентрализованные организации',
  'Кроссчейн технологии',
  'Метавселенные и криптовалюты',
  'Криптовалютное налогообложение',
  'Психология крипторынка',
  'Криптовалютные индексы и ETF',
];

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateTransactions = (): ApiComponents['Transaction'][] => {
  const transactions: ApiComponents['Transaction'][] = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date();

  for (let i = 0; i < 20; i++) {
    const date = generateRandomDate(startDate, endDate);
    const amount = Math.floor(Math.random() * (50000 - 5000) + 5000); // Суммы от 5000 до 50000 рублей
    const title = COURSES[Math.floor(Math.random() * COURSES.length)];

    transactions.push({
      id: i + 1,
      invoice_id: `INV-${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
      date: date.toISOString().split('T')[0],
      amount,
      title,
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const MOCK_USER_TRANSACTIONS: ApiComponents['Transaction'][] = generateTransactions();
