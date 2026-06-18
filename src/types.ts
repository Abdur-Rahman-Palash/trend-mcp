/**
 * Core types and interfaces for the multi-agent MCP server
 */

// ============================================================================
// Agent Output Types
// ============================================================================

export interface TrendOutput {
  trend: string;
  trend_score: number;
  source: string;
  growth_reason: string;
}

export interface ResearchOutput {
  summary: string;
  key_points: string[];
  risks: string[];
  opportunities: string[];
}

export interface OpportunityOutput {
  opportunity_score: number;
  competition_score: number;
  monetization_methods: string[];
  recommendation: string;
}

export interface StrategyOutput {
  strategy: string;
  timeline: string;
  action_steps: string[];
}

export interface ExecutionOutput {
  final_deliverable: string;
}

// ============================================================================
// Final Output Format
// ============================================================================

export interface FinalResult {
  opportunity: string;
  trend_score: number;
  competition: string;
  difficulty: string;
  estimated_value: string;
  why_now: string;
  recommended_actions: string[];
  timeline: string;
  confidence: number;
  [key: string]: unknown;
}

// ============================================================================
// Agent Context
// ============================================================================

export interface AgentContext {
  user_request: string;
  previous_outputs: Map<string, unknown>;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Agent Interface
// ============================================================================

export interface Agent<T = unknown> {
  name: string;
  execute(context: AgentContext): Promise<T>;
}
