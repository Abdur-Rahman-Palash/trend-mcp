/**
 * OpportunityAgent - Evaluates business potential and estimates demand
 */

import { Agent, AgentContext, OpportunityOutput, TrendOutput, ResearchOutput } from "../types.js";

export class OpportunityAgent implements Agent<OpportunityOutput> {
  name = "OpportunityAgent";

  async execute(context: AgentContext): Promise<OpportunityOutput> {
    const trendOutput = context.previous_outputs?.get("TrendAgent") as TrendOutput;
    const researchOutput = context.previous_outputs?.get("ResearchAgent") as ResearchOutput;
    const request = context.user_request.toLowerCase();

    const opportunityScore = this.calculateOpportunityScore(trendOutput, researchOutput, request);
    const competitionScore = this.calculateCompetitionScore(trendOutput, request);
    const monetizationMethods = this.identifyMonetizationMethods(trendOutput, request);
    const recommendation = this.generateRecommendation(opportunityScore, competitionScore, trendOutput);

    return {
      opportunity_score: opportunityScore,
      competition_score: competitionScore,
      monetization_methods: monetizationMethods,
      recommendation,
    };
  }

  private calculateOpportunityScore(
    trendOutput: TrendOutput | undefined,
    researchOutput: ResearchOutput | undefined,
    request: string
  ): number {
    let score = 60; // Base score

    // Factor in trend score
    if (trendOutput?.trend_score) {
      score += (trendOutput.trend_score - 50) * 0.4;
    }

    // Factor in opportunities identified
    if (researchOutput?.opportunities) {
      score += researchOutput.opportunities.length * 3;
    }

    // Factor in risks (more risks = lower score)
    if (researchOutput?.risks) {
      score -= researchOutput.risks.length * 2;
    }

    // Boost for high-demand indicators
    const highDemandTerms = ["urgent", "growing", "increasing", "demand", "popular"];
    if (highDemandTerms.some(term => request.includes(term))) {
      score += 10;
    }

    // Cap at 100
    return Math.min(Math.max(score, 0), 100);
  }

  private calculateCompetitionScore(
    trendOutput: TrendOutput | undefined,
    request: string
  ): number {
    let score = 50; // Base score (moderate competition)

    // Mature trends have higher competition
    const matureTrends = [
      "Social Media Marketing",
      "Content Marketing",
      "SEO",
      "Email Marketing",
    ];

    if (trendOutput?.trend && matureTrends.some(t => trendOutput.trend.includes(t))) {
      score += 30; // High competition
    }

    // Emerging trends have lower competition
    const emergingTrends = [
      "AI-Powered",
      "Voice Search",
      "3D Web",
      "Immersive",
      "Glassmorphism",
    ];

    if (trendOutput?.trend && emergingTrends.some(t => trendOutput.trend.includes(t))) {
      score -= 20; // Lower competition
    }

    // Niche indicators reduce competition
    const nicheTerms = ["niche", "specialized", "specific", "targeted"];
    if (nicheTerms.some(term => request.includes(term))) {
      score -= 15;
    }

    // Cap at 100
    return Math.min(Math.max(score, 0), 100);
  }

  private identifyMonetizationMethods(
    trendOutput: TrendOutput | undefined,
    request: string
  ): string[] {
    const trend = trendOutput?.trend || "";

    const methodsByTrend: Record<string, string[]> = {
      "AI-Powered Content Creation": [
        "Content-as-a-Service subscriptions",
        "Enterprise AI implementation consulting",
        "Custom AI tool development",
        "Training and certification programs",
        "Template and prompt marketplace",
      ],
      "Short-Form Video Marketing": [
        "Video production agency services",
        "Platform-specific optimization consulting",
        "Influencer partnership brokerage",
        "Analytics and performance tracking SaaS",
        "Video editing tools and templates",
      ],
      "Sustainable Brand Marketing": [
        "Sustainability certification consulting",
        "E-friendly product development",
        "Green marketing agency services",
        "Carbon footprint tracking tools",
        "Sustainable supply chain optimization",
      ],
      "Hyper-Personalized User Experiences": [
        "Personalization engine SaaS",
        "Customer data platform integration",
        "Behavioral analytics consulting",
        "A/B testing optimization services",
        "Personalization strategy consulting",
      ],
      "Interactive Content Experiences": [
        "Interactive content platform SaaS",
        "Quiz and calculator development",
        "Gamification consulting",
        "Interactive template marketplace",
        "Engagement analytics tools",
      ],
      "Micro-Influencer Partnerships": [
        "Influencer matching platform",
        "Campaign management SaaS",
        "Influencer relationship management",
        "Performance tracking and attribution",
        "Micro-influencer database access",
      ],
    };

    // Default methods for other trends
    const defaultMethods = [
      "Consulting and strategy services",
      "Implementation and development",
      "Software as a Service (SaaS)",
      "Training and education programs",
      "Template and asset marketplace",
    ];

    return methodsByTrend[trend] || defaultMethods;
  }

  private generateRecommendation(
    opportunityScore: number,
    competitionScore: number,
    trendOutput: TrendOutput | undefined
  ): string {
    const trend = trendOutput?.trend || "this opportunity";

    if (opportunityScore >= 80 && competitionScore <= 40) {
      return `STRONG BUY: ${trend} represents an exceptional opportunity with high potential and low competition. Immediate action recommended to capture first-mover advantage. Focus on rapid execution and market positioning.`;
    }

    if (opportunityScore >= 70 && competitionScore <= 60) {
      return `BUY: ${trend} offers strong potential with manageable competition. Good entry point for businesses with relevant capabilities. Develop differentiated positioning and execute quickly.`;
    }

    if (opportunityScore >= 60 && competitionScore <= 70) {
      return `CONSIDER: ${trend} has moderate potential with average competition. Evaluate against your specific strengths and resources. Niche down to reduce competitive pressure.`;
    }

    if (opportunityScore >= 50) {
      return `HOLD: ${trend} shows potential but requires careful evaluation. Assess your competitive advantages before committing resources. Consider pilot testing before full investment.`;
    }

    if (competitionScore >= 80) {
      return `AVOID: ${trend} has high competition with moderate opportunity. Only pursue if you have significant competitive advantages or can identify underserved niches.`;
    }

    return `EVALUATE: ${trend} requires deeper analysis. Gather more market data and assess alignment with your business capabilities before proceeding.`;
  }
}
