/**
 * ExecutionAgent - Produces final deliverables
 */

import { Agent, AgentContext, ExecutionOutput, TrendOutput, ResearchOutput, OpportunityOutput, StrategyOutput } from "../types.js";

export class ExecutionAgent implements Agent<ExecutionOutput> {
  name = "ExecutionAgent";

  async execute(context: AgentContext): Promise<ExecutionOutput> {
    const trendOutput = context.previous_outputs?.get("TrendAgent") as TrendOutput;
    const researchOutput = context.previous_outputs?.get("ResearchAgent") as ResearchOutput;
    const opportunityOutput = context.previous_outputs?.get("OpportunityAgent") as OpportunityOutput;
    const strategyOutput = context.previous_outputs?.get("StrategyAgent") as StrategyOutput;
    const request = context.user_request.toLowerCase();

    const finalDeliverable = this.generateFinalDeliverable(
      trendOutput,
      researchOutput,
      opportunityOutput,
      strategyOutput,
      request
    );

    return {
      final_deliverable: finalDeliverable,
    };
  }

  private generateFinalDeliverable(
    trendOutput: TrendOutput | undefined,
    researchOutput: ResearchOutput | undefined,
    opportunityOutput: OpportunityOutput | undefined,
    strategyOutput: StrategyOutput | undefined,
    request: string
  ): string {
    const trend = trendOutput?.trend || "this opportunity";
    const trendScore = trendOutput?.trend_score || 0;
    const opportunityScore = opportunityOutput?.opportunity_score || 0;
    const competitionScore = opportunityOutput?.competition_score || 0;
    const strategy = strategyOutput?.strategy || "";
    const timeline = strategyOutput?.timeline || "";
    const actionSteps = strategyOutput?.action_steps || [];

    // Determine deliverable type based on request
    if (request.includes("marketing") || request.includes("campaign") || request.includes("promotion")) {
      return this.generateMarketingPlan(trend, trendScore, opportunityScore, competitionScore, strategy, timeline, actionSteps);
    } else if (request.includes("web") || request.includes("website") || request.includes("design") && !request.includes("graphic")) {
      return this.generateWebDesignPlan(trend, trendScore, opportunityScore, competitionScore, strategy, timeline, actionSteps);
    } else if (request.includes("graphic") || request.includes("visual") || request.includes("branding")) {
      return this.generateGraphicDesignPlan(trend, trendScore, opportunityScore, competitionScore, strategy, timeline, actionSteps);
    } else {
      return this.generateGeneralPlan(trend, trendScore, opportunityScore, competitionScore, strategy, timeline, actionSteps);
    }
  }

  private generateMarketingPlan(
    trend: string,
    trendScore: number,
    opportunityScore: number,
    competitionScore: number,
    strategy: string,
    timeline: string,
    actionSteps: string[]
  ): string {
    return `# MARKETING EXECUTION PLAN: ${trend}

## OVERVIEW
- **Trend Score**: ${trendScore}/100
- **Opportunity Score**: ${opportunityScore}/100
- **Competition Level**: ${competitionScore}/100

## STRATEGIC POSITIONING
${strategy}

## EXECUTION TIMELINE
${timeline}

## ACTION PLAN
${actionSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## CONTENT STRATEGY
- Develop educational content demonstrating ${trend} expertise
- Create case studies showing measurable results
- Produce thought leadership pieces on trend developments
- Build content library for consistent publishing

## CHANNEL ALLOCATION
- **Primary Channels**: Organic social, content marketing, SEO
- **Secondary Channels**: Paid social, email marketing, partnerships
- **Testing Channels**: Emerging platforms aligned with trend

## SUCCESS METRICS
- Engagement rate: Target 3-5% above industry average
- Conversion rate: Target 2-3% from qualified traffic
- Customer acquisition cost: Target 30% below industry benchmark
- Return on ad spend: Target 300%+ within 90 days

## BUDGET ALLOCATION
- Content creation: 40%
- Distribution/promotion: 35%
- Tools and technology: 15%
- Testing and optimization: 10%

## NEXT STEPS
1. Execute first action step within 7 days
2. Set up tracking and analytics infrastructure
3. Create content calendar for first 30 days
4. Launch initial campaign and collect baseline data`;
  }

  private generateWebDesignPlan(
    trend: string,
    trendScore: number,
    opportunityScore: number,
    competitionScore: number,
    strategy: string,
    timeline: string,
    actionSteps: string[]
  ): string {
    return `# WEB DESIGN EXECUTION PLAN: ${trend}

## OVERVIEW
- **Trend Score**: ${trendScore}/100
- **Opportunity Score**: ${opportunityScore}/100
- **Competition Level**: ${competitionScore}/100

## STRATEGIC POSITIONING
${strategy}

## EXECUTION TIMELINE
${timeline}

## ACTION PLAN
${actionSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## DESIGN APPROACH
- **Visual Style**: Modern, clean, aligned with ${trend}
- **User Experience**: Intuitive navigation, fast loading, mobile-first
- **Technical Stack**: Performance-optimized, SEO-friendly, scalable
- **Accessibility**: WCAG 2.1 AA compliant

## SITE STRUCTURE
- Homepage: Value proposition and trend alignment
- Services/Portfolio: Showcase capabilities and results
- About: Team and expertise in ${trend}
- Contact: Clear CTAs and conversion paths
- Blog/Resources: Thought leadership content

## TECHNICAL REQUIREMENTS
- Page load time: < 2 seconds
- Mobile responsiveness: 100% compatibility
- SEO optimization: Schema markup, meta tags, structured data
- Analytics: Conversion tracking, user behavior analysis

## SUCCESS METRICS
- Bounce rate: Target < 40%
- Session duration: Target > 2 minutes
- Conversion rate: Target 3-5%
- Mobile traffic: Target > 60%

## BUDGET ALLOCATION
- Design and development: 50%
- Content creation: 25%
- Testing and optimization: 15%
- Launch and promotion: 10%

## NEXT STEPS
1. Create wireframes and user flows
2. Develop design system and components
3. Build responsive prototypes
4. Conduct user testing and iterate
5. Launch and monitor performance`;
  }

  private generateGraphicDesignPlan(
    trend: string,
    trendScore: number,
    opportunityScore: number,
    competitionScore: number,
    strategy: string,
    timeline: string,
    actionSteps: string[]
  ): string {
    return `# GRAPHIC DESIGN EXECUTION PLAN: ${trend}

## OVERVIEW
- **Trend Score**: ${trendScore}/100
- **Opportunity Score**: ${opportunityScore}/100
- **Competition Level**: ${competitionScore}/100

## STRATEGIC POSITIONING
${strategy}

## EXECUTION TIMELINE
${timeline}

## ACTION PLAN
${actionSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## DESIGN DELIVERABLES
- **Brand Identity**: Logo, color palette, typography, brand guidelines
- **Marketing Assets**: Social media graphics, ad creatives, email templates
- **Digital Assets**: Website graphics, UI elements, icons
- **Print Assets**: Business cards, brochures, presentations (if needed)

## DESIGN SYSTEM
- Create reusable component library
- Establish consistent visual language
- Document brand guidelines and usage
- Build template library for efficiency

## STYLE DIRECTION
- **Aesthetic**: Modern, professional, aligned with ${trend}
- **Color Psychology**: Strategic color choices for target audience
- **Typography**: Readable, scalable, on-brand
- **Imagery**: High-quality, authentic, trend-appropriate

## SUCCESS METRICS
- Client satisfaction: Target 90%+ positive feedback
- Revision rate: Target < 2 rounds per project
- Turnaround time: Target industry-leading speed
- Portfolio growth: Add 2-3 case studies per quarter

## PRICING STRATEGY
- Package offerings for clear value proposition
- Tiered pricing for different service levels
- Retainer options for ongoing work
- Rush delivery premiums for urgent needs

## NEXT STEPS
1. Develop brand identity concepts
2. Create initial design assets
3. Build portfolio showcase
4. Establish client onboarding process
5. Launch marketing and outreach`;
  }

  private generateGeneralPlan(
    trend: string,
    trendScore: number,
    opportunityScore: number,
    competitionScore: number,
    strategy: string,
    timeline: string,
    actionSteps: string[]
  ): string {
    return `# EXECUTION PLAN: ${trend}

## OVERVIEW
- **Trend Score**: ${trendScore}/100
- **Opportunity Score**: ${opportunityScore}/100
- **Competition Level**: ${competitionScore}/100

## STRATEGIC POSITIONING
${strategy}

## EXECUTION TIMELINE
${timeline}

## ACTION PLAN
${actionSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## KEY FOCUS AREAS
1. **Market Entry**: Rapid positioning and visibility
2. **Value Delivery**: High-quality execution and results
3. **Optimization**: Continuous improvement based on data
4. **Scaling**: Systematic growth and expansion

## SUCCESS METRICS
- Market penetration: Target measurable share within 6 months
- Customer satisfaction: Target 80%+ positive feedback
- Revenue growth: Target consistent month-over-month increases
- Competitive positioning: Establish clear differentiation

## RESOURCE REQUIREMENTS
- Team: Skilled personnel in relevant domain
- Technology: Tools and platforms for execution
- Budget: Sufficient capital for initial investment
- Time: Dedicated focus on execution

## RISK MITIGATION
- Monitor market changes and adapt quickly
- Maintain flexibility in approach
- Diversify acquisition channels
- Build sustainable competitive advantages

## NEXT STEPS
1. Execute first action step immediately
2. Establish tracking and measurement
3. Create feedback loops for optimization
4. Scale successful initiatives systematically`;
  }
}
