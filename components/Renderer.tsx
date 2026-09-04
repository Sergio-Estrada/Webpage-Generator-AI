'use client';

import React from 'react';
import { WebsiteSchema, HeroSection, FeaturesSection, ContactSection } from '@/lib/types';

interface RendererProps {
  schema: WebsiteSchema;
}

export default function Renderer({ schema }: RendererProps) {
  const { theme, sections } = schema;

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
        minHeight: '100vh',
      }}
      className="w-full transition-colors duration-300"
    >
      {sections.map((section, index) => {
        switch (section.type) {
          case 'hero':
            const hero = section as HeroSection;
            return (
              <section key={index} className="px-6 py-24 md:py-32 max-w-6xl mx-auto text-center flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
                  {hero.headline}
                </h1>
                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl">
                  {hero.subheadline}
                </p>
                <a
                  href={hero.ctaLink}
                  style={{ backgroundColor: theme.primaryColor }}
                  className="px-8 py-4 text-slate-950 font-bold rounded-xl shadow-lg hover:opacity-90 transition-all duration-200 text-lg"
                >
                  {hero.ctaText}
                </a>
              </section>
            );

          case 'features':
            const features = section as FeaturesSection;
            return (
              <section key={index} className="px-6 py-20 max-w-6xl mx-auto border-t border-slate-800">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{features.title}</h2>
                  <p className="text-slate-400 max-w-xl mx-auto">{features.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.items.map((item, idx) => (
                    <div key={idx} className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'contact':
            const contact = section as ContactSection;
            return (
              <section key={index} id="contact" className="px-6 py-20 max-w-4xl mx-auto text-center border-t border-slate-800">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{contact.title}</h2>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto">{contact.subtitle}</p>
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg"
                >
                  Enviar Mensaje por WhatsApp
                </a>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
