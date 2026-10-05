import { Link } from '@inertiajs/react';

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  icon: Icon,
  iconPosition = "right",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 focus:ring-slate-900",
    medical: "bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 focus:ring-teal-700",
    secondary: "bg-teal-50 text-teal-900 hover:bg-teal-100 active:bg-teal-200 focus:ring-teal-600",
    outline: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 focus:ring-slate-400",
    white: "bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus:ring-white",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100/80 active:bg-slate-200 focus:ring-slate-400"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5 font-semibold"
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    if (href.startsWith('/') && !href.includes('#')) {
      return (
        <Link href={href} className={`group ${combinedClasses}`} {...props}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={`group ${combinedClasses}`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${combinedClasses}`}
      {...props}
    >
      {content}
    </button>
  );
}
