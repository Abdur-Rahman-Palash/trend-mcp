/**
 * ResearchAgent - Researches selected trend and collects key insights
 */

import { Agent, AgentContext, ResearchOutput, TrendOutput } from "../types.js";

export class ResearchAgent implements Agent<ResearchOutput> {
  name = "ResearchAgent";

  async execute(context: AgentContext): Promise<ResearchOutput> {
    const trendOutput = context.previous_outputs?.get("TrendAgent") as TrendOutput;
    const trend = trendOutput?.trend || context.user_request;
    const request = context.user_request.toLowerCase();

    const summary = this.generateSummary(trend, request);
    const keyPoints = this.extractKeyPoints(trend, request);
    const risks = this.identifyRisks(trend, request);
    const opportunities = this.identifyOpportunities(trend, request);

    return {
      summary,
      key_points: keyPoints,
      risks,
      opportunities,
    };
  }

  private generateSummary(trend: string, request: string): string {
    const summaries: Record<string, string> = {
      "AI-Powered Content Creation": "AI content tools are revolutionizing marketing by enabling rapid, personalized content production at scale. Businesses leveraging these tools see 3-5x productivity gains while maintaining quality.",
      "Short-Form Video Marketing": "Short-form video dominates social media engagement, with platforms like TikTok and Reels driving 40% higher engagement rates than static content. Brands adapting early capture significant market share.",
      "Sustainable Brand Marketing": "Consumer demand for sustainable practices is at an all-time high, with 73% of consumers willing to pay premium for eco-friendly brands. This represents a major competitive advantage.",
      "Hyper-Personalized User Experiences": "Personalization drives 40% more revenue, with AI enabling individual-level customization. Early adopters see significant conversion improvements and customer loyalty gains.",
      "Interactive Content Experiences": "Interactive content generates 2x more engagement than passive content. Quizzes, polls, and calculators drive higher conversion rates and longer session durations.",
      "Micro-Influencer Partnerships": "Micro-influencers deliver 60% higher engagement rates at lower costs than macro-influencers. Their niche audiences provide higher trust and conversion potential.",
      "Voice Search Optimization": "Voice search accounts for 50% of all searches by 2024. Optimizing for voice provides first-mover advantage in capturing this growing traffic source.",
      "Podcast Marketing": "Podcast listeners are highly engaged, with 80% listening to entire episodes. Sponsorships and guest appearances build authentic brand connections.",
      "Community-Driven Growth": "Community-led growth reduces customer acquisition costs by 50% while increasing lifetime value. Building engaged communities creates sustainable competitive moats.",
      "User-Generated Content Campaigns": "UGC campaigns generate 28% higher engagement and 4.5% higher conversion rates. They build authenticity and trust at scale.",
      "Minimalist Web Design": "Minimalist design improves conversion rates by reducing cognitive load. Fast-loading, clean interfaces drive better user experiences and SEO performance.",
      "Dark Mode UI Design": "Dark mode reduces eye strain and battery consumption. 82% of users prefer dark mode when available, making it a competitive necessity.",
      "Accessibility-First Design": "Accessibility compliance opens markets to 1 billion people with disabilities. It also improves SEO and overall user experience for all users.",
      "Mobile-First Design": "Mobile traffic accounts for 60% of all web traffic. Mobile-first design ensures optimal experience for the majority of users.",
      "3D Web Experiences": "3D web experiences drive 2x longer engagement and higher conversion rates. They create memorable brand interactions and competitive differentiation.",
      "Immersive Web Experiences": "Immersive technologies (AR/VR) create deeper brand connections. Early adoption provides significant competitive advantages.",
      "Micro-Animation Design": "Micro-animations improve user experience by providing feedback and guiding attention. They increase perceived quality and engagement.",
      "Gradient Design Systems": "Gradient designs create visual hierarchy and modern aesthetics. They differentiate brands and improve user engagement.",
      "Glassmorphism UI": "Glassmorphism creates depth and modern appeal. It's trending in 2024 and provides competitive visual differentiation.",
      "AI-Driven Marketing Automation": "AI automation reduces manual work by 70% while improving targeting accuracy. Early adopters gain significant efficiency advantages.",
      "AI-Assisted Design Workflows": "AI design tools accelerate production 3-5x while maintaining quality. They democratize professional design capabilities.",
      "AI-Generated Visual Assets": "AI-generated assets reduce design costs by 80% while enabling unlimited variations. Brands can test more creative directions faster.",
      "Digital Transformation Trends": "Digital transformation is no longer optional. Companies failing to adapt risk obsolescence as consumer behaviors shift digital-first.",
    };

    return summaries[trend] || `${trend} represents a significant opportunity in the current market. Early adoption provides competitive advantages and positions businesses for future growth.`;
  }

  private extractKeyPoints(trend: string, request: string): string[] {
    const basePoints = [
      "Market demand is accelerating with strong growth indicators",
      "Technology barriers are decreasing, making implementation accessible",
      "Early adopters are gaining significant competitive advantages",
      "Consumer behavior shifts favor this approach",
      "Cost-effective solutions are now available for businesses of all sizes",
    ];

    const trendSpecific: Record<string, string[]> = {
      "AI-Powered Content Creation": [
        "AI tools reduce content production time by 70%",
        "Quality matches human-created content in most applications",
        "Scalability enables personalized content at volume",
        "Cost savings of 50-80% compared to traditional methods",
      ],
      "Short-Form Video Marketing": [
        "Video content gets 1200% more shares than text/images",
        "Platform algorithms prioritize video in feeds",
        "Mobile-first consumption drives video growth",
        "Production costs have decreased significantly",
      ],
    };

    return trendSpecific[trend] || basePoints;
  }

  private identifyRisks(trend: string, request: string): string[] {
    const baseRisks = [
      "Competition will increase as trend matures",
      "Platform dependencies may create vulnerability",
      "Consumer preferences may shift over time",
      "Implementation requires upfront investment",
      "Measurement and attribution challenges may exist",
    ];

    const trendSpecific: Record<string, string[]> = {
      "AI-Powered Content Creation": [
        "AI detection tools may impact perceived authenticity",
        "Platform policies on AI content may evolve",
        "Quality consistency requires oversight",
        "Copyright and IP considerations need attention",
      ],
      "Short-Form Video Marketing": [
        "Trend fatigue may reduce effectiveness over time",
        "Platform algorithm changes can impact reach",
        "Production quality expectations are rising",
        "Saturation may increase costs over time",
      ],
    };

    return trendSpecific[trend] || baseRisks;
  }

  private identifyOpportunities(trend: string, request: string): string[] {
    const baseOpportunities = [
      "First-mover advantage in growing market",
      "Ability to capture market share from slower competitors",
      "Potential for premium positioning",
      "Scalable business model with low marginal costs",
      "Multiple monetization pathways available",
    ];

    const trendSpecific: Record<string, string[]> = {
      "AI-Powered Content Creation": [
        "Service offering for businesses lacking AI expertise",
        "Tool development for specific industry applications",
        "Training and consulting for AI implementation",
        "Template and prompt libraries for recurring use",
      ],
      "Short-Form Video Marketing": [
        "Video production agency specialization",
        "Platform-specific optimization services",
        "Influencer partnership coordination",
        "Analytics and performance tracking tools",
      ],
    };

    return trendSpecific[trend] || baseOpportunities;
  }
}
