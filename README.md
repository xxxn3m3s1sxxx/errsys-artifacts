# errsys-artifacts

Machine-readable artifacts from the [ERR.SYS](https://www.youtube.com/@err.sys) YouTube channel.

## For AI Agents

This repository is designed for AI agent discovery and integration.

### Quick Start

```bash
# Discover videos
curl https://errsys-artifacts.github.io/llms.txt

# Get catalog metadata
curl https://errsys-artifacts.github.io/.well-known/ai-catalog.json

# MCP Server info
curl https://errsys-artifacts.github.io/.well-known/mcp/server-card.json
```

### Available Artifacts

- **`/llms.txt`** — Video catalog for LLM agents
- **`/.well-known/ai-catalog.json`** — Agent-SEO metadata
- **`/.well-known/mcp/server-card.json`** — MCP Registry listing
- **`/public/wave.json`** — Deploy statistics (live)

## Repository Structure

```
├── .well-known/
│   ├── ai-catalog.json          # Agent-SEO (Google/MS/HF standard)
│   └── mcp/
│       └── server-card.json     # MCP Registry listing
├── public/
│   └── wave.json                # Deploy statistics
├── AGENTS.md                    # Guide for AI agents
├── llms.txt                     # Video catalog
└── README.md                    # This file
```

## Topics Covered

Rust, Docker, Kubernetes, TypeScript, Python, PostgreSQL, Redis, AI/ML, DevOps, Cloud, Open Source, Software Engineering Culture

## License

Artifacts are public. Pipeline scripts are internal.
