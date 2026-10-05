import { ShieldCheck, Cpu, Gauge, ClipboardCheck, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

export default function QualitySection({ onOpenEnquiryModal }) {
  const qualityPillars = [
    {
      icon: ShieldCheck,
      title: "Quality-Driven Processes",
      description: "Standard operating procedures governing every stage from raw API receipt to secondary finished packaging."
    },
    {
      icon: Gauge,
      title: "Advanced Manufacturing",
      description: "Equipped with precision compression, high-speed blister sealing, and automated particulate inspection."
    },
    {
      icon: ClipboardCheck,
      title: "Rigorous Quality Checks",
      description: "Validated analytical methods, High-Performance Liquid Chromatography (HPLC), and dissolution profiling."
    },
    {
      icon: Cpu,
      title: "Continuous Improvement",
      description: "Data-driven CAPA frameworks, environmental HVAC controls, and continuous stability chamber monitoring."
    }
  ];

  return (
    <section id="quality" className="py-10 lg:py-14 bg-white border-b border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl bg-slate-50 text-slate-900 p-6 sm:p-7 relative overflow-hidden border border-slate-100">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                <div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-teal-800 font-bold">
                    Quality Management Protocol
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">Multi-Stage Quality Gates</h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
              </div>

              <div className="py-4 space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Raw Material Qualification</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Comprehensive chemical assay & microbial limit testing on all active ingredients.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">In-Process Blend & Compression Control</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Automated weight variation, hardness, friability, and disintegration monitoring.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Finished Product Release & Stability</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Accelerated & real-time stability verification with electronic batch records.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 text-xs text-slate-600 flex items-center justify-between font-medium">
                <span>Analytical Precision: Standardized</span>
                <span className="text-teal-700 font-mono font-bold">100% Lot Inspection</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <SectionHeading
              badge="Quality Framework"
              title="Quality at Every Stage"
              subtitle="From research and development to manufacturing, quality remains at the center of everything we do."
              description="Our manufacturing philosophy centers on quality risk management. We enforce rigorous in-process verification to guarantee that every formulation consistently meets strict chemical, physical, and microbiological specifications."
              align="left"
              className="mb-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {qualityPillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center mb-2.5">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Button
                variant="medical"
                size="md"
                icon={ArrowRight}
                href="#about"
              >
                Learn About Our Quality Standards
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
