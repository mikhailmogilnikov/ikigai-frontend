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
