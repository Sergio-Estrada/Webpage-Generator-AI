export type ThemeConfig = {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
};

export type HeroSection = {
  type: 'hero';
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type FeaturesSection = {
  type: 'features';
  title: string;
  subtitle: string;
  items: FeatureItem[];
};

export type ContactSection = {
  type: 'contact';
  title: string;
  subtitle: string;
  whatsappNumber: string;
};

export type Section = HeroSection | FeaturesSection | ContactSection;

export type WebsiteSchema = {
  siteTitle: string;
  theme: ThemeConfig;
  sections: Section[];
  salesStrategy: {
    targetAudience: string;
    valueProposition: string;
    closingScript: string;
  };
};
