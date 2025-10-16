'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '@/contexts/ActiveSectionContext';

interface SectionObserverProps {
  sectionId: string;
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const SectionObserver: React.FC<SectionObserverProps> = ({
  sectionId,
  children,
  threshold = 0.3,
  rootMargin = '-100px 0px -100px 0px'
}) => {
  const { setActiveSection } = useActiveSection();
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionId);
    }
  }, [inView, sectionId, setActiveSection]);

  return (
    <div ref={ref} className="section-observer">
      {children}
    </div>
  );
};

export default SectionObserver;