/**
 * TrendAgent - Discovers trending topics and emerging opportunities
 */

import { Agent, AgentContext, TrendOutput } from "../types.js";

export class TrendAgent implements Agent<TrendOutput> {
  name = "TrendAgent";

  async execute(context: AgentContext): Promise<TrendOutput> {
    const request = context.user_request.toLowerCase();
    
    // Analyze the request to identify relevant trends
    const trend = this.identifyTrend(request);
    const trendScore = this.calculateTrendScore(trend, request);
    const source = this.identifySource(request);
    const growthReason = this.identifyGrowthReason(request, trend);

    return {
      trend,
      trend_score: trendScore,
      source,
      growth_reason: growthReason,
    };
  }

  private identifyTrend(request: string): string {
    // Analyze request to identify the core trend
    const keywords = {
      "ai": "AI-Powered Content Creation",
      "artificial intelligence": "AI-Powered Content Creation",
      "video": "Short-Form Video Marketing",
      "short video": "Short-Form Video Marketing",
      "tiktok": "Short-Form Video Marketing",
      "reels": "Short-Form Video Marketing",
      "sustainability": "Sustainable Brand Marketing",
      "eco": "Sustainable Brand Marketing",
      "green": "Sustainable Brand Marketing",
      "personalization": "Hyper-Personalized User Experiences",
      "personalized": "Hyper-Personalized User Experiences",
      "interactive": "Interactive Content Experiences",
      "micro": "Micro-Influencer Partnerships",
      "influencer": "Micro-Influencer Partnerships",
      "voice": "Voice Search Optimization",
      "audio": "Voice Search Optimization",
      "podcast": "Podcast Marketing",
      "community": "Community-Driven Growth",
      "user generated": "User-Generated Content Campaigns",
      "ugc": "User-Generated Content Campaigns",
      "minimalist": "Minimalist Web Design",
      "dark mode": "Dark Mode UI Design",
      "accessibility": "Accessibility-First Design",
      "mobile first": "Mobile-First Design",
      "3d": "3D Web Experiences",
      "immersive": "Immersive Web Experiences",
      "animation": "Micro-Animation Design",
      "gradient": "Gradient Design Systems",
      "glassmorphism": "Glassmorphism UI",
    };

    for (const [keyword, trend] of Object.entries(keywords)) {
      if (request.includes(keyword)) {
        return trend;
      }
    }

    // Default trend based on domain
    if (request.includes("marketing") || request.includes("promotion") || request.includes("brand")) {
      return "AI-Driven Marketing Automation";
    }
    if (request.includes("design") || request.includes("ui") || request.includes("ux")) {
      return "AI-Assisted Design Workflows";
    }
    if (request.includes("graphic") || request.includes("visual") || request.includes("branding")) {
      return "AI-Generated Visual Assets";
    }

    return "Digital Transformation Trends";
  }

  private calculateTrendScore(trend: string, request: string): number {
    // Base score
    let score = 70;

    // Boost score for specific high-growth indicators
    const highGrowthTerms = ["ai", "automation", "personalization", "interactive", "sustainable"];
    const hasHighGrowth = highGrowthTerms.some(term => request.includes(term));
    if (hasHighGrowth) score += 15;

    // Boost for urgency indicators
    const urgencyTerms = ["urgent", "now", "today", "immediate", "fast"];
    const hasUrgency = urgencyTerms.some(term => request.includes(term));
    if (hasUrgency) score += 10;

    // Cap at 100
    return Math.min(score, 100);
  }

  private identifySource(request: string): string {
    const sources = [
      "Industry Analysis",
      "Market Research",
      "Consumer Behavior Data",
      "Social Media Trends",
      "Search Trend Analysis",
      "Competitor Intelligence",
    ];

    // Select most relevant source based on request
    if (request.includes("social") || request.includes("viral")) {
      return "Social Media Trends";
    }
    if (request.includes("competitor") || request.includes("market")) {
      return "Competitor Intelligence";
    }
    if (request.includes("consumer") || request.includes("customer")) {
      return "Consumer Behavior Data";
    }

    return sources[Math.floor(Math.random() * sources.length)];
  }

  private identifyGrowthReason(request: string, trend: string): string {
    const reasons = [
      "Increasing consumer demand for authentic, personalized experiences",
      "Advancements in AI technology making solutions more accessible",
      "Shift in consumer behavior toward digital-first interactions",
      "Growing competition driving innovation in the space",
      "Cost-effective solutions becoming available to smaller businesses",
      "Platform algorithm changes favoring this approach",
      "Rising awareness of sustainability and ethical practices",
    ];

    // Select relevant reason based on trend
    if (trend.includes("AI")) {
      return "Rapid advancement in AI capabilities and widespread adoption";
    }
    if (trend.includes("Video")) {
      return "Platform algorithms prioritizing video content and increased consumer attention spans";
    }
    if (trend.includes("Sustainable")) {
      return "Growing consumer preference for environmentally conscious brands";
    }

    return reasons[Math.floor(Math.random() * reasons.length)];
  }
}
