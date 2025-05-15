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
          is_completed: false,
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

export const MOCK_LESSONS_FULL: ApiComponents['FullLesson'][] = [
  {
    id: '1',
    title: 'Настройка окружения разработки',
    order: 1,
    is_completed: true,
    video: {
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster_url: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    },
    content:
      '# Настройка окружения разработки\n\nБазовое руководство по настройке окружения для разработки на React и TypeScript.',
    tests: [],
  },
  {
    id: '2',
    title: 'Основы TypeScript',
    order: 2,
    is_completed: true,
    video: {
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      poster_url: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    },
    content: '',
    tests: [],
  },
  {
    id: '3',
    title: 'Первые компоненты React',
    order: 3,
    is_completed: true,
    video: {
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      poster_url: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    },
    content: '# Первые компоненты React\n\nСоздание и использование компонентов в React.',
    tests: [],
  },
  {
    id: '4',
    title: 'Хуки useState и useEffect',
    order: 1,
    is_completed: true,
    video: {
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      poster_url: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    },
    content:
      '# Хуки useState и useEffect\n\nИзучение основных хуков React для управления состоянием и побочными эффектами.',
    tests: [],
  },
  {
    id: '5',
    title: 'Context API',
    order: 2,
    is_completed: false,
    video: {
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster_url: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    },
    content: `

## Введение в Context API

Context API - это встроенный в React механизм для передачи данных через дерево компонентов без необходимости передавать пропсы на каждом уровне.

### Основные концепции:

1. **Context Provider** - компонент, который предоставляет данные
2. **Context Consumer** - компонент, который потребляет данные
3. **useContext** - хук для доступа к контексту

### Пример использования:

\`\`\`typescript
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Использование в компоненте
const Component = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>
      Текущая тема: {theme}
    </button>
  );
};
\`\`\`

## Когда использовать Context API?

- Для глобальных данных (тема, язык, авторизация)
- Когда нужно избежать prop drilling
- Для данных, которые редко меняются

> Context API отлично подходит для управления глобальным состоянием в небольших и средних приложениях.

## Лучшие практики

1. Разделяйте контексты по функциональности
2. Используйте мемоизацию для оптимизации
3. Избегайте частых обновлений контекста
4. Создавайте отдельные провайдеры для разных частей приложения`,
    tests: [
      {
        id: '1',
        title: 'Основы Context API',
        order: 1,
        lesson_id: '5',
        variants: [
          {
            id: '1',
            title: 'Context API используется для передачи данных через дерево компонентов без prop drilling',
            is_correct: true,
            description:
              'Это основное предназначение Context API - избежать передачи пропсов через промежуточные компоненты',
            order: 1,
          },
          {
            id: '2',
            title: 'Context API можно использовать только для передачи строковых значений',
            is_correct: false,
            description: null,
            order: 2,
          },
          {
            id: '3',
            title: 'Context API работает только с функциональными компонентами',
            is_correct: false,
            description: null,
            order: 3,
          },
        ],
      },
      {
        id: '2',
        title: 'Использование useContext',
        order: 2,
        lesson_id: '5',
        variants: [
          {
            id: '1',
            title: 'useContext можно использовать только внутри Provider',
            is_correct: true,
            description: 'Хук useContext требует, чтобы компонент был обернут в соответствующий Provider',
            order: 1,
          },
          {
            id: '2',
            title: 'useContext работает с любым объектом, не только с контекстом',
            is_correct: false,
            description: null,
            order: 2,
          },
          {
            id: '3',
            title: 'useContext можно использовать вне React-компонентов',
            is_correct: false,
            description: null,
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
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      poster_url: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    },
    content: `# Redux Toolkit

## Введение в Redux Toolkit

Redux Toolkit - это официальный, рекомендуемый способ написания Redux логики. Он включает в себя несколько полезных утилит, которые помогают упростить многие общие случаи использования Redux.

### Основные преимущества:

1. Упрощенная настройка хранилища
2. Встроенная поддержка Immer для иммутабельных обновлений
3. Автоматическая генерация action creators
4. Встроенная поддержка Redux Thunk

### Пример использования:

\`\`\`typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Создание slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    status: 'idle',
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Настройка store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Использование в компоненте
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        Увеличить
      </button>
      <span>{count}</span>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>
        Уменьшить
      </button>
    </div>
  );
};
\`\`\`

## Асинхронные операции

Для асинхронных операций используйте \`createAsyncThunk\`:

\`\`\`typescript
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk(
  'users/fetchUserData',
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

// В slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
\`\`\`

## Лучшие практики

1. Используйте \`createSlice\` вместо ручного создания редьюсеров
2. Применяйте \`createAsyncThunk\` для асинхронных операций
3. Организуйте код по функциональным модулям
4. Используйте TypeScript для типизации

> Redux Toolkit значительно упрощает работу с Redux, делая код более чистым и поддерживаемым.`,
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
            title: 'Используйте createAsyncThunk для асинхронных операций',
            is_correct: true,
            description: 'createAsyncThunk - рекомендуемый способ обработки асинхронных операций в Redux Toolkit',
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
            title: 'Асинхронные операции не поддерживаются в Redux Toolkit',
            is_correct: false,
            description: null,
            order: 3,
          },
        ],
      },
    ],
  },
];
