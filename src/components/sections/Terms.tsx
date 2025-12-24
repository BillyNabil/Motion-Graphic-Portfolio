'use client';

import { motion } from 'framer-motion';
import SectionObserver from '@/components/ui/SectionObserver';
import { SpotlightCard } from '@/components/visuals/MotionElements';
import { ShieldCheck, Clock, CreditCard, RefreshCw, AlertCircle, Lock, Award, FileCode, LucideIcon } from 'lucide-react';

interface TermItem {
    id: string;
    title: string;
    icon: LucideIcon;
    description: string;
    details: string;
}

const termsData: TermItem[] = [
    {
        id: "01",
        title: "Payment Options",
        icon: CreditCard,
        description: "Flexible payment available: 50% deposit upfront with remaining balance before final delivery, or full payment in advance for a smoother workflow.",
        details: "Payments via PayPal or Wise. Invoices provided for all transactions."
    },
    {
        id: "02",
        title: "Refund Policy",
        icon: RefreshCw,
        description: "Refunds are calculated based on the percentage of work already completed. If 30% of the project is done, 70% of the payment can be refunded.",
        details: "No refunds after final delivery has been approved and sent."
    },
    {
        id: "03",
        title: "Timeline & Deadlines",
        icon: Clock,
        description: "Simple projects: 3-5 working days. Complex projects: 2-3 weeks. Rush orders are available with a +50% priority fee for urgent deadlines.",
        details: "Delays caused by lack of client feedback may extend the final deadline."
    },
    {
        id: "04",
        title: "Revision Policy",
        icon: RefreshCw,
        description: "2 rounds of revisions are included in every project. Additional revisions beyond this will incur an extra fee per revision round.",
        details: "Major scope changes after approval may require a new quote."
    },
    {
        id: "05",
        title: "Usage Rights",
        icon: ShieldCheck,
        description: "Client receives full commercial usage rights for the final deliverables upon full payment. I retain the right to showcase the work in my portfolio/reel.",
        details: "Exclusive rights (I cannot use it in portfolio) available for an additional +20% fee."
    },
    {
        id: "06",
        title: "Project Files",
        icon: FileCode,
        description: "Project source files (After Effects, Blender, etc.) are not included by default. If you need the editable files, the price is doubled (x2).",
        details: "Source files are provided as-is without tutorial or support for editing."
    },
    {
        id: "07",
        title: "Confidentiality & NDA",
        icon: Lock,
        description: "I respect client privacy. NDA agreements available upon request for sensitive projects. Your ideas and brand details are kept strictly confidential.",
        details: "Signed NDAs will be honored throughout and after the project completion."
    },
    {
        id: "08",
        title: "Credit & Attribution",
        icon: Award,
        description: "Credit is appreciated but not mandatory. If you share the work publicly, a tag or mention would be greatly valued to support my work.",
        details: "For anonymous projects, please notify me in advance so I can omit from portfolio."
    }
];

const Terms = () => {
    return (
        <SectionObserver sectionId="terms">
            <section id="terms" className="relative py-16 bg-background overflow-hidden">

                {/* Visual Context */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50" />
                <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em]">[ 04 — AGREEMENT ]</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-none">
                                Terms of <br /> Commission
                            </h2>
                        </div>
                        <div className="mt-8 md:mt-0 max-w-sm text-right">
                            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                                By commissioning, you agree to the following protocols. <br />
                                Read carefully to ensure smooth collaboration.
                            </p>
                        </div>
                    </div>

                    {/* Terms Grid - Kanban Style on Mobile */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 no-scrollbar">
                        {termsData.map((term, index) => (
                            <TermCard
                                key={term.id}
                                term={term}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-12 flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-center">
                            Questions? Contact me directly.
                        </span>
                    </div>

                </div>
            </section>
        </SectionObserver>
    );
};

const TermCard = ({ term, index }: { term: TermItem, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <SpotlightCard className="h-full bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-xl overflow-hidden group">
                <div className="p-3 md:p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-2 md:mb-4">
                        <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-[10px] md:text-xs font-mono text-white/50 border border-white/10 px-1.5 py-0.5 rounded bg-white/5">
                                {term.id}
                            </span>
                        </div>
                        <term.icon className="w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="text-xs md:text-base font-bold text-white uppercase tracking-wide group-hover:text-white transition-colors mb-2">
                        {term.title}
                    </h3>

                    <p className="text-muted-foreground text-[10px] md:text-xs leading-relaxed mb-0 flex-grow line-clamp-4 md:line-clamp-none">
                        {term.description}
                    </p>
                </div>
            </SpotlightCard>
        </motion.div>
    );
};

export default Terms;
