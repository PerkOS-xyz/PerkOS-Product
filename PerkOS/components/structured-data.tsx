export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PerkOS",
    url: "https://perkos.xyz",
    logo: "https://perkos.xyz/images/PerkOS-icon.png",
    description:
      "Infrastructure for the agentic economy. Deploy, manage, and scale AI agents with built-in micropayments, on-chain identity, and fleet orchestration.",
    sameAs: [
      "https://x.com/perk_os",
      "https://github.com/PerkOS-xyz",
      "https://farcaster.xyz/perkos",
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PerkOS",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://perkos.xyz",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier available",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
    </>
  );
}
