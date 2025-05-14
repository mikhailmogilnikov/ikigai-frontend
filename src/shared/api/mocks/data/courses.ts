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

export const MOCK_LESSON_FULL: ApiComponents['FullLesson'][] = [
  {
    id: '5',
    title: 'Context API',
    order: 2,
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
  },
  {
    id: '6',
    title: 'Redux Toolkit',
    order: 3,
    is_completed: false,
    video: {
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster_url: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    },
    content: `
# Redux Toolkit: Современный подход к управлению состоянием

## Введение

Redux Toolkit — это официальный, рекомендуемый способ написания Redux логики. Он включает в себя несколько полезных утилит, которые помогают упростить многие общие случаи использования Redux.

### Основные преимущества Redux Toolkit:

1. Упрощенная настройка хранилища
2. Встроенная поддержка Immer для иммутабельных обновлений
3. Автоматическая генерация action creators
4. Встроенная поддержка Redux Thunk

## Пример использования

\`\`\`typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    }
  }
});

const store = configureStore({
  reducer: counterSlice.reducer
});
\`\`\`

## Лучшие практики

1. Используйте \`createSlice\` вместо ручного создания редьюсеров
2. Применяйте \`createAsyncThunk\` для асинхронных операций
3. Организуйте код по функциональным модулям
4. Используйте TypeScript для типизации

> Redux Toolkit значительно упрощает работу с Redux, делая код более чистым и поддерживаемым.

## Дополнительные ресурсы

* [Официальная документация Redux Toolkit](https://redux-toolkit.js.org)
* [Примеры использования на GitHub](https://github.com/reduxjs/redux-toolkit)
* [Видео-курс по Redux Toolkit](https://example.com/redux-course)

## Задание

Попробуйте реализовать простое приложение со списком задач, используя Redux Toolkit для управления состоянием.

Если у вас возникли вопросы, [напишите нам](mailto:support@example.com).
`,
    tests: [
      {
        id: '3',
        title: 'Основы Redux Toolkit',
        order: 1,
        lesson_id: '6',
        variants: [
          {
            id: '1',
            title: 'createSlice автоматически генерирует action creators',
            is_correct: true,
            description: 'createSlice автоматически создает action creators на основе определенных reducers',
            order: 1,
          },
          {
            id: '2',
            title: 'Redux Toolkit требует ручного создания action creators',
            is_correct: false,
            description: null,
            order: 2,
          },
          {
            id: '3',
            title: 'Action creators нужно создавать отдельно от slice',
            is_correct: false,
            description: null,
            order: 3,
          },
        ],
      },
      {
        id: '4',
        title: 'Асинхронные операции в Redux Toolkit',
        order: 2,
        lesson_id: '6',
        variants: [
          {
            id: '1',
            title: 'Используйте createAsyncThunk',
            is_correct: true,
            description: 'createAsyncThunk - рекомендуемый способ обработки асинхронных операций',
            order: 1,
          },
          {
            id: '2',
            title: 'Всегда используйте обычные thunks',
            is_correct: false,
            description: null,
            order: 2,
          },
          {
            id: '3',
            title: 'Асинхронные операции не поддерживаются',
            is_correct: false,
            description: null,
            order: 3,
          },
        ],
      },
    ],
  },
];
