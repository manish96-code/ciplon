import { Microscope, FlaskConical, ArrowRight, Dna, FileCheck, Layers } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

export default function ResearchSection({ onContactUs }) {
  const capabilities = [
    {
      icon: FlaskConical,
      title: "Bioequivalence & Formulation Optimization",
      description: "Optimizing drug delivery matrices, solid dispersion systems, and solubility enhancement for challenging therapeutic molecules."
    },
    {
      icon: Microscope,
      title: "Analytical Method Validation",
      description: "Developing robust High-Performance Liquid Chromatography (HPLC) assays, forced degradation studies, and stability-indicating testing protocols."
    },
    {
      icon: Layers,
      title: "Multi-Media Dissolution Profiling",
      description: "Comparative in-vitro dissolution profiling in simulated gastric and intestinal fluids to guarantee true bioequivalent performance."
    },
    {
      icon: FileCheck,
      title: "Regulatory Dossier Preparation (CTD/eCTD)",
      description: "Module 1-5 technical dossier authoring according to ASEAN, EU, and WHO Common Technical Document submission standards."
    }
  ];

  return (
    <section id="rd" className="py-14 lg:py-20 bg-white border-b border-slate-200/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              badge="Research & Innovation"
              title="Driven by Analytical Science & Formulation Chemistry"
              subtitle="Continuous R&D pipeline transforming established APIs into stable, bioequivalent formulations."
              description="Our dedicated pharmaceutical R&D division focuses on overcoming physicochemical barriers to formulation stability. We design reproducible manufacturing processes that guarantee batch-to-batch consistency and therapeutic safety."
              align="left"
              className="mb-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-500/40 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center mb-2.5">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{cap.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cap.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                onClick={onContactUs}
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs"
              >
                Inquire About Formulation R&D
              </Button>
            </div>
          </div>

          {/* Right Column: Analytical Core Facility - Light Theme */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-slate-50 text-slate-900 p-7 border border-slate-200 relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 border border-teal-200 text-teal-800 flex items-center justify-center">
                    <Dna className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Analytical Core Facility</h3>
                    <span className="text-xs text-teal-700 font-semibold">Instrumentation & Testing</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-teal-50 border border-teal-200 text-teal-800 font-bold">
                  GLP Certified
                </span>
              </div>

              <div className="py-5 space-y-3.5">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-bold block">Dissolution Profiling</span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">Apparatus I & II (Basket / Paddle)</span>
                  </div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">&gt;85% / 15m</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-bold block">Chromatography</span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">HPLC UV-VIS & Diode Array</span>
                  </div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">99.8% Assay</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-bold block">Climatic Zone IVB</span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">Controlled Humidity & Photostability</span>
                  </div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">30°C / 75% RH</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between font-medium">
                <span>Regulatory Dossiers</span>
                <span className="text-teal-800 font-bold">CTD / eCTD Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
