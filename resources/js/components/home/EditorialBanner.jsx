import { ArrowRight } from 'lucide-react';
import Container from '../common/Container';

export default function EditorialBanner({ onOpenEnquiryModal }) {
  return (
    <section id="manufacturing" className="py-10 sm:py-14 bg-slate-50/50 text-slate-900 relative overflow-hidden border-y border-slate-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="h-px w-8 bg-teal-600/40"></span>
            <span className="text-xs uppercase tracking-widest text-teal-800 font-bold">
              The Formulation Principle
            </span>
            <span className="h-px w-8 bg-teal-600/40"></span>
          </div>

          <div className="text-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="text-slate-900 hover:text-teal-700 transition-colors">Science</span>
              <span className="text-teal-600 text-xl sm:text-3xl font-light">+</span>
              <span className="text-slate-900 hover:text-teal-700 transition-colors">Technology</span>
              <span className="text-teal-600 text-xl sm:text-3xl font-light">+</span>
              <span className="text-slate-900 hover:text-teal-700 transition-colors">Quality</span>
              <span className="text-teal-600 text-2xl sm:text-4xl font-light">=</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-700">
                Better Healthcare
              </span>
            </div>

            <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 font-light leading-relaxed pt-1">
              "We believe pharmaceutical development is more than manufacturing tablets and capsules. It is the disciplined commitment to reproducible potency, clinical stability, and patient safety across every single dosage unit."
            </p>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-left border-t border-slate-200/60">
              <div className="space-y-1.5 bg-white p-5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-mono font-bold text-teal-700">01 / SCIENTIFIC RIGOR</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Molecule Optimization</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered excipient ratios that preserve therapeutic integrity while optimizing patient adherence and bioavailability.
                </p>
              </div>

              <div className="space-y-1.5 bg-white p-5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-mono font-bold text-teal-700">02 / ADVANCED AUTOMATION</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Controlled Precision</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated processing suites minimize manual contact, guaranteeing consistent uniformity across commercial production batches.
                </p>
              </div>

              <div className="space-y-1.5 bg-white p-5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-mono font-bold text-teal-700">03 / UNCOMPROMISING RELEASE</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Total Batch Validation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every lot undergoes multi-parameter physicochemical and microbiological inspection before commercial distribution.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Consult Our Technical Formulation Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
