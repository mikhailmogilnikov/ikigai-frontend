i:
	bun install

dev:
	bun run dev

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

pre:
	make clean
	make build
