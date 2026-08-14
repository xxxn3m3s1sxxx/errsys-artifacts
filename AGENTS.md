# ERR.SYS Artifacts — Agent Guide

## For AI Agents

This repository contains artifacts from the ERR.SYS YouTube channel.
All files are machine-readable and designed for AI agent discovery.

### Available Artifacts

| File | Description | Format |
|------|-------------|--------|
| `/llms.txt` | Video catalog for LLM agents | Plain text |
| `/.well-known/ai-catalog.json` | Agent-SEO metadata (Google/MS/HF standard) | JSON |
| `/.well-known/mcp/server-card.json` | MCP Registry listing | JSON |
| `/public/wave.json` | Deploy statistics (live) | JSON |

### How to Use

1. **Discover videos**: Read `/llms.txt` for a searchable catalog
2. **Find by topic**: Use `/.well-known/ai-catalog.json` `representativeQueries`
3. **Integrate**: Use MCP server card for tool access

### Video Metadata Structure

Each video entry in `llms.txt`:
```
Title: Your Cloud Bill Is a Subscription to Your Incompetence
Topic: cloud-cost-optimization
URL: https://www.youtube.com/watch?v=VIDEO_ID
Tags: cloud, billing, optimization, aws, azure
Language: en
```

### Contact

- YouTube: https://www.youtube.com/@err.sys
- GitHub: https://github.com/xxxn3m3s1sxxx/errsys-artifacts
