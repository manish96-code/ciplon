export default function SectionHeading({
  badge,
  title,
  subtitle,
  description,
  align = "center",
  inverted = false,
  className = ""
}) {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto"
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-6 sm:mb-8 ${alignments[align] || alignments.center} ${className}`}>
      {badge && (
        <div className="mb-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase ${
              inverted
                ? "bg-slate-800 text-teal-300 border border-slate-700"
                : "bg-teal-50 text-teal-800 border border-teal-100"
            }`}
          >
            {badge}
          </span>
        </div>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${
            inverted ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className={`mt-2 text-lg sm:text-xl font-medium ${
            inverted ? "text-slate-300" : "text-teal-900/80"
          }`}
        >
          {subtitle}
        </p>
      )}

      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            inverted ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
