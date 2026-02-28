import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { CHAIN_DATA } from "@/components/chain-icons";
import { ContributorsCarousel, Contributor } from "@/components/contributors-carousel";
import { Header } from "@/components/header";

async function getContributors(): Promise<Contributor[]> {
  try {
    const response = await fetch("https://stack.perkos.xyz/api/contributors", {
      cache: "no-store", // Always fetch fresh data
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.contributors || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const contributors = await getContributors();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-20 md:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <Image
                src="/images/PerkOS.png"
                alt="PerkOS Logo"
                width={300}
                height={100}
                className="w-60 h-20 sm:w-28 sm:h-28 md:w-96 md:h-32 rounded-2xl"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4">
              The Operating System for AI Agents
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl px-4">
              Build, deploy, and monetize AI agents across multiple platforms.
              Web3-native infrastructure for the agentic economy with instant micropayments.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] bg-perkos-gradient hover:opacity-90 glow-pink" asChild>
                <Link href="https://spark.perkos.xyz">Launch Your Agent</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] border-perkos-pink text-perkos-pink hover:bg-perkos-pink hover:text-white" asChild>
                <Link href="https://github.com/PerkOS-xyz/PerkOS">Developer Docs</Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 text-xs sm:text-sm text-muted-foreground px-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Live on Mainnet</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>x402 Protocol</span>
              <span className="hidden sm:inline">•</span>
              <span>ERC-8004 Identity</span>
              <span className="hidden sm:inline">•</span>
              <span>7 Networks</span>
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
              {/* First set of chains */}
              {CHAIN_DATA.map((chain, idx) => (
                <div
                  key={`first-${idx}`}
                  className="flex items-center gap-3 px-8 py-4 mx-4 bg-gradient-to-r rounded-xl border border-white/5 hover:border-perkos-pink/30 transition-colors shrink-0"
                  style={{ background: `linear-gradient(135deg, rgba(27, 24, 51, 0.8), rgba(14, 7, 22, 0.8))` }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1.5">
                    <chain.Icon className="w-full h-full" />
                  </div>
                  <span className="font-medium text-white/90">{chain.name}</span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {CHAIN_DATA.map((chain, idx) => (
                <div
                  key={`second-${idx}`}
                  className="flex items-center gap-3 px-8 py-4 mx-4 bg-gradient-to-r rounded-xl border border-white/5 hover:border-perkos-pink/30 transition-colors shrink-0"
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

      {/* Contributors Carousel */}
      <ContributorsCarousel contributors={contributors} />

      {/* Value Props Section */}
      <section className="py-12 sm:py-16 border-t bg-muted/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-perkos-orange">$0.0001</div>
              <div className="text-sm text-muted-foreground">Minimum transaction size</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-perkos-pink">&lt;2s</div>
              <div className="text-sm text-muted-foreground">Settlement time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-perkos-coral">7+</div>
              <div className="text-sm text-muted-foreground">Production networks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Ecosystem Showcase */}
      <section className="py-16 sm:py-20 md:py-28 border-t relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-perkos-purple/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-perkos-pink/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-perkos-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/6 left-1/3 w-96 h-96 bg-perkos-amber/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-perkos-purple animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase text-white/70">The PerkOS Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 tracking-tight">
              <span className="text-perkos-purple">Stack</span> powers. <span className="text-perkos-orange">Spark</span> ignites. <span className="text-perkos-cyan">Aura</span> serves. <span className="text-perkos-amber">Swarm</span> orchestrates.
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              One infrastructure. Endless possibilities. Built for the agentic economy.
            </p>
          </div>

          {/* Products Grid - Stack First Layout */}
          <div className="max-w-6xl mx-auto">
            {/* Hero Row - Stack (Main Infrastructure Product) */}
            <Card className="relative overflow-hidden border-2 border-perkos-purple/30 bg-gradient-to-br from-perkos-purple/[0.08] via-white/[0.02] to-transparent backdrop-blur-sm transition-all duration-500 product-card-stack group mb-6 sm:mb-8" id="stack">
              {/* Enhanced decorative elements for hero status */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-perkos-purple/50 to-transparent" />
              <div className="absolute top-0 left-1/4 w-48 h-48 bg-gradient-to-br from-perkos-purple/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute top-0 right-1/4 w-48 h-48 bg-gradient-to-bl from-perkos-magenta/15 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-perkos-purple/10 to-transparent rounded-tr-full" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-perkos-magenta/10 to-transparent rounded-tl-full" />

              <CardHeader className="pb-4">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="absolute inset-0 bg-perkos-purple/40 rounded-2xl blur-2xl group-hover:blur-3xl transition-all scale-150" />
                      <Image
                        src="/images/Stack-icon.png"
                        alt="Stack"
                        width={72}
                        height={72}
                        className="rounded-2xl relative z-10"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">Stack</CardTitle>
                        <span className="product-badge bg-perkos-purple/20 text-perkos-purple border border-perkos-purple/30">Core Infrastructure</span>
                      </div>
                      <CardDescription className="text-base text-perkos-purple font-medium">The x402 facilitator powering the agentic economy</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="product-badge bg-white/5 text-white/70 border border-white/10">10 npm packages</span>
                    <span className="product-badge bg-white/5 text-white/70 border border-white/10">7 networks</span>
                    <span className="product-badge bg-white/5 text-white/70 border border-white/10">Production-ready</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed max-w-4xl">
                  Complete infrastructure for agent-powered applications. Stack provides the x402 facilitator, payment verification,
                  settlement services, and agent registry that powers Spark, Aura, and your applications. Multi-chain by default.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-perkos-purple text-xl">🔌</span>
                    <div>
                      <div className="font-medium text-sm text-white/90">REST API</div>
                      <div className="text-xs text-white/50">Agent management</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-perkos-purple text-xl">💳</span>
                    <div>
                      <div className="font-medium text-sm text-white/90">x402 Facilitator</div>
                      <div className="text-xs text-white/50">Instant micropayments</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-perkos-purple text-xl">🔍</span>
                    <div>
                      <div className="font-medium text-sm text-white/90">Discovery</div>
                      <div className="text-xs text-white/50">Agent registry</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-perkos-purple text-xl">🆔</span>
                    <div>
                      <div className="font-medium text-sm text-white/90">ERC-8004</div>
                      <div className="text-xs text-white/50">On-chain identity</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-xs text-white/50">Accepted:</span>
                  <span className="text-xs font-semibold text-white/80">USDC</span>
                  <span className="text-white/20">|</span>
                  <span className="text-xs font-semibold text-perkos-amber">$PerkOS*</span>
                  <span className="text-white/20">|</span>
                  <span className="text-xs font-semibold text-perkos-pink">$SelfClaw*</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-perkos-purple hover:bg-perkos-magenta font-semibold h-11" asChild>
                    <Link href="https://stack.perkos.xyz">Launch Stack App</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 border-perkos-purple/50 text-perkos-purple hover:bg-perkos-purple hover:text-white h-11" asChild>
                    <Link href="https://github.com/PerkOS-xyz/Stack">View on GitHub</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 border-white/20 text-white/70 hover:bg-white/10 hover:text-white h-11" asChild>
                    <Link href="https://www.npmjs.com/org/perkos">npm Packages</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Connection indicator */}
            <div className="hidden lg:flex justify-center items-center py-4 relative">
              <div className="flex items-center gap-4">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-perkos-purple/40 to-perkos-pink/30" />
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-perkos-purple/10 border border-perkos-purple/20">
                  <svg className="w-4 h-4 text-perkos-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  <span className="text-xs font-medium text-perkos-purple/80">Powers</span>
                </div>
                <div className="h-px w-32 bg-gradient-to-r from-perkos-cyan/30 via-perkos-purple/40 to-transparent" />
              </div>
            </div>

            {/* Bottom Row - Spark and Aura (Built on Stack) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Spark Card */}
              <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm transition-all duration-500 product-card-spark group" id="spark">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-perkos-pink/20 via-perkos-coral/10 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:w-48 group-hover:h-48" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-perkos-orange/10 to-transparent rounded-tr-full" />

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-perkos-pink/30 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                        <Image
                          src="/images/Spark-icon.png"
                          alt="Spark"
                          width={56}
                          height={56}
                          className="rounded-xl relative z-10"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Spark</CardTitle>
                        <CardDescription className="text-sm text-perkos-orange font-medium">No-code AI agent launcher</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="product-badge bg-perkos-pink/20 text-perkos-pink border border-perkos-pink/30">For Creators</span>
                      <span className="product-badge bg-perkos-orange/20 text-perkos-orange border border-perkos-orange/30 animate-pulse">Building</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Launch intelligent AI agents with personality in minutes. No coding required.
                    Perfect for community managers, creators, and Web3 projects.
                  </p>

                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-perkos-orange text-base">⚡</span>
                      <span className="text-white/80">5-minute setup, deploy across platforms instantly</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-perkos-orange text-base">🎨</span>
                      <span className="text-white/80">Visual character & personality editor</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-perkos-orange text-base">🔌</span>
                      <span className="text-white/80">Discord, Telegram, Twitch, Kick support</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-perkos-orange text-base">💰</span>
                      <span className="text-white/80">Built-in x402 micropayments</span>
                    </li>
                  </ul>

                  <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-xs text-white/50">Accepted:</span>
                    <span className="text-xs font-semibold text-white/80">USDC</span>
                    <span className="text-white/20">|</span>
                    <span className="text-xs font-semibold text-perkos-amber">$PerkOS*</span>
                    <span className="text-white/20">|</span>
                    <span className="text-xs font-semibold text-perkos-pink">$SelfClaw*</span>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <Button className="flex-1 bg-perkos-gradient/50 font-semibold cursor-not-allowed" disabled>
                      Launch Spark
                    </Button>
                    <Button variant="outline" size="icon" className="border-perkos-pink/50 text-perkos-pink hover:bg-perkos-pink hover:text-white" asChild>
                      <Link href="https://github.com/PerkOS-xyz/Spark">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Aura Card */}
              <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm transition-all duration-500 product-card-aura group" id="aura">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-perkos-cyan/20 via-perkos-teal/10 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:w-48 group-hover:h-48" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-perkos-cyan/10 to-transparent rounded-tr-full" />

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-perkos-cyan/30 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                        <Image
                          src="/images/Aura-icon.png"
                          alt="Aura"
                          width={56}
                          height={56}
                          className="rounded-xl relative z-10"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Aura</CardTitle>
                        <CardDescription className="text-sm text-perkos-cyan font-medium">AI Vendor Service with x402</CardDescription>
                      </div>
                    </div>
                    <span className="product-badge bg-perkos-cyan/20 text-perkos-cyan border border-perkos-cyan/30">20 APIs</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    20 AI endpoints for vision, NLP, business tools, and developer utilities.
                    Powered by GPT-4o, DALL-E 3, and Whisper with instant micropayments.
                  </p>

                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-perkos-cyan text-base">🖼️</span>
                      <span className="text-white/80">Vision: Image analysis, generation, OCR</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-perkos-cyan text-base">🌐</span>
                      <span className="text-white/80">NLP: Translation, summarization, sentiment</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-perkos-cyan text-base">💻</span>
                      <span className="text-white/80">Developer: Code generation, review, SQL</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-perkos-cyan text-base">💳</span>
                      <span className="text-white/80">x402 v2 micropayments — pay per API call</span>
                    </li>
                  </ul>

                  <div className="pt-3 flex gap-3">
                    <Button className="flex-1 bg-perkos-gradient-aura hover:opacity-90 font-semibold text-white" asChild>
                      <Link href="https://aura.perkos.xyz">Try Aura API</Link>
                    </Button>
                    <Button variant="outline" size="icon" className="border-perkos-cyan/50 text-perkos-cyan hover:bg-perkos-cyan hover:text-white" asChild>
                      <Link href="https://github.com/PerkOS-xyz/PerkOS-Aura">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Connection indicator - Swarm */}
            <div className="hidden lg:flex justify-center items-center py-4 relative">
              <div className="flex items-center gap-4">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-perkos-pink/30 to-perkos-amber/30" />
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-perkos-amber/10 border border-perkos-amber/20">
                  <svg className="w-4 h-4 text-perkos-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  <span className="text-xs font-medium text-perkos-amber/80">Orchestrates</span>
                </div>
                <div className="h-px w-32 bg-gradient-to-r from-perkos-amber/30 via-perkos-cyan/30 to-transparent" />
              </div>
            </div>

            {/* Swarm Card - Full Width (Fleet Orchestration) */}
            <Card className="relative overflow-hidden border-2 border-perkos-amber/30 bg-gradient-to-br from-perkos-amber/[0.08] via-white/[0.02] to-transparent backdrop-blur-sm transition-all duration-500 product-card-swarm group" id="swarm">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-perkos-amber/50 to-transparent" />
              <div className="absolute top-0 left-1/4 w-48 h-48 bg-gradient-to-br from-perkos-amber/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute top-0 right-1/4 w-48 h-48 bg-gradient-to-bl from-perkos-yellow/15 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-perkos-amber/10 to-transparent rounded-tr-full" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-perkos-yellow/10 to-transparent rounded-tl-full" />

              <CardHeader className="pb-4">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="absolute inset-0 bg-perkos-amber/40 rounded-2xl blur-2xl group-hover:blur-3xl transition-all scale-150" />
                      <Image
                        src="/images/Swarm-icon.png"
                        alt="Swarm"
                        width={72}
                        height={72}
                        className="rounded-2xl relative z-10"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">Swarm</CardTitle>
                        <span className="product-badge bg-perkos-amber/20 text-perkos-amber border border-perkos-amber/30">Fleet Orchestration</span>
                      </div>
                      <CardDescription className="text-base text-perkos-amber font-medium">Enterprise AI fleet orchestration for autonomous business operations</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="product-badge bg-perkos-amber/20 text-perkos-amber border border-perkos-amber/30 animate-pulse">Building</span>
                    <span className="product-badge bg-white/5 text-white/70 border border-white/10">6 Agent Types</span>
                    <span className="product-badge bg-white/5 text-white/70 border border-white/10">2 Chains</span>
                    <span className="product-badge bg-white/5 text-white/70 border border-white/10">Real-time WSS</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed max-w-4xl">
                  Complete command center for deploying and managing AI agent fleets. Swarm provides real-time communication,
                  task orchestration, project management, and agent onboarding that powers your autonomous business operations. Multi-chain by default.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-perkos-amber text-xl">📡</span>
                    <div>
                      <div className="font-medium text-sm text-white/90">WSS Hub</div>
                      <div className="text-xs text-white/50">Secure real-time messaging</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-perkos-amber text-xl">🐝</span>
                    <div>
                      <div className="font-medium text-sm text-white/90">Fleet Manager</div>
                      <div className="text-xs text-white/50">Agent orchestration</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-perkos-amber text-xl">📋</span>
                    <div>
                      <div className="font-medium text-sm text-white/90">Task Board</div>
                      <div className="text-xs text-white/50">Kanban + on-chain jobs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-perkos-amber text-xl">🔌</span>
                    <div>
                      <div className="font-medium text-sm text-white/90">Swarm Connect</div>
                      <div className="text-xs text-white/50">Self-installing agent plugin</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-xs text-white/50">Accepted:</span>
                  <span className="text-xs font-semibold text-white/80">USDC</span>
                  <span className="text-white/20">|</span>
                  <span className="text-xs font-semibold text-perkos-amber">$PerkOS*</span>
                  <span className="text-white/20">|</span>
                  <span className="text-xs font-semibold text-perkos-pink">$SelfClaw*</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-perkos-amber hover:bg-perkos-yellow text-black font-semibold h-11" asChild>
                    <Link href="https://swarm.perkos.xyz">Launch Swarm App</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 border-perkos-amber/50 text-perkos-amber hover:bg-perkos-amber hover:text-black h-11" asChild>
                    <Link href="https://github.com/PerkOS-xyz/Swarm">View on GitHub</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 border-white/20 text-white/70 hover:bg-white/10 hover:text-white h-11" asChild>
                    <Link href="https://github.com/PerkOS-xyz/Swarm#readme">Documentation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Token Info Footnote */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-muted-foreground mb-3">
                * <span className="text-perkos-amber font-medium">$PerkOS</span> and <span className="text-perkos-pink font-medium">$SelfClaw</span> available on Base and Celo.
              </p>
              <div className="flex flex-col sm:flex-row gap-x-8 gap-y-1.5 text-xs font-mono text-white/40">
                <Link href="https://app.uniswap.org/explore/tokens/base/0xf714e60f85497d70508f7e356b5db80e64539ba3" target="_blank" rel="noopener noreferrer" className="hover:text-perkos-amber transition-colors">$PerkOS Base: 0xF714E60f...39BA3</Link>
                <Link href="https://app.uniswap.org/explore/tokens/celo/0xb7ba43fbd4f2e85fce929f7d4dfe3905ae846a46" target="_blank" rel="noopener noreferrer" className="hover:text-perkos-amber transition-colors">$PerkOS Celo: 0xb7Ba43fB...846A46</Link>
                <Link href="https://app.uniswap.org/explore/tokens/base/0x9ae5f51d81ff510bf961218f833f79d57bfbab07" target="_blank" rel="noopener noreferrer" className="hover:text-perkos-pink transition-colors">$SelfClaw Base: 0x9ae5f51d...bab07</Link>
                <Link href="https://app.uniswap.org/explore/tokens/celo/0xcd88f99adf75a9110c0bcd22695a32a20ec54ecb" target="_blank" rel="noopener noreferrer" className="hover:text-perkos-pink transition-colors">$SelfClaw Celo: 0xCD88f99A...4ECb</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 md:py-20 border-t bg-muted/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              The x402 Protocol
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              HTTP 402 &quot;Payment Required&quot; has existed since 1999 — reserved for future use.
              PerkOS activates it.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-perkos-orange/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-perkos-orange">1</span>
                </div>
                <h3 className="font-semibold">Request</h3>
                <p className="text-sm text-muted-foreground">Client requests a paid resource</p>
              </div>
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-perkos-coral/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-perkos-coral">2</span>
                </div>
                <h3 className="font-semibold">402 Response</h3>
                <p className="text-sm text-muted-foreground">Server returns payment requirements</p>
              </div>
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-perkos-pink/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-perkos-pink">3</span>
                </div>
                <h3 className="font-semibold">Sign & Pay</h3>
                <p className="text-sm text-muted-foreground">Client signs payment with wallet</p>
              </div>
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-perkos-purple/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-perkos-purple">4</span>
                </div>
                <h3 className="font-semibold">Access</h3>
                <p className="text-sm text-muted-foreground">Resource delivered, instant settlement</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-background rounded-lg border text-center">
              <p className="text-muted-foreground">
                Built on the x402 standard championed by <strong>Coinbase</strong> and the{" "}
                <strong>x402 Foundation</strong>. Production-ready infrastructure for the programmable web.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted" id="features">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Everything you need to build agents
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Web3-native infrastructure purpose-built for the agentic economy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  x402 Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Native HTTP 402 protocol support. Sub-cent transactions, instant settlement,
                  zero chargebacks. Pay only for what you use.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🆔</span>
                  ERC-8004 Identity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  On-chain agent identity and reputation. Interoperable across the ecosystem
                  with CAIP-2 chain-agnostic identifiers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Discovery Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Public agent registry with search and filtering. Let users find your agents.
                  Build reputation over time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  Multi-Chain Native
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deploy once, earn from 7+ blockchain networks. Base, Optimism, Arbitrum,
                  Polygon, Celo, Ethereum supported.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔌</span>
                  Multi-Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deploy to Discord, Telegram, Twitch, and Kick from a single interface.
                  Your AI never sleeps.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Real-Time Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track engagement, usage metrics, and revenue with comprehensive dashboards
                  and WebSocket logs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Is It For Section */}
      <section className="py-12 sm:py-16 md:py-20 border-t">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Built for everyone in the ecosystem
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Whether you&apos;re a creator, developer, or enterprise — PerkOS has you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card className="border-perkos-orange/30 card-hover">
              <CardHeader>
                <CardTitle className="text-xl">For Customers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Stop paying for subscriptions you don&apos;t use. Pay exactly what you consume.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Sub-cent transactions ($0.0001 minimum)</li>
                  <li>• Wallet-based identity, one signature</li>
                  <li>• Transparent pricing, on-chain audit trail</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-perkos-pink/30 card-hover">
              <CardHeader>
                <CardTitle className="text-xl">For Vendors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Turn any endpoint into a revenue stream. One line of code. Instant payments.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Near-zero fees on L2 networks</li>
                  <li>• Settlement in seconds, not weeks</li>
                  <li>• Zero fraud risk, USDC settlement</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-perkos-purple/30 card-hover">
              <CardHeader>
                <CardTitle className="text-xl">For Developers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Focus on building features, not payment infrastructure.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 10 npm packages, full TypeScript</li>
                  <li>• Ship in hours, not months</li>
                  <li>• Standards compliant (x402, ERC-8004)</li>
                </ul>
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
                      <div className="text-xs text-muted-foreground">1,000 credits • 1 connector</div>
                    </div>
                    <span className="font-mono font-bold">$0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Starter</div>
                      <div className="text-xs text-muted-foreground">15,000 credits • 2 connectors</div>
                    </div>
                    <span className="font-mono font-bold">$9</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Pro</div>
                      <div className="text-xs text-muted-foreground">75,000 credits • all connectors</div>
                    </div>
                    <span className="font-mono font-bold">$29</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Scale</div>
                      <div className="text-xs text-muted-foreground">300,000 credits • priority support</div>
                    </div>
                    <span className="font-mono font-bold">$99</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-xs text-muted-foreground">Unlimited • SLA • dedicated support</div>
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
                    Pro & Scale include all connectors
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <p className="text-xs text-perkos-amber font-medium">
                    Earn 5% back in <span className="font-semibold">$PerkOS</span> tokens on every package purchase
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pay with USDC, $PerkOS or $SelfClaw* • Buy extra credits anytime • ~75% gross margin
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
                      <div className="text-xs text-muted-foreground">1,000 calls • 1 network</div>
                    </div>
                    <span className="font-mono font-bold">$0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Starter</div>
                      <div className="text-xs text-muted-foreground">50,000 calls • 3 networks</div>
                    </div>
                    <span className="font-mono font-bold">$5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Pro</div>
                      <div className="text-xs text-muted-foreground">500,000 calls • all networks</div>
                    </div>
                    <span className="font-mono font-bold">$49</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Scale</div>
                      <div className="text-xs text-muted-foreground">5M calls • priority routing</div>
                    </div>
                    <span className="font-mono font-bold">$299</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-xs text-muted-foreground">Unlimited • SLA • dedicated infra</div>
                    </div>
                    <span className="font-mono font-bold">Custom</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2 border-t border-white/10">
                  Pay with USDC, $PerkOS or $SelfClaw* • L2 fees paid by users • ~80% margin
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
                  <p className="text-xs font-semibold text-perkos-yellow uppercase tracking-wide mb-2">Monthly Plans</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Free</div>
                      <div className="text-xs text-muted-foreground">3 agents • 1 project • 2 members</div>
                    </div>
                    <span className="font-mono font-bold">$0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Starter</div>
                      <div className="text-xs text-muted-foreground">10 agents • 3 projects • 5 members</div>
                    </div>
                    <span className="font-mono font-bold">$19</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Pro</div>
                      <div className="text-xs text-muted-foreground">50 agents • 10 projects • 15 members</div>
                    </div>
                    <span className="font-mono font-bold">$49</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Scale</div>
                      <div className="text-xs text-muted-foreground">200 agents • unlimited • 50 members</div>
                    </div>
                    <span className="font-mono font-bold">$199</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-xs text-muted-foreground">Unlimited • SLA • dedicated hub</div>
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
                  Pay with USDC, $PerkOS or $SelfClaw* • Scale per agent • ~85% gross margin
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
      <section className="py-12 sm:py-16 md:py-20 bg-muted" id="contact">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Let&apos;s Build Together
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Have questions about PerkOS? Want to explore partnerships? Looking to integrate
                  x402 payments? We&apos;d love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-perkos-orange/10 flex items-center justify-center shrink-0">
                    <span>📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">General Inquiries</h3>
                    <p className="text-sm text-muted-foreground">contact@perkos.xyz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-perkos-pink/10 flex items-center justify-center shrink-0">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Partnerships</h3>
                    <p className="text-sm text-muted-foreground">partner@perkos.xyz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-perkos-purple/10 flex items-center justify-center shrink-0">
                    <span>💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Investors</h3>
                    <p className="text-sm text-muted-foreground">invest@perkos.xyz</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://x.com/perk_os">X</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://farcaster.xyz/perkos">Farcaster</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/PerkOS-xyz">GitHub</Link>
                </Button>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-t from-muted to-background" id="get-started">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4">
              Ready to build the future?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Join the agentic economy. Launch agents, build infrastructure, and monetize AI
              with instant micropayments.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button size="lg" className="w-full sm:w-auto bg-perkos-gradient hover:opacity-90 glow-pink min-w-[180px]" asChild>
                <Link href="https://spark.perkos.xyz">
                  Launch with Spark
                </Link>
              </Button>
              <Button size="lg" className="w-full sm:w-auto bg-perkos-purple hover:bg-perkos-magenta min-w-[180px]" asChild>
                <Link href="https://stack.perkos.xyz">
                  Build with Stack
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[180px] border-perkos-pink/50 hover:border-perkos-pink hover:bg-perkos-pink/10" asChild>
                <Link href="https://github.com/PerkOS-xyz/PerkOS">
                  View on GitHub
                </Link>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/PerkOS-icon.png"
                  alt="PerkOS"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="font-bold">PerkOS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The Operating System for AI Agents
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://spark.perkos.xyz" className="text-muted-foreground hover:text-foreground">
                    Spark
                  </Link>
                </li>
                <li>
                  <Link href="https://stack.perkos.xyz" className="text-muted-foreground hover:text-foreground">
                    Stack
                  </Link>
                </li>
                <li>
                  <Link href="https://www.npmjs.com/org/perkos" className="text-muted-foreground hover:text-foreground">
                    npm Packages
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://github.com/PerkOS-xyz/PerkOS" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/PerkOS-xyz" className="text-muted-foreground hover:text-foreground">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="https://www.x402.org/" className="text-muted-foreground hover:text-foreground">
                    x402 Protocol
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://x.com/perk_os" className="text-muted-foreground hover:text-foreground">
                    X (Twitter)
                  </Link>
                </li>
                <li>
                  <Link href="https://farcaster.xyz/perkos" className="text-muted-foreground hover:text-foreground">
                    Farcaster
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/PerkOS-xyz" className="text-muted-foreground hover:text-foreground">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                    Contact Form
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@perkos.xyz" className="text-muted-foreground hover:text-foreground">
                    contact@perkos.xyz
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm text-muted-foreground">
            <p>© 2025 PerkOS. Built for the agentic economy.</p>
            <p className="mt-2">Spark ignites. Stack powers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
