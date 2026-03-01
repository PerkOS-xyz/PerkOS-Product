import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { CHAIN_DATA } from "@/components/chain-icons";
import { ContributorsCarousel, Contributor } from "@/components/contributors-carousel";
import { Header } from "@/components/header";
import { WaitlistForm } from "@/components/waitlist-form";

async function getContributors(): Promise<Contributor[]> {
  try {
    const response = await fetch("https://stack.perkos.xyz/api/contributors", {
      cache: "no-store",
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.contributors || [];
  } catch {
    return [];
  }
}

const products = [
  {
    name: "Stack",
    icon: "/images/Stack-icon.png",
    description: "x402 facilitator, payment verification, agent registry, and multi-chain settlement infrastructure.",
    status: "live" as const,
    colorClass: "perkos-purple",
    shadowRgb: "118,67,123",
    badge: "Core Infrastructure",
    url: "https://stack.perkos.xyz",
    github: "https://github.com/PerkOS-xyz/Stack",
  },
  {
    name: "Spark",
    icon: "/images/Spark-icon.png",
    description: "No-code AI agent launcher. Deploy intelligent agents with personality across Discord, Telegram, and more.",
    status: "building" as const,
    colorClass: "perkos-pink",
    shadowRgb: "235,27,105",
    badge: "For Creators",
    url: "https://spark.perkos.xyz",
    github: "https://github.com/PerkOS-xyz/Spark",
  },
  {
    name: "Aura",
    icon: "/images/Aura-icon.png",
    description: "20 AI endpoints for vision, NLP, and developer tools. Pay per API call with instant micropayments.",
    status: "live" as const,
    colorClass: "perkos-cyan",
    shadowRgb: "6,182,212",
    badge: "20 APIs",
    url: "https://aura.perkos.xyz",
    github: "https://github.com/PerkOS-xyz/PerkOS-Aura",
  },
  {
    name: "Swarm",
    icon: "/images/Swarm-icon.png",
    description: "AI fleet orchestration. Real-time communication, task boards, and agent management for organizations.",
    status: "building" as const,
    colorClass: "perkos-amber",
    shadowRgb: "245,158,11",
    badge: "Fleet Orchestration",
    url: "https://swarm.perkos.xyz",
    github: "https://github.com/PerkOS-xyz/Swarm",
  },
];

const productColorMap: Record<string, { border: string; borderHover: string; bgFrom: string; line: string; glow: string; text: string; badgeBg: string; badgeBorder: string; btnBg: string; btnBorder: string; btnHoverBg: string }> = {
  "perkos-purple": {
    border: "border-perkos-purple/30",
    borderHover: "hover:border-perkos-purple/60",
    bgFrom: "from-perkos-purple/[0.08]",
    line: "via-perkos-purple/50",
    glow: "bg-perkos-purple/30",
    text: "text-perkos-purple",
    badgeBg: "bg-perkos-purple/10",
    badgeBorder: "border-perkos-purple/20",
    btnBg: "bg-perkos-purple hover:opacity-90",
    btnBorder: "border-perkos-purple/50",
    btnHoverBg: "hover:bg-perkos-purple hover:text-white",
  },
  "perkos-pink": {
    border: "border-perkos-pink/30",
    borderHover: "hover:border-perkos-pink/60",
    bgFrom: "from-perkos-pink/[0.08]",
    line: "via-perkos-pink/50",
    glow: "bg-perkos-pink/30",
    text: "text-perkos-pink",
    badgeBg: "bg-perkos-pink/10",
    badgeBorder: "border-perkos-pink/20",
    btnBg: "bg-perkos-gradient hover:opacity-90",
    btnBorder: "border-perkos-pink/50",
    btnHoverBg: "hover:bg-perkos-pink hover:text-white",
  },
  "perkos-cyan": {
    border: "border-perkos-cyan/30",
    borderHover: "hover:border-perkos-cyan/60",
    bgFrom: "from-perkos-cyan/[0.08]",
    line: "via-perkos-cyan/50",
    glow: "bg-perkos-cyan/30",
    text: "text-perkos-cyan",
    badgeBg: "bg-perkos-cyan/10",
    badgeBorder: "border-perkos-cyan/20",
    btnBg: "bg-perkos-gradient-aura hover:opacity-90",
    btnBorder: "border-perkos-cyan/50",
    btnHoverBg: "hover:bg-perkos-cyan hover:text-white",
  },
  "perkos-amber": {
    border: "border-perkos-amber/30",
    borderHover: "hover:border-perkos-amber/60",
    bgFrom: "from-perkos-amber/[0.08]",
    line: "via-perkos-amber/50",
    glow: "bg-perkos-amber/30",
    text: "text-perkos-amber",
    badgeBg: "bg-perkos-amber/10",
    badgeBorder: "border-perkos-amber/20",
    btnBg: "bg-perkos-amber hover:opacity-90 text-black",
    btnBorder: "border-perkos-amber/50",
    btnHoverBg: "hover:bg-perkos-amber hover:text-black",
  },
};

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default async function Home() {
  const contributors = await getContributors();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4">
              Run your organization on AI agents
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl px-4">
              Deploy, manage, and scale AI agents across your organization &mdash; with built-in
              micropayments, on-chain identity, and fleet orchestration. The infrastructure for
              the agentic economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] bg-perkos-gradient hover:opacity-90 glow-pink" asChild>
                <Link href="https://stack.perkos.xyz">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] border-perkos-pink text-perkos-pink hover:bg-perkos-pink hover:text-white" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            {/* Value Props integrated into hero */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Live on Mainnet</span>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-perkos-orange">$0.0001</div>
                <div className="text-xs text-muted-foreground">Min transaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-perkos-pink">&lt;2s</div>
                <div className="text-xs text-muted-foreground">Settlement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-perkos-coral">7+</div>
                <div className="text-xs text-muted-foreground">Networks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Networks Carousel */}
      <section className="py-12 sm:py-16 border-t overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Supported Networks</h2>
            <p className="text-sm text-muted-foreground">Multi-chain by default</p>
          </div>
          <div className="relative marquee-fade">
            <div className="flex animate-marquee">
              {CHAIN_DATA.map((chain, idx) => (
                <div
                  key={`first-${idx}`}
                  className="flex items-center gap-3 px-8 py-4 mx-4 rounded-xl border border-white/5 hover:border-perkos-pink/30 transition-colors shrink-0"
                  style={{ background: `linear-gradient(135deg, rgba(27, 24, 51, 0.8), rgba(14, 7, 22, 0.8))` }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1.5">
                    <chain.Icon className="w-full h-full" />
                  </div>
                  <span className="font-medium text-white/90">{chain.name}</span>
                </div>
              ))}
              {CHAIN_DATA.map((chain, idx) => (
                <div
                  key={`second-${idx}`}
                  className="flex items-center gap-3 px-8 py-4 mx-4 rounded-xl border border-white/5 hover:border-perkos-pink/30 transition-colors shrink-0"
                  style={{ background: `linear-gradient(135deg, rgba(27, 24, 51, 0.8), rgba(14, 7, 22, 0.8))` }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1.5">
                    <chain.Icon className="w-full h-full" />
                  </div>
                  <span className="font-medium text-white/90">{chain.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Ecosystem — Compact Grid */}
      <section className="py-16 sm:py-20 border-t relative overflow-hidden" id="products">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-perkos-purple/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-perkos-pink/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-perkos-purple animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase text-white/70">The PerkOS Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 tracking-tight">
              Four products. One infrastructure.
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Everything your organization needs to deploy, operate, and scale AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {products.map((product) => {
              const colors = productColorMap[product.colorClass];
              return (
                <Card
                  key={product.name}
                  className={`relative overflow-hidden ${colors.border} ${colors.borderHover} bg-gradient-to-br ${colors.bgFrom} via-white/[0.02] to-transparent backdrop-blur-sm transition-all duration-500 group`}
                  style={{ boxShadow: undefined }}
                >
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${colors.line} to-transparent`} />

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`absolute inset-0 ${colors.glow} rounded-xl blur-xl group-hover:blur-2xl transition-all`} />
                          <Image src={product.icon} alt={product.name} width={48} height={48} className="rounded-xl relative z-10" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold tracking-tight">{product.name}</CardTitle>
                          <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>{product.badge}</span>
                        </div>
                      </div>
                      {product.status === "live" ? (
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Live</span>
                      ) : (
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${colors.badgeBg} ${colors.text} ${colors.badgeBorder} border animate-pulse`}>Building</span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm text-white/60 leading-relaxed">
                      {product.description}
                    </CardDescription>

                    <div className="flex gap-2 pt-1">
                      {product.status === "live" ? (
                        <>
                          <Button className={`flex-1 ${colors.btnBg} font-semibold h-9 text-sm`} asChild>
                            <Link href={product.url}>Open {product.name}</Link>
                          </Button>
                          <Button variant="outline" size="icon" className={`h-9 w-9 ${colors.btnBorder} ${colors.text} ${colors.btnHoverBg}`} asChild>
                            <Link href={product.github}><GitHubIcon /></Link>
                          </Button>
                        </>
                      ) : (
                        <WaitlistForm
                          product={product.name.toLowerCase() as "spark" | "swarm"}
                          placeholder={`Get notified when ${product.name} launches`}
                          buttonText="Notify Me"
                          className="w-full"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Payments Work */}
      <section className="py-12 sm:py-16 md:py-20 border-t bg-muted/50" id="how-it-works">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              How Payments Work
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              HTTP 402 &quot;Payment Required&quot; has existed since 1999. PerkOS activates it.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-perkos-orange/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-perkos-orange">1</span>
                </div>
                <h3 className="font-semibold">Agent Provides Service</h3>
                <p className="text-sm text-muted-foreground">Your agent handles a task or request</p>
              </div>
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-perkos-coral/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-perkos-coral">2</span>
                </div>
                <h3 className="font-semibold">Price Quoted Instantly</h3>
                <p className="text-sm text-muted-foreground">Server returns the cost automatically</p>
              </div>
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-perkos-pink/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-perkos-pink">3</span>
                </div>
                <h3 className="font-semibold">One Signature to Pay</h3>
                <p className="text-sm text-muted-foreground">Wallet-based payment, no invoices</p>
              </div>
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-perkos-purple/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-perkos-purple">4</span>
                </div>
                <h3 className="font-semibold">Settled in Seconds</h3>
                <p className="text-sm text-muted-foreground">Instant settlement, zero chargebacks</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-background rounded-lg border text-center">
              <p className="text-muted-foreground">
                Built on the{" "}
                <Link href="https://www.x402.org/" className="text-perkos-pink hover:underline font-medium" target="_blank" rel="noopener noreferrer">x402 standard</Link>
                {" "}championed by <strong>Coinbase</strong> and the <strong>x402 Foundation</strong>.
                Production-ready infrastructure for the programmable web.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features — 3 Outcome-Focused Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted" id="features">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Built for the agentic economy
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Everything organizations need to operate with AI agents at scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">&#x26A1;</span>
                  Agents that pay for themselves
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Your agents handle transactions autonomously with sub-cent precision.
                  Instant settlement on L2, near-zero fees, real-time analytics on every interaction.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">&#x1F310;</span>
                  Deploy across chains and platforms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  One deployment reaches 7+ blockchain networks and every major platform &mdash;
                  Discord, Telegram, Twitch, Kick, X, and Farcaster.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">&#x1F6E1;&#xFE0F;</span>
                  Agents your organization can trust
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  On-chain identity (ERC-8004) and reputation that builds over time. Verifiable agents
                  with a public discovery registry across the ecosystem.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 sm:py-12 border-t">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white/90">Built on x402</div>
                <div className="text-xs text-muted-foreground">Championed by Coinbase</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white/90">Open Source</div>
                <div className="text-xs text-muted-foreground">
                  <Link href="https://github.com/PerkOS-xyz" className="hover:text-perkos-pink transition-colors" target="_blank" rel="noopener noreferrer">View on GitHub</Link>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white/90">7+ Networks</div>
                <div className="text-xs text-muted-foreground">Multi-chain production</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white/90">{contributors.length || 10}+ Contributors</div>
                <div className="text-xs text-muted-foreground">Building together</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Your Organization */}
      <section className="py-12 sm:py-16 md:py-20 border-t">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Built for your organization
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Whether you&apos;re scaling operations, selling AI services, or building infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card className="border-perkos-pink/30 card-hover">
              <CardHeader>
                <CardTitle className="text-xl">Scale operations with AI agents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Deploy agents that handle tasks, interact with users, and process payments
                  autonomously across your organization.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>&bull; No-code agent setup in minutes</li>
                  <li>&bull; Multi-platform deployment</li>
                  <li>&bull; Built-in analytics and monitoring</li>
                </ul>
                <Button className="w-full bg-perkos-gradient hover:opacity-90" asChild>
                  <Link href="https://spark.perkos.xyz">Try Spark</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-perkos-purple/30 card-hover">
              <CardHeader>
                <CardTitle className="text-xl">Monetize your AI capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Turn any API or model into a pay-per-use service with instant settlement.
                  Near-zero fees on L2 networks.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>&bull; One line of code to add payments</li>
                  <li>&bull; Settlement in seconds, not weeks</li>
                  <li>&bull; Zero fraud risk, USDC settlement</li>
                </ul>
                <Button className="w-full bg-perkos-purple hover:bg-perkos-magenta" asChild>
                  <Link href="https://stack.perkos.xyz">Launch on Stack</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-perkos-amber/30 card-hover">
              <CardHeader>
                <CardTitle className="text-xl">Orchestrate AI fleets at scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Coordinate hundreds of agents with real-time communication, task boards,
                  and resource allocation across your organization.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>&bull; Fleet dashboard and monitoring</li>
                  <li>&bull; Real-time agent communication hub</li>
                  <li>&bull; Task boards and resource allocation</li>
                </ul>
                <Button className="w-full bg-perkos-amber hover:opacity-90 text-black" asChild>
                  <Link href="https://swarm.perkos.xyz">Explore Swarm</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-perkos-orange/30 card-hover">
              <CardHeader>
                <CardTitle className="text-xl">Build the agentic economy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Open-source infrastructure with 10 npm packages, full TypeScript support.
                  Ship agent-powered apps in hours, not months.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>&bull; Standards compliant (x402, ERC-8004)</li>
                  <li>&bull; Full TypeScript SDK</li>
                  <li>&bull; Extensive documentation</li>
                </ul>
                <Button variant="outline" className="w-full border-perkos-pink/50 text-perkos-pink hover:bg-perkos-pink hover:text-white" asChild>
                  <Link href="https://github.com/PerkOS-xyz/PerkOS">View on GitHub</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted" id="pricing">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Transparent, usage-based pricing
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Pay only for what you use. No hidden fees. No subscriptions required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Spark Pricing */}
            <Card className="border-2 border-perkos-pink/50 card-hover">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="/images/Spark-icon.png"
                    alt="Spark"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <CardTitle className="text-2xl">Spark Pricing</CardTitle>
                </div>
                <CardDescription>Credit-based AI agent platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Token Usage Costs */}
                <div className="space-y-1.5 pb-3 border-b border-white/10">
                  <p className="text-xs font-semibold text-perkos-pink uppercase tracking-wide mb-2">Token Usage (1 credit ≈ $0.001)</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Standard AI (GPT-4o-mini)</span>
                    <span className="font-mono">5 credits</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Advanced AI (GPT-4o/Claude)</span>
                    <span className="font-mono">15 credits</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Premium AI (GPT-4/Opus)</span>
                    <span className="font-mono">50 credits</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Memory Storage</span>
                    <span className="font-mono">1 credit/MB/day</span>
                  </div>
                </div>

                {/* Monthly Tiers */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-perkos-orange uppercase tracking-wide mb-2">Monthly Plans</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Free</div>
                      <div className="text-xs text-muted-foreground">1,000 credits &bull; 1 connector</div>
                    </div>
                    <span className="font-mono font-bold">$0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Starter</div>
                      <div className="text-xs text-muted-foreground">15,000 credits &bull; 2 connectors</div>
                    </div>
                    <span className="font-mono font-bold">$9</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Pro</div>
                      <div className="text-xs text-muted-foreground">75,000 credits &bull; all connectors</div>
                    </div>
                    <span className="font-mono font-bold">$29</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Scale</div>
                      <div className="text-xs text-muted-foreground">300,000 credits &bull; priority support</div>
                    </div>
                    <span className="font-mono font-bold">$99</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-xs text-muted-foreground">Unlimited &bull; SLA &bull; dedicated support</div>
                    </div>
                    <span className="font-mono font-bold">Custom</span>
                  </div>
                </div>

                {/* Connector Add-ons */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <p className="text-xs font-semibold text-perkos-peach uppercase tracking-wide mb-2">Connector Add-ons</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discord</span>
                      <span className="font-mono">$5/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Telegram</span>
                      <span className="font-mono">$5/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">X (Twitter)</span>
                      <span className="font-mono">$10/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Farcaster</span>
                      <span className="font-mono">$5/mo</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    Pro &amp; Scale include all connectors
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <p className="text-xs text-perkos-amber font-medium">
                    Earn 5% back in <span className="font-semibold">$PerkOS</span> tokens on every package purchase
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pay with USDC, $PerkOS or $SelfClaw* &bull; Buy extra credits anytime &bull; ~75% gross margin
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stack Pricing */}
            <Card className="border-2 border-perkos-purple/50 card-hover">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="/images/Stack-icon.png"
                    alt="Stack"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <CardTitle className="text-2xl">Stack Pricing</CardTitle>
                </div>
                <CardDescription>x402 Facilitator API for developers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* API Endpoints */}
                <div className="space-y-1.5 pb-3 border-b border-white/10">
                  <p className="text-xs font-semibold text-perkos-purple uppercase tracking-wide mb-2">API Endpoints Included</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Verify</span>
                    <span className="font-mono text-xs">/v2/x402/verify</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Settle</span>
                    <span className="font-mono text-xs">/v2/x402/settle</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dynamic Pricing</span>
                    <span className="font-mono text-xs">/v2/pricing/*</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Agent Registry</span>
                    <span className="font-mono text-xs">/v2/agents/*</span>
                  </div>
                </div>

                {/* Monthly Tiers */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-perkos-coral uppercase tracking-wide mb-2">Monthly Plans</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Free</div>
                      <div className="text-xs text-muted-foreground">1,000 calls &bull; 1 network</div>
                    </div>
                    <span className="font-mono font-bold">$0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Starter</div>
                      <div className="text-xs text-muted-foreground">50,000 calls &bull; 3 networks</div>
                    </div>
                    <span className="font-mono font-bold">$5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Pro</div>
                      <div className="text-xs text-muted-foreground">500,000 calls &bull; all networks</div>
                    </div>
                    <span className="font-mono font-bold">$49</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Scale</div>
                      <div className="text-xs text-muted-foreground">5M calls &bull; priority routing</div>
                    </div>
                    <span className="font-mono font-bold">$299</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-xs text-muted-foreground">Unlimited &bull; SLA &bull; dedicated infra</div>
                    </div>
                    <span className="font-mono font-bold">Custom</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2 border-t border-white/10">
                  Pay with USDC, $PerkOS or $SelfClaw* &bull; L2 fees paid by users &bull; ~80% margin
                </p>
              </CardContent>
            </Card>

            {/* Swarm Pricing */}
            <Card className="border-2 border-perkos-amber/50 card-hover">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="/images/Swarm-icon.png"
                    alt="Swarm"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <CardTitle className="text-2xl">Swarm Pricing</CardTitle>
                </div>
                <CardDescription>AI fleet orchestration platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Fleet Resources */}
                <div className="space-y-1.5 pb-3 border-b border-white/10">
                  <p className="text-xs font-semibold text-perkos-amber uppercase tracking-wide mb-2">Fleet Resources</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Agents</span>
                    <span className="font-mono text-xs">Deployable AI bots</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Projects</span>
                    <span className="font-mono text-xs">Workspaces + channels</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Members</span>
                    <span className="font-mono text-xs">Human operators/org</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hub Messages</span>
                    <span className="font-mono text-xs">WSS messages/mo</span>
                  </div>
                </div>

                {/* Monthly Tiers */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-perkos-amber uppercase tracking-wide mb-2">Monthly Plans</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Free</div>
                      <div className="text-xs text-muted-foreground">3 agents &bull; 1 project &bull; 2 members</div>
                    </div>
                    <span className="font-mono font-bold">$0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Starter</div>
                      <div className="text-xs text-muted-foreground">10 agents &bull; 3 projects &bull; 5 members</div>
                    </div>
                    <span className="font-mono font-bold">$19</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Pro</div>
                      <div className="text-xs text-muted-foreground">50 agents &bull; 10 projects &bull; 15 members</div>
                    </div>
                    <span className="font-mono font-bold">$49</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Scale</div>
                      <div className="text-xs text-muted-foreground">200 agents &bull; unlimited &bull; 50 members</div>
                    </div>
                    <span className="font-mono font-bold">$199</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-xs text-muted-foreground">Unlimited &bull; SLA &bull; dedicated hub</div>
                    </div>
                    <span className="font-mono font-bold">Custom</span>
                  </div>
                </div>

                {/* Fleet Add-ons */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <p className="text-xs font-semibold text-perkos-peach uppercase tracking-wide mb-2">Fleet Add-ons</p>
                  <div className="grid grid-cols-1 gap-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extra Agents</span>
                      <span className="font-mono">$2/agent/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">On-chain Tasks</span>
                      <span className="font-mono">gas fees only</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dedicated Hub</span>
                      <span className="font-mono">$99/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Priority Routing</span>
                      <span className="font-mono">Scale+</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2 border-t border-white/10">
                  Pay with USDC, $PerkOS or $SelfClaw* &bull; Scale per agent &bull; ~85% gross margin
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Token Contract Addresses Footnote */}
          <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-muted-foreground mb-4">
              * <span className="text-perkos-amber font-medium">$PerkOS</span> and <span className="text-perkos-pink font-medium">$SelfClaw</span> are available on Base and Celo networks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1.5">
                <p className="font-semibold text-perkos-amber">$PerkOS</p>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground shrink-0">Base:</span>
                  <Link href="https://app.uniswap.org/explore/tokens/base/0xf714e60f85497d70508f7e356b5db80e64539ba3" target="_blank" rel="noopener noreferrer" className="font-mono text-white/60 break-all hover:text-perkos-amber transition-colors">0xF714E60f85497D70508F7E356b5DB80e64539BA3</Link>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground shrink-0">Celo:</span>
                  <Link href="https://app.uniswap.org/explore/tokens/celo/0xb7ba43fbd4f2e85fce929f7d4dfe3905ae846a46" target="_blank" rel="noopener noreferrer" className="font-mono text-white/60 break-all hover:text-perkos-amber transition-colors">0xb7Ba43fBD4F2E85FCE929f7d4DFE3905Ae846A46</Link>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold text-perkos-pink">$SelfClaw</p>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground shrink-0">Base:</span>
                  <Link href="https://app.uniswap.org/explore/tokens/base/0x9ae5f51d81ff510bf961218f833f79d57bfbab07" target="_blank" rel="noopener noreferrer" className="font-mono text-white/60 break-all hover:text-perkos-pink transition-colors">0x9ae5f51d81ff510bf961218f833f79d57bfbab07</Link>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground shrink-0">Celo:</span>
                  <Link href="https://app.uniswap.org/explore/tokens/celo/0xcd88f99adf75a9110c0bcd22695a32a20ec54ecb" target="_blank" rel="noopener noreferrer" className="font-mono text-white/60 break-all hover:text-perkos-pink transition-colors">0xCD88f99Adf75A9110c0bcd22695A32A20eC54ECb</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20" id="contact">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Let&apos;s Build Together
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Have questions about PerkOS? Want to explore partnerships? We&apos;d love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-perkos-orange/10 flex items-center justify-center shrink-0">
                    <span>&#x1F4E7;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">General Inquiries</h3>
                    <p className="text-sm text-muted-foreground">contact@perkos.xyz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-perkos-pink/10 flex items-center justify-center shrink-0">
                    <span>&#x1F91D;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Partnerships</h3>
                    <p className="text-sm text-muted-foreground">partner@perkos.xyz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-perkos-purple/10 flex items-center justify-center shrink-0">
                    <span>&#x1F4BC;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Investors</h3>
                    <p className="text-sm text-muted-foreground">invest@perkos.xyz</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://x.com/perk_os" target="_blank" rel="noopener noreferrer">X</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://farcaster.xyz/perkos" target="_blank" rel="noopener noreferrer">Farcaster</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/PerkOS-xyz" target="_blank" rel="noopener noreferrer">GitHub</Link>
                </Button>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contributors */}
      <ContributorsCarousel contributors={contributors} />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-t from-muted to-background" id="get-started">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4">
              Ready to join the agentic economy?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Deploy AI agents that work, earn, and scale &mdash; all with infrastructure built for organizations.
            </p>
            <div className="max-w-md mx-auto px-4">
              <WaitlistForm
                product="general"
                placeholder="your@organization.com"
                buttonText="Get Early Access"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 pt-2">
              <Button size="lg" className="w-full sm:w-auto bg-perkos-purple hover:bg-perkos-magenta min-w-[180px]" asChild>
                <Link href="https://stack.perkos.xyz">Explore Stack</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[180px] border-perkos-pink/50 hover:border-perkos-pink hover:bg-perkos-pink/10" asChild>
                <Link href="https://github.com/PerkOS-xyz/PerkOS">View on GitHub</Link>
              </Button>
            </div>
            <div className="pt-4 sm:pt-8">
              <code className="text-sm bg-muted px-4 py-2 rounded-lg">
                npm install @perkos/service-x402
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 sm:py-12 bg-muted">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/images/PerkOS-icon.png" alt="PerkOS" width={32} height={32} className="rounded-lg" />
                <span className="font-bold">PerkOS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Infrastructure for the agentic economy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://stack.perkos.xyz" className="text-muted-foreground hover:text-foreground">Stack</Link></li>
                <li><Link href="https://spark.perkos.xyz" className="text-muted-foreground hover:text-foreground">Spark</Link></li>
                <li><Link href="https://aura.perkos.xyz" className="text-muted-foreground hover:text-foreground">Aura</Link></li>
                <li><Link href="https://swarm.perkos.xyz" className="text-muted-foreground hover:text-foreground">Swarm</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://github.com/PerkOS-xyz/PerkOS" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                <li><Link href="https://github.com/PerkOS-xyz" className="text-muted-foreground hover:text-foreground">GitHub</Link></li>
                <li><Link href="https://www.npmjs.com/org/perkos" className="text-muted-foreground hover:text-foreground">npm Packages</Link></li>
                <li><Link href="https://www.x402.org/" className="text-muted-foreground hover:text-foreground">x402 Protocol</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://x.com/perk_os" className="text-muted-foreground hover:text-foreground">X (Twitter)</Link></li>
                <li><Link href="https://farcaster.xyz/perkos" className="text-muted-foreground hover:text-foreground">Farcaster</Link></li>
                <li><Link href="mailto:contact@perkos.xyz" className="text-muted-foreground hover:text-foreground">contact@perkos.xyz</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} PerkOS. Infrastructure for the agentic economy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
