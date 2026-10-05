import { ShieldCheck, Cpu, Gauge, ClipboardCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

export default function QualitySection({ onContactUs }) {
  const qualityPillars = [
    {
      icon: ShieldCheck,
      title: "Raw Material API Assay & Qualification",
      description: "Rigorous chemical assay, microbial limit testing, and complete impurity profiling on all active ingredients prior to manufacturing."
    },
    {
      icon: Gauge,
      title: "In-Process Quality Controls (IPQC)",
      description: "Automated weight variation, hardness, friability, disintegration, and laser-guided particulate inspection on all compression lines."
    },
    {
      icon: ClipboardCheck,
      title: "Validated Analytical HPLC Testing",
      description: "High-Performance Liquid Chromatography (HPLC), dissolution profiling in simulated body fluids, and multi-media bioequivalence verification."
    },
    {
      icon: Cpu,
      title: "ICH Zone IVB Climatic Stability Testing",
      description: "Accelerated and real-time stability chambers monitoring finished formulations under 30°C / 75% RH tropical environmental conditions."
    }
  ];

  return (
    <section id="quality" className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Lab Facility Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl relative group">
                <img
                  src="/images/ciplon_lab.jpg"
                  alt="Ciplon Formulation Research and Analytical Testing Laboratory"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-teal-400 uppercase tracking-wider">Analytical R&D Suite</p>
                      <h4 className="text-sm font-semibold text-white mt-0.5">Chromatographic Purity & Assay</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-500/20 border border-teal-400/40 text-teal-300">
                      GLP Compliant
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Zero-Defect Standard</p>
                  <p className="text-[10px] text-slate-500 font-medium">100% Certificate of Analysis (COA)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quality Pillars & Overview */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <SectionHeading
              badge="Quality Framework"
              title="Built on Rigorous Science and Stringent GMP Protocols"
              subtitle="Every single batch undergoes multi-stage chemical, physical, and microbiological verification."
              description="Our manufacturing philosophy centers on proactive quality risk management. We enforce stringent standard operating procedures across every phase, ensuring our finished dosage formulations deliver consistent therapeutic efficacy."
              align="left"
              className="mb-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {qualityPillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-500/40 transition-all shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center mb-3">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                onClick={onContactUs}
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs"
              >
                Request Quality Dossier & COA
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
