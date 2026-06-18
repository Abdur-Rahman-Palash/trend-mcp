/**
 * Orchestrator - Routes tasks to appropriate agents and coordinates execution
 */

import { AgentContext, FinalResult, TrendOutput, ResearchOutput, OpportunityOutput, StrategyOutput, ExecutionOutput } from "./types.js";
import { TrendAgent } from "./agents/trendAgent.js";
import { ResearchAgent } from "./agents/researchAgent.js";
import { OpportunityAgent } from "./agents/opportunityAgent.js";
import { StrategyAgent } from "./agents/strategyAgent.js";
import { ExecutionAgent } from "./agents/executionAgent.js";

export class Orchestrator {
  private trendAgent = new TrendAgent();
  private researchAgent = new ResearchAgent();
  private opportunityAgent = new OpportunityAgent();
  private strategyAgent = new StrategyAgent();
  private executionAgent = new ExecutionAgent();

  async routeTask(userRequest: string): Promise<FinalResult> {
    const request = userRequest.toLowerCase();
    const context: AgentContext = {
      user_request: userRequest,
      previous_outputs: new Map(),
    };

    // Determine routing based on request type
    const route = this.determineRoute(request);

    try {
      // Execute agents based on route
      if (route === "trend_research") {
        await this.executeTrendResearchRoute(context);
      } else if (route === "marketing_execution") {
        await this.executeMarketingExecutionRoute(context);
      } else if (route === "web_design") {
        await this.executeWebDesignRoute(context);
      } else if (route === "graphics_design") {
        await this.executeGraphicsDesignRoute(context);
      } else {
        await this.executeTrendResearchRoute(context); // Default route
      }

      // Generate final result
      return this.generateFinalResult(context, route);
    } catch (error) {
      throw new Error(`Orchestration failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private determineRoute(request: string): string {
    // Routing logic as specified in requirements
    const trendKeywords = ["trend", "opportunity", "niche", "growing", "emerging", "popular"];
    const marketingKeywords = ["marketing", "campaign", "promotion", "advertising", "content", "seo"];
    const webDesignKeywords = ["web", "website", "site", "design", "ui", "ux", "interface"];
    const graphicsKeywords = ["graphic", "visual", "logo", "branding", "illustration", "print"];

    const hasTrend = trendKeywords.some(kw => request.includes(kw));
    const hasMarketing = marketingKeywords.some(kw => request.includes(kw));
    const hasWebDesign = webDesignKeywords.some(kw => request.includes(kw));
    const hasGraphics = graphicsKeywords.some(kw => request.includes(kw));

    if (hasTrend) {
      return "trend_research";
    } else if (hasMarketing) {
      return "marketing_execution";
    } else if (hasWebDesign) {
      return "web_design";
    } else if (hasGraphics) {
      return "graphics_design";
    }

    // Default to trend research if no specific keywords found
    return "trend_research";
  }

  private async executeTrendResearchRoute(context: AgentContext): Promise<void> {
    // TrendAgent → ResearchAgent → OpportunityAgent
    const trendOutput = await this.trendAgent.execute(context);
    context.previous_outputs.set("TrendAgent", trendOutput);

    const researchOutput = await this.researchAgent.execute(context);
    context.previous_outputs.set("ResearchAgent", researchOutput);

    const opportunityOutput = await this.opportunityAgent.execute(context);
    context.previous_outputs.set("OpportunityAgent", opportunityOutput);
  }

  private async executeMarketingExecutionRoute(context: AgentContext): Promise<void> {
    // ResearchAgent → StrategyAgent → ExecutionAgent
    const researchOutput = await this.researchAgent.execute(context);
    context.previous_outputs.set("ResearchAgent", researchOutput);

    const strategyOutput = await this.strategyAgent.execute(context);
    context.previous_outputs.set("StrategyAgent", strategyOutput);

    const executionOutput = await this.executionAgent.execute(context);
    context.previous_outputs.set("ExecutionAgent", executionOutput);
  }

  private async executeWebDesignRoute(context: AgentContext): Promise<void> {
    // ResearchAgent → StrategyAgent → ExecutionAgent
    const researchOutput = await this.researchAgent.execute(context);
    context.previous_outputs.set("ResearchAgent", researchOutput);

    const strategyOutput = await this.strategyAgent.execute(context);
    context.previous_outputs.set("StrategyAgent", strategyOutput);

    const executionOutput = await this.executionAgent.execute(context);
    context.previous_outputs.set("ExecutionAgent", executionOutput);
  }

  private async executeGraphicsDesignRoute(context: AgentContext): Promise<void> {
    // ResearchAgent → StrategyAgent → ExecutionAgent
    const researchOutput = await this.researchAgent.execute(context);
    context.previous_outputs.set("ResearchAgent", researchOutput);

    const strategyOutput = await this.strategyAgent.execute(context);
    context.previous_outputs.set("StrategyAgent", strategyOutput);

    const executionOutput = await this.executionAgent.execute(context);
    context.previous_outputs.set("ExecutionAgent", executionOutput);
  }

  private generateFinalResult(context: AgentContext, route: string): FinalResult {
    const trendOutput = context.previous_outputs.get("TrendAgent") as TrendOutput;
    const researchOutput = context.previous_outputs.get("ResearchAgent") as ResearchOutput;
    const opportunityOutput = context.previous_outputs.get("OpportunityAgent") as OpportunityOutput;
    const strategyOutput = context.previous_outputs.get("StrategyAgent") as StrategyOutput;
    const executionOutput = context.previous_outputs.get("ExecutionAgent") as ExecutionOutput;

    const trend = trendOutput?.trend || researchOutput?.summary?.split(".")[0] || "Identified opportunity";
    const trendScore = trendOutput?.trend_score || 70;
    const competitionScore = opportunityOutput?.competition_score || 50;
    const opportunityScore = opportunityOutput?.opportunity_score || 60;
    const strategy = strategyOutput?.strategy || "";
    const timeline = strategyOutput?.timeline || "3-6 months for initial implementation";
    const actionSteps = strategyOutput?.action_steps || [];
    const finalDeliverable = executionOutput?.final_deliverable || strategy || "Implementation plan generated";

    // Determine competition level
    let competition = "Medium";
    if (competitionScore >= 70) competition = "High";
    else if (competitionScore <= 30) competition = "Low";

    // Determine difficulty
    let difficulty = "Medium";
    if (opportunityScore >= 80) difficulty = "Low";
    else if (opportunityScore <= 40) difficulty = "High";

    // Determine estimated value
    let estimatedValue = "Moderate";
    if (opportunityScore >= 80) estimatedValue = "High ($50K-$500K potential)";
    else if (opportunityScore >= 60) estimatedValue = "Good ($20K-$100K potential)";
    else estimatedValue = "Limited ($5K-$50K potential)";

    // Generate why_now
    const whyNow = trendOutput?.growth_reason || "Market conditions favor immediate action with growing demand and decreasing barriers to entry.";

    // Generate recommended actions
    const recommendedActions = actionSteps.slice(0, 5); // Top 5 actions

    // Calculate confidence
    const confidence = this.calculateConfidence(context, route);

    return {
      opportunity: trend,
      trend_score: trendScore,
      competition,
      difficulty,
      estimated_value: estimatedValue,
      why_now: whyNow,
      recommended_actions: recommendedActions,
      timeline,
      confidence,
    };
  }

  private calculateConfidence(context: AgentContext, route: string): number {
    let confidence = 75; // Base confidence

    const trendOutput = context.previous_outputs.get("TrendAgent") as TrendOutput;
    const researchOutput = context.previous_outputs.get("ResearchAgent") as ResearchOutput;
    const opportunityOutput = context.previous_outputs.get("OpportunityAgent") as OpportunityOutput;

    // Boost confidence if we have complete data
    if (trendOutput && researchOutput && opportunityOutput) {
      confidence += 10;
    }

    // Boost confidence for clear trends
    if (trendOutput?.trend_score && trendOutput.trend_score >= 80) {
      confidence += 10;
    }

    // Reduce confidence for ambiguous requests
    const request = context.user_request.toLowerCase();
    if (request.length < 20) {
      confidence -= 15;
    }

    // Cap at 100
    return Math.min(Math.max(confidence, 0), 100);
  }
}
