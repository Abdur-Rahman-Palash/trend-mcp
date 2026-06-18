# TrendMCP - Multi-Agent Trend Analysis Server

[![MCPize](https://mcpize.com/badge/@mcpize/mcpize?type=hosted)](https://mcpize.com)

Production-ready multi-agent MCP server specializing in Digital Marketing, Web Design, and Graphics Design trend analysis and actionable recommendations.

## Overview

TrendMCP uses an orchestrator pattern with 5 specialized internal agents to analyze trends, evaluate opportunities, and produce implementation plans. The server routes user requests through appropriate agent chains to deliver actionable business intelligence.

## Architecture

- **Single public tool**: `route_task` - Routes requests to internal agents
- **5 internal agents**:
  - **TrendAgent**: Discovers trending topics and emerging opportunities
  - **ResearchAgent**: Researches trends and collects key insights
  - **OpportunityAgent**: Evaluates business potential and competition
  - **StrategyAgent**: Creates implementation strategies and roadmaps
  - **ExecutionAgent**: Produces final deliverables (content plans, design briefs, etc.)

## Routing Logic

- **Trend research**: TrendAgent → ResearchAgent → OpportunityAgent
- **Marketing execution**: ResearchAgent → StrategyAgent → ExecutionAgent
- **Web design**: ResearchAgent → StrategyAgent → ExecutionAgent
- **Graphics design**: ResearchAgent → StrategyAgent → ExecutionAgent

## Quick Start

```bash
npm install
npm run dev     # Start with hot reload
```

Server runs at `http://localhost:8080/mcp`

## Development

```bash
npm run dev     # Development mode with hot reload
npm run build   # Compile TypeScript
npm start       # Run compiled server
```

## Project Structure

```
├── src/
│   ├── index.ts           # MCP server entry point with route_task tool
│   ├── types.ts           # Type definitions for agents and outputs
│   ├── orchestrator.ts    # Agent orchestration and routing logic
│   └── agents/
│       ├── trendAgent.ts        # Trend discovery
│       ├── researchAgent.ts     # Trend research and analysis
│       ├── opportunityAgent.ts  # Business evaluation
│       ├── strategyAgent.ts     # Implementation planning
│       └── executionAgent.ts    # Final deliverable generation
├── tests/
│   └── tools.test.ts   # Tool unit tests
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── mcpize.yaml         # MCPize deployment manifest
├── Dockerfile          # Container build
└── .env.example        # Environment variables template
```

## Tool: route_task

Routes user requests to appropriate internal agents for trend analysis, marketing execution, web design, or graphics design recommendations.

**Input**:
- `request` (string): User request describing the task or opportunity to analyze

**Output**:
```json
{
  "opportunity": string,
  "trend_score": number,
  "competition": string,
  "difficulty": string,
  "estimated_value": string,
  "why_now": string,
  "recommended_actions": string[],
  "timeline": string,
  "confidence": number
}
```

## Example Usage

```json
{
  "request": "What are the current trends in AI-powered content creation for digital marketing?"
}
```

## Testing

```bash
npx @anthropic-ai/mcp-inspector          # Interactive MCP testing
```

Connect to `http://localhost:8080/mcp` to test the route_task tool interactively.

## Deployment

```bash
mcpize deploy
```

## License

MIT
