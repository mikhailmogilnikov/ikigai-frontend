import { ApiComponents } from '../..';

export const MOCK_COURSES_SHOP_LIST: ApiComponents['ShopCourse'][] = [
  {
    id: '1',
    title: 'Основы программирования на Python',
    image_url: 'https://placehold.co/600x400',
    lessons_amount: 24,
    price: 4990,
    modules_amount: 6,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-01',
  },
  {
    id: '2',
    title: 'Веб-разработка: React + TypeScript',
    image_url: 'https://placehold.co/600x400',
    lessons_amount: 32,
    price: 7990,
    modules_amount: 8,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-15',
  },
  {
    id: '3',
    title: 'Анализ данных с помощью SQL',
    image_url: 'https://placehold.co/600x400',
    lessons_amount: 18,
    price: 3490,
    modules_amount: 4,
    createdAt: '2024-01-01',
    updatedAt: '2024-02-28',
  },
  {
    id: '4',
    title: 'DevOps практики для начинающих',
    image_url: 'https://placehold.co/600x400',
    lessons_amount: 28,
    price: 6490,
    modules_amount: 7,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-10',
  },
  {
    id: '5',
    title: 'Мобильная разработка на Flutter',
    image_url: 'https://placehold.co/600x400',
    lessons_amount: 36,
    price: 8990,
    modules_amount: 9,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-20',
  },
];

export const MOCK_COURSES_MY_LIST: ApiComponents['MyCourse'][] = [
  {
    id: '6',
    title: 'Веб-разработка: React + TypeScript',
    image_url: 'https://placehold.co/600x400',
    lessons_amount: 32,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-15',
    completed_lessons_amount: 24,
  },
  {
    id: '7',
    title: 'Анализ данных с помощью SQL',
    image_url: 'https://placehold.co/600x400',
    lessons_amount: 18,
    createdAt: '2024-01-01',
    updatedAt: '2024-02-28',
    completed_lessons_amount: 18,
  },
  {
    id: '8',
    title: 'Мобильная разработка на Flutter',
    image_url: 'https://placehold.co/600x400',
    lessons_amount: 36,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-20',
    completed_lessons_amount: 8,
  },
];

export const MOCK_COURSE_FULL: ApiComponents['FullCourse'] = {
  id: '2',
  title: 'Веб-разработка: React + TypeScript',
  description:
    'Практический курс по разработке современных веб-приложений с использованием React и TypeScript. Изучите основы компонентного подхода, управление состоянием, работу с API и многое другое.',
  image_url: 'https://placehold.co/600x400',
  lessons_amount: 32,
  price: 7990,
  modules_amount: 8,
  createdAt: '2024-02-01',
  updatedAt: '2024-03-15',
  is_purchased: true,
  is_finished: false,
  completed_lessons_amount: 24,
  modules: [
    {
      id: '1',
      title: 'Введение в React и TypeScript',
      order: 1,
      lessons: [
        {
          id: '1',
          title: 'Настройка окружения разработки',
          order: 1,
          is_completed: true,
        },
        {
          id: '2',
          title: 'Основы TypeScript',
          order: 2,
          is_completed: true,
        },
        {
          id: '3',
          title: 'Первые компоненты React',
          order: 3,
          is_completed: true,
        },
      ],
    },
    {
      id: '2',
      title: 'Управление состоянием',
      order: 2,
      lessons: [
        {
          id: '4',
          title: 'Хуки useState и useEffect',
          order: 1,
          is_completed: true,
        },
        {
          id: '5',
          title: 'Context API',
          order: 2,
          is_completed: false,
        },
        {
          id: '6',
          title: 'Redux Toolkit',
          order: 3,
          is_completed: false,
        },
      ],
    },
  ],
};

export const MOCK_COURSE_LESSONS: ApiComponents['CourseLessons'] = {
  ...MOCK_COURSE_FULL,
  completed_lessons_amount: 24,
};

export const MOCK_LESSON_FULL: ApiComponents['FullLesson'] = {
  id: '1',
  title: 'Настройка окружения разработки',
  order: 1,
  is_completed: true,
  video: {
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster_url: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
  },
  content: `
*Добро пожаловать* на курс **"Основы программирования"**! Этот курс поможет вам освоить базовые принципы разработки программного обеспечения.

### О чем этот курс?

В этом курсе мы рассмотрим:

1. Введение в алгоритмы
2. Основы синтаксиса языков программирования
3. Структуры данных
   - Массивы
   - Списки
   - Словари
4. Объектно-ориентированное программирование

> Программирование — это искусство организации сложности.
> 
> — Эдсгер Дейкстра

---

## Модуль 1: Алгоритмы

![Схема алгоритма](https://placehold.co/600x400)

Алгоритм — это последовательность действий, решающая определенную задачу. Вот пример простого алгоритма:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

## Ссылки на дополнительные материалы

* [Курс алгоритмов на Coursera](https://www.coursera.org)
* [Книга "Алгоритмы: построение и анализ"](https://example.com/book)

## Контактная информация

Если у вас возникли вопросы, [свяжитесь с нами](mailto:support@example.com).
`,
  tests: [
    {
      id: '1',
      title: 'Тест 1',
      order: 1,
      lesson_id: '1',
      variants: [
        {
          id: '1',
          title: 'Вариант 1',
          is_correct: true,
          description: 'Описание варианта 1',
          order: 1,
        },
        {
          id: '2',
          title: 'Вариант 2',
          is_correct: false,
          description: null,
          order: 2,
        },
        {
          id: '3',
          title: 'Вариант 3',
          is_correct: false,
          description: null,
          order: 3,
        },
      ],
    },
    {
      id: '2',
      title: 'Тест 2',
      order: 2,
      lesson_id: '1',
      variants: [
        {
          id: '1',
          title: 'Вариант 1',
          is_correct: false,
          description: null,
          order: 1,
        },
        {
          id: '2',
          title: 'Вариант 2',
          is_correct: false,
          description: null,
          order: 2,
        },
        {
          id: '3',
          title: 'Вариант 3',
          is_correct: true,
          description: 'Описание варианта 3',
          order: 3,
        },
      ],
    },
  ],
};
