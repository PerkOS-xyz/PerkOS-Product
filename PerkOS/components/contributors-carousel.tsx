"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

interface Social {
  type: string;
  url: string;
}

export interface Contributor {
  id: string;
  name: string;
  type: "vendor" | "personal" | "organization";
  description: string | null;
  link: string;
  avatarUrl: string;
  socialLinks: Social[];
  walletAddress: string;
  displayAddress: string;
  hasSponsorWallet: boolean;
}

const SocialIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case "twitter":
    case "x":
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "farcaster":
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.24 3H5.76A2.76 2.76 0 0 0 3 5.76v12.48A2.76 2.76 0 0 0 5.76 21h12.48A2.76 2.76 0 0 0 21 18.24V5.76A2.76 2.76 0 0 0 18.24 3zM6.5 7h11v1.5H6.5V7zm0 3h11v1.5H6.5V10zm0 3h7v1.5h-7V13zm0 3h4v1.5h-4V16z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "telegram":
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      );
    case "discord":
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "vendor":
      return { bg: "from-perkos-cyan/20 to-perkos-teal/10", border: "border-perkos-cyan/50", text: "text-perkos-cyan", glow: "rgba(6, 182, 212, 0.4)" };
    case "organization":
      return { bg: "from-perkos-purple/20 to-perkos-magenta/10", border: "border-perkos-purple/50", text: "text-perkos-purple", glow: "rgba(118, 67, 123, 0.4)" };
    case "personal":
    default:
      return { bg: "from-perkos-pink/20 to-perkos-coral/10", border: "border-perkos-pink/50", text: "text-perkos-pink", glow: "rgba(235, 27, 105, 0.4)" };
  }
};

const ContributorCard = ({ contributor, className = "" }: { contributor: Contributor; className?: string }) => {
  const colors = getTypeColor(contributor.type);

  return (
    <div className={`contributor-card group shrink-0 ${className}`}>
      <div
        className={`relative w-[280px] h-[360px] rounded-2xl overflow-hidden border-2 ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]`}
        style={{
          boxShadow: `0 0 20px ${colors.glow}, inset 0 0 60px rgba(255,255,255,0.03)`,
        }}
      >
        {/* Background image with 92% transparency (8% visible) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: 'url(/card-background.png)' }}
        />

        {/* Holographic shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute inset-0 holographic-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top decorative corner cuts */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent" />
        <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Card content */}
        <div className="relative h-full flex flex-col p-5">
          {/* Type badge */}
          <div className="flex justify-between items-start mb-4">
            <span className={`text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 ${colors.text}`}>
              {contributor.type}
            </span>
            {contributor.hasSponsorWallet && (
              <span className="text-[0.6rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-perkos-orange/20 text-perkos-orange border border-perkos-orange/30">
                Sponsor
              </span>
            )}
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl transition-all duration-500 group-hover:blur-2xl"
                style={{ background: colors.glow }}
              />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-white/20 ring-2 ring-offset-2 ring-offset-transparent"
                style={{ borderColor: colors.glow }}
              >
                {contributor.avatarUrl ? (
                  <Image
                    src={contributor.avatarUrl}
                    alt={contributor.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${colors.bg} text-3xl font-bold ${colors.text}`}>
                    {(contributor.name ?? "?").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Name & Description */}
          <div className="text-center flex-1">
            <h3 className="text-lg font-bold text-white mb-1 truncate px-2">
              {contributor.name}
            </h3>
            {contributor.description && (
              <p className="text-xs text-white/60 line-clamp-2 px-2 leading-relaxed">
                {contributor.description}
              </p>
            )}
          </div>

          {/* Wallet address */}
          <div className="mt-3 flex justify-center">
            <code className="text-[0.65rem] font-mono bg-white/5 px-3 py-1.5 rounded-lg text-white/50 border border-white/5">
              {contributor.displayAddress}
            </code>
          </div>

          {/* Social links */}
          <div className="mt-4 flex justify-center gap-2">
            {contributor.socialLinks.slice(0, 4).map((social, idx) => (
              <Link
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300`}
              >
                <SocialIcon type={social.type} />
              </Link>
            ))}
            {contributor.link && (
              <Link
                href={contributor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};

// Mobile Carousel Component with auto-advance and swipe
function MobileCarousel({ contributors }: { contributors: Contributor[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % contributors.length);
  }, [isAnimating, contributors.length]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + contributors.length) % contributors.length);
  }, [isAnimating, contributors.length]);

  const goToIndex = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 'right' : 'left');
    setIsAnimating(true);
    setCurrentIndex(index);
  }, [isAnimating, currentIndex]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [goToNext, isPaused]);

  // Reset animation state
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }

    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;

    // Resume auto-play after 3 seconds of no interaction
    setTimeout(() => setIsPaused(false), 3000);
  };

  const currentContributor = contributors[currentIndex];
  const colors = getTypeColor(currentContributor.type);

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Card container with perspective */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Animated glow behind card */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 70%)`,
            opacity: 0.3,
          }}
        />

        {/* Card with slide animation */}
        <div
          className={`transform transition-all duration-500 ease-out ${
            isAnimating
              ? direction === 'right'
                ? 'animate-slide-in-right'
                : 'animate-slide-in-left'
              : ''
          }`}
          style={{
            perspective: '1000px',
          }}
        >
          <ContributorCard
            contributor={currentContributor}
            className="mx-auto"
          />
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="Previous contributor"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="Next contributor"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {contributors.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-8 h-2 bg-perkos-pink'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to contributor ${idx + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-sm text-white/40">
        <span className="text-white/70 font-medium">{currentIndex + 1}</span>
        <span className="mx-1">/</span>
        <span>{contributors.length}</span>
      </div>
    </div>
  );
}

interface ContributorsCarouselProps {
  contributors: Contributor[];
}

export function ContributorsCarousel({ contributors }: ContributorsCarouselProps) {
  if (!contributors || contributors.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 border-t overflow-hidden relative">
      {/* Background ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-perkos-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-perkos-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-perkos-pink animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-white/70">Contributors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Building Together</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the vendors, creators, and organizations powering the PerkOS ecosystem
          </p>
        </div>

        {/* Mobile: Single card carousel */}
        <div className="md:hidden">
          <MobileCarousel contributors={contributors} />
        </div>

        {/* Desktop: Marquee animation */}
        <div className="hidden md:block relative marquee-fade">
          <div className="flex animate-marquee-slow">
            {/* First set */}
            {contributors.map((contributor) => (
              <ContributorCard key={`first-${contributor.id}`} contributor={contributor} className="mx-3" />
            ))}
            {/* Duplicate set for seamless loop */}
            {contributors.map((contributor) => (
              <ContributorCard key={`second-${contributor.id}`} contributor={contributor} className="mx-3" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
