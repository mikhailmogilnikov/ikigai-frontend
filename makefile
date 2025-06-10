i:
	bun install

dev:
	bun run dev

typecheck:
	bun run typecheck

build:
	bun run build

lint:
	bun run lint

start:
	bun run preview

extract:
	bun run extract

clean:
	bun run extract-clean

lingui:
	bun run lingui

pre:
	make lingui
	make build

# Docker команды
docker-build:
	docker build -t ikigai-frontend .

docker-build-env:
	docker build \
		--build-arg VITE_API_BASE_URL="$(shell grep '^VITE_API_BASE_URL=' .env.local | cut -d '=' -f2)" \
		--build-arg VITE_ENABLE_MOCKING="$(shell grep '^VITE_ENABLE_MOCKING=' .env.local | cut -d '=' -f2)" \
		-t ikigai-frontend .

docker-run:
	docker run -p 3000:3000 --name ikigai-frontend-container ikigai-frontend

docker-run-env:
	docker run -p 3000:3000 --env-file .env.local --name ikigai-frontend-container ikigai-frontend

docker-run-detached:
	docker run -d -p 3000:3000 --name ikigai-frontend-container ikigai-frontend

docker-start:
	docker start ikigai-frontend-container

docker-stop:
	docker stop ikigai-frontend-container

docker-remove:
	docker rm ikigai-frontend-container

docker-clean:
	docker rmi ikigai-frontend

docker-dev:
	make docker-build
	make docker-run

docker-dev-env:
	make docker-build-env
	make docker-run

docker-dev-env-detached:
	make docker-build-env
	make docker-run-detached

docker-restart:
	make docker-stop
	make docker-start