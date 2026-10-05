import { Microscope, FlaskConical, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

export default function ResearchSection({ onOpenEnquiryModal }) {
  const capabilities = [
    {
      title: "Formulation Development",
      description: "Optimizing drug delivery matrices, controlled release profiles, and solubility enhancement for challenging molecules."
    },
    {
      title: "Analytical Method Validation",
      description: "Developing robust chromatographic assays, degradation studies, and stability-indicating analytical procedures."
    },
    {
      title: "Bioequivalence & Dissolution Profiling",
      description: "Comparative multi-media dissolution testing in simulated gastric and intestinal fluids to guarantee therapeutic interchangeability."
    },
    {
      title: "Stability & Shelf-Life Research",
      description: "Climatic chamber testing under ICH-aligned environmental zones to ensure physical and chemical stability over product shelf-life."
    }
  ];

  return (
    <section id="rd" className="py-10 lg:py-14 bg-slate-50/50 border-b border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <SectionHeading
              badge="Research & Innovation"
              title="Driven by Science. Focused on Better Healthcare."
              subtitle="Our commitment to research and innovation helps us continuously refine and improve our pharmaceutical portfolio."
              description="Our dedicated pharmaceutical development division focuses on transforming established and emerging molecules into patient-friendly, stable, and cost-effective finished dosage forms."
              align="left"
              className="mb-4"
            />

            <div className="space-y-2.5">
              {capabilities.map((cap, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-100 flex items-start gap-3.5 hover:border-teal-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{cap.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <Button
                variant="medical"
                size="md"
                icon={ArrowRight}
                href="#about"
              >
                Explore Our R&D
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 sm:p-7 text-slate-900 border border-slate-100 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center">
                    <Microscope className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Analytical Core Lab</h3>
                    <span className="text-xs text-teal-700 font-medium">Continuous Formulation Testing</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-700 font-semibold">
                  R&D Suite
                </span>
              </div>

              <div className="py-4 space-y-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Dissolution Rate Profiling</span>
                    <span className="text-teal-700 font-bold font-mono">&gt; 85% in 15 min</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 h-full w-[88%] rounded-full" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Assay Chemical Purity</span>
                    <span className="text-teal-700 font-bold font-mono">99.7% Target</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 h-full w-[98%] rounded-full" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Stability Monitoring Zone IVB</span>
                    <span className="text-teal-700 font-bold font-mono">30°C / 75% RH</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 h-full w-[95%] rounded-full" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between font-medium">
                <span>R&D Technical Dossiers</span>
                <span className="text-teal-800 font-bold">CTD / eCTD Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
