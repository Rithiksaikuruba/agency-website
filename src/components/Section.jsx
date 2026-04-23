export default function Section({ title, subtitle, children, id }) {
  return (
    <section id={id} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{title}</h2>}
            {subtitle && <p className="text-xl text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
