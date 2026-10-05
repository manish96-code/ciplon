import { 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Zap, 
  Stethoscope, 
  Wind, 
  Sparkles, 
  Brain
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
    <section id="therapeutic-areas" className="py-10 lg:py-14 bg-white border-b border-slate-100">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          badge="Specialized Portfolios"
          title="Therapeutic Areas"
          subtitle="Broad spectrum of medical disciplines addressing critical clinical needs."
          description="Our research and manufacturing pipelines span essential therapeutic categories, delivering balanced healthcare options designed around established clinical protocols."
        />

        {/* Therapeutic Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {areas.map((area) => {
            const IconComponent = iconMap[area.icon] || HeartPulse;
            return (
              <div
                key={area.id}
                onClick={() => onSelectArea && onSelectArea(area)}
                className="group relative p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-teal-500/40 transition-colors duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors duration-200">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white/90 px-2.5 py-0.5 rounded-full">
                      {area.productCount} Formulations
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {area.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {area.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-500 block truncate">
                    Focus: {area.keyMolecules}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
