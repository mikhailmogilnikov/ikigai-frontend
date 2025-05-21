# IKIGAI Education Platform

### Prerequisites

- Bun 1.2+
- Chocolatey (Windows only)

### Installing Dependencies

```bash
make i
```

### Running in Development Mode

```bash
make dev
```

### Running a Production Build

```bash
make build
make preview
```

### Code Linting

```bash
make lint
```

### Project Structure

`/src` \
-- `/shared` (Shared across the project) \
-- `/routes` (Application routes) \
-- `/domains` – Application business domains


### Generate API Docs

Install `@redocly/cli@latest` package globally, then execute

```bash
bunx @redocly/cli@latest bundle ./src/shared/api/sсhema/main.yaml -o api-docs.yaml
```