# Используем официальный образ Bun на Alpine Linux
FROM oven/bun:alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и bun.lock для установки зависимостей
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем все файлы проекта
COPY . .

# Передаем переменные окружения на этапе сборки
ARG VITE_API_BASE_URL
ARG VITE_ENABLE_MOCKING
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_ENABLE_MOCKING=$VITE_ENABLE_MOCKING

# Собираем приложение
RUN bun run build

# Создаем production образ с nginx
FROM nginx:alpine AS production

# Копируем конфигурацию nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Создаем кастомную конфигурацию nginx для SPA
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 3000;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    location /api {' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_pass http://backend:8000;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header Host $host;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Real-IP $remote_addr;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' >> /etc/nginx/conf.d/default.conf && \
    echo '        proxy_set_header X-Forwarded-Proto $scheme;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf
 
# Экспонируем порт 3000
EXPOSE 3000

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"] 