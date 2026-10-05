import { ArrowRight, Mail, Phone, Building2 } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';

export default function CTASection({ onOpenEnquiryModal, onOpenContactModal }) {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 text-slate-900 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-sm border border-slate-200">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-100 text-teal-900 border border-teal-300/60">
              Commercial & Institutional Partnerships
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Looking for pharmaceutical solutions?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Connect with our corporate team to explore product licensing, contract manufacturing, technical dossiers, or distributor opportunities in your region.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                href="#products"
              >
                Explore Product Portfolio
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={Mail}
                href="#contact"
                className="bg-white text-slate-700 border-slate-300 hover:bg-slate-50 shadow-2xs"
              >
                Corporate Office Contact
              </Button>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-200/90 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-700" />
                <span>Institutional & Hospital Supply</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Direct Hotline: +1 (800) 458-7290</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-700" />
                <span>Response Time: Within 24-48 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
