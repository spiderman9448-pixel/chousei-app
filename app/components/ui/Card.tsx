interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = "", title }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl border border-border shadow-sm p-6
        ${className}
      `}
    >
      {title && (
        <h2 className="text-lg font-bold text-foreground mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}
