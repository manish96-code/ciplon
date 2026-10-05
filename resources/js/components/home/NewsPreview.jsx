import { Calendar, ArrowRight, Clock } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function NewsPreview({ news = [], onReadNews }) {
  return (
    <section id="news" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          badge="Press & Developments"
          title="Latest Updates"
          subtitle="News, scientific milestones, and company announcements."
          description="Stay informed on our manufacturing expansions, regulatory achievements, and formulation advancements."
        />

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="group bg-slate-50/60 rounded-2xl border border-slate-200/80 hover:bg-white hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 sm:p-7 space-y-4">
                {/* Meta Tags: Category + Date */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                {/* News Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* News Summary */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Card Footer: Read Time & Action */}
              <div className="px-6 sm:px-7 pb-6 pt-2">
                <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.readTime}
                  </span>
                  <a
                    href="#news"
                    className="font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Release</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
