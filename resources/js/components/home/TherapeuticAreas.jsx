import { 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Zap, 
  Stethoscope, 
  Wind, 
  Sparkles, 
  Brain,
  ArrowRight
} from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function TherapeuticAreas({ areas = [], onSelectArea }) {
  const iconMap = {
    HeartPulse,
    Activity,
    ShieldAlert,
    Zap,
    Stethoscope,
    Wind,
    Sparkles,
    Brain
  };

  return (
    <section id="therapeutic-areas" className="py-14 lg:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <Container>
        <SectionHeading
          badge="Specialized Portfolios"
          title="Core Therapeutic Segments"
          subtitle="Broad spectrum of medical disciplines addressing critical clinical indications."
          description="Our research and formulation pipelines span essential therapeutic segments, delivering clinical-grade healthcare options engineered around established global pharmacopoeial protocols."
        />

        {/* Therapeutic Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {areas.map((area) => {
            const IconComponent = iconMap[area.icon] || HeartPulse;
            return (
              <div
                key={area.id}
                onClick={() => onSelectArea && onSelectArea(area)}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors duration-200">
                      <IconComponent className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50/80 border border-teal-200/60 px-2.5 py-1 rounded-full">
                      {area.productCount} Formulations
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {area.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {area.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 block truncate max-w-[170px]">
                    Focus: {area.keyMolecules}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
