# IKIGAI Education Platform

### Требования для запуска

- Bun 1.2+
- Chocolatey (только для Windows)

### Установка зависимостей

```bash
make i
```

### Запуск в режиме разработки

```bash
make dev
```

### Запуск в режиме продакшен-сборки

```bash
make build
make preview
```

### Проверка кода

```bash
make lint
```

### Структура проекта

`/src` \
-- `/shared` (Все что переиспользуется в проекте) \
-- `/pages` (Маршруты приложения) \
-- `/domains` – Бизнес-домены приложения
