/**
 * StrategyAgent - Creates implementation strategy and execution roadmap
 */

import { Agent, AgentContext, StrategyOutput, TrendOutput, ResearchOutput, OpportunityOutput } from "../types.js";

export class StrategyAgent implements Agent<StrategyOutput> {
  name = "StrategyAgent";

  async execute(context: AgentContext): Promise<StrategyOutput> {
    const trendOutput = context.previous_outputs?.get("TrendAgent") as TrendOutput;
    const researchOutput = context.previous_outputs?.get("ResearchAgent") as ResearchOutput;
    const opportunityOutput = context.previous_outputs?.get("OpportunityAgent") as OpportunityOutput;
    const request = context.user_request.toLowerCase();

    const strategy = this.generateStrategy(trendOutput, researchOutput, opportunityOutput, request);
    const timeline = this.generateTimeline(opportunityOutput, request);
    const actionSteps = this.generateActionSteps(trendOutput, researchOutput, opportunityOutput, request);

    return {
      strategy,
      timeline,
      action_steps: actionSteps,
    };
  }

  private generateStrategy(
    trendOutput: TrendOutput | undefined,
    researchOutput: ResearchOutput | undefined,
    opportunityOutput: OpportunityOutput | undefined,
    request: string
  ): string {
    const trend = trendOutput?.trend || "this opportunity";
    const opportunityScore = opportunityOutput?.opportunity_score || 50;
    const competitionScore = opportunityOutput?.competition_score || 50;

    let strategy = `Strategic approach for ${trend}: `;

    if (opportunityScore >= 80) {
      strategy += "Aggressive market entry with rapid scaling. Focus on capturing first-mover advantage through speed and differentiation. Invest heavily in brand building and customer acquisition.";
    } else if (opportunityScore >= 60) {
      strategy += "Balanced approach combining market entry with measured investment. Test multiple channels, optimize based on performance data, and scale successful initiatives. Build sustainable competitive advantages.";
    } else {
      strategy += "Conservative entry with pilot testing and validation. Start small, measure results, and iterate before scaling. Focus on niche positioning to minimize competitive pressure.";
    }

    if (competitionScore >= 70) {
      strategy += " Differentiation is critical - identify underserved segments and unique value propositions.";
    } else {
      strategy += " Market position is favorable - focus on execution excellence and customer experience.";
    }

    // Add domain-specific strategy
    if (request.includes("marketing")) {
      strategy += " Prioritize content marketing, SEO, and paid acquisition for rapid visibility.";
    } else if (request.includes("design") || request.includes("web")) {
      strategy += " Focus on portfolio development, case studies, and direct outreach to demonstrate capabilities.";
    } else if (request.includes("graphic")) {
      strategy += " Build visual showcase, leverage social media, and network with agencies and brands.";
    }

    return strategy;
  }

  private generateTimeline(opportunityOutput: OpportunityOutput | undefined, request: string): string {
    const opportunityScore = opportunityOutput?.opportunity_score || 50;

    if (opportunityScore >= 80) {
      return "0-1 month: Launch MVP and initial marketing. 1-3 months: Scale successful channels. 3-6 months: Expand team and operations. 6-12 months: Market leadership position.";
    } else if (opportunityScore >= 60) {
      return "0-1 month: Research and planning. 1-2 months: MVP development. 2-4 months: Pilot testing. 4-6 months: Optimization and initial scale. 6-12 months: Gradual expansion.";
    } else {
      return "0-2 months: Deep research and validation. 2-4 months: Small-scale pilot. 4-8 months: Data collection and iteration. 8-12 months: Decision on full commitment.";
    }
  }

  private generateActionSteps(
    trendOutput: TrendOutput | undefined,
    researchOutput: ResearchOutput | undefined,
    opportunityOutput: OpportunityOutput | undefined,
    request: string
  ): string[] {
    const trend = trendOutput?.trend || "";
    const opportunityScore = opportunityOutput?.opportunity_score || 50;

    const baseSteps = [
      "Conduct competitive analysis and identify gaps",
      "Define target audience and value proposition",
      "Develop minimum viable product/service offering",
      "Create initial marketing materials and assets",
      "Launch pilot campaign to test market response",
      "Collect and analyze performance data",
      "Optimize based on insights and feedback",
      "Scale successful initiatives systematically",
    ];

    const marketingSteps = [
      "Develop content strategy aligned with trend",
      "Create content calendar and production pipeline",
      "Set up analytics and tracking infrastructure",
      "Test multiple acquisition channels simultaneously",
      "Build email list and nurture sequences",
      "Implement retargeting and conversion optimization",
      "Leverage influencer partnerships for amplification",
      "Continuously A/B test and refine messaging",
    ];

    const designSteps = [
      "Build portfolio showcasing relevant capabilities",
      "Create case studies demonstrating impact",
      "Develop process documentation and proposals",
      "Set up project management and delivery systems",
      "Network with potential clients and partners",
      "Create templates and reusable assets",
      "Establish pricing and service packages",
      "Implement client onboarding and feedback systems",
    ];

    const graphicSteps = [
      "Create visual style guide and brand assets",
      "Build diverse portfolio showcasing range",
      "Develop template libraries for efficiency",
      "Set up collaboration and file sharing systems",
      "Create pricing tiers and service packages",
      "Network with agencies and marketing teams",
      "Leverage social media for visibility",
      "Implement client review and revision processes",
    ];

    // Select appropriate steps based on domain
    if (request.includes("marketing")) {
      return marketingSteps;
    } else if (request.includes("web") || request.includes("design") && !request.includes("graphic")) {
      return designSteps;
    } else if (request.includes("graphic")) {
      return graphicSteps;
    }

    return baseSteps;
  }
}
