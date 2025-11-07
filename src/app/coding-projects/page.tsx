import CodingProjectsPageWrapper from '@/components/sections/CodingProjectsPageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coding Projects - Billynabil',
  description: 'Explore my coding projects including interactive components, web applications, and creative solutions built with modern technologies.',
  openGraph: {
    title: 'Coding Projects - Billynabil',
    description: 'Explore my coding projects including interactive components, web applications, and creative solutions.',
    url: 'https://billynabil.com/coding-projects',
  },
};

export default function CodingProjectsPage() {
  return <CodingProjectsPageWrapper />;
}
