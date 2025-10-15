'use client';

import Head from 'next/head';

interface StructuredDataProps {
  type?: 'person' | 'website' | 'creative-work' | 'service';
  data?: Record<string, any>;
}

const StructuredData = ({ type = 'person', data = {} }: StructuredDataProps) => {
  // Default structured data for Billynabil as a motion graphics designer
  const defaultStructuredData = {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Billynabil',
      jobTitle: 'Motion Graphics Designer',
      description: 'Professional motion graphics designer specializing in logo animations, explainer videos, and visual storytelling.',
      url: 'https://billynabil.com',
      sameAs: [
        'https://vgen.co/billynabil',
        'https://instagram.com/billynabil_',
        'https://x.com/billynabil_',
        'https://discord.gg/PcUqvQtc'
      ],
      knowsAbout: [
        'Motion Graphics',
        'Animation',
        'Video Editing',
        'Logo Animation',
        'Explainer Videos',
        'Visual Effects',
        'Adobe After Effects',
        'Adobe Premiere Pro',
        'Adobe Photoshop',
        'Adobe Illustrator'
      ],
      offers: {
        '@type': 'Service',
        serviceType: 'Motion Graphics Design',
        description: 'Custom motion graphics, animations, and video editing services'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English']
      }
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Billynabil - Motion Graphics Portfolio',
      description: 'Professional motion graphics designer specializing in logo animations, explainer videos, and visual storytelling.',
      url: 'https://billynabil.com',
      author: {
        '@type': 'Person',
        name: 'Billynabil'
      },
      publisher: {
        '@type': 'Person',
        name: 'Billynabil'
      },
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      about: {
        '@type': 'Thing',
        name: 'Motion Graphics Design'
      }
    },
    'creative-work': {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: 'Motion Graphics Portfolio',
      description: 'Collection of motion graphics projects including logo animations, explainer videos, and visual content.',
      author: {
        '@type': 'Person',
        name: 'Billynabil'
      },
      genre: ['Motion Graphics', 'Animation', 'Design'],
      keywords: 'motion graphics, animation, video editing, visual effects, logo animation',
      dateCreated: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      about: {
        '@type': 'Thing',
        name: 'Motion Graphics and Animation'
      }
    },
    service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Motion Graphics Design Services',
      description: 'Professional motion graphics design services including logo animations, explainer videos, and custom animations.',
      provider: {
        '@type': 'Person',
        name: 'Billynabil'
      },
      serviceType: 'Motion Graphics Design',
      offers: {
        '@type': 'Offer',
        description: 'Custom motion graphics starting from affordable rates',
        priceCurrency: 'USD',
        priceRange: '$'
      },
      areaServed: 'Worldwide',
      availableLanguage: ['English']
    }
  };

  const structuredData = { ...defaultStructuredData[type], ...data };
  const jsonLd = JSON.stringify(structuredData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
};

export default StructuredData;