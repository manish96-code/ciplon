import { ArrowRight, ShieldCheck, Microscope, CheckCircle2, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';

export default function HeroSection({ onExploreProducts, onOpenEnquiryModal }) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-white text-slate-900 pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-slate-100">
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-4 lg:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-xs font-semibold text-teal-900">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span className="tracking-wide">Pharmaceutical Manufacturing & Research Excellence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.14]">
              Advancing Healthcare <br className="hidden sm:inline" />
              Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-700">Quality & Innovation</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              Dedicated to delivering reliable pharmaceutical finished formulations through rigorous analytical science, controlled manufacturing processes, and an unwavering commitment to patient safety.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                variant="medical"
                size="lg"
                icon={ArrowRight}
                onClick={onExploreProducts}
              >
                Explore Formulations
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="#about"
                className="bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              >
                Learn About Us
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>WHO-GMP Validated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Finished Dosage Forms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Global Traceability</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Formulation Science</h2>
                      <p className="text-xs text-slate-500">Bioequivalence & Solid Dosage R&D</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Active Verification
                  </span>
                </div>

                <div className="py-4 space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Quality Assurance Metric</span>
                      <p className="text-xs font-semibold text-slate-900">Analytical Dissolution Testing</p>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">99.8% Purity</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Facility Environment</span>
                      <p className="text-xs font-semibold text-slate-900">HVAC Cleanroom Classification</p>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Grade C & D</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Dosage Capabilities</span>
                      <p className="text-xs font-semibold text-slate-900">Solid, Inhalation & Liquid</p>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Multi-Line</span>
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    href="#contact"
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Contact Regulatory Formulation Team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-4 -left-4 rounded-xl bg-white border border-slate-150 p-3 items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Full Batch Traceability</p>
                  <p className="text-[10px] text-slate-500">Electronic batch records & audit trail</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
