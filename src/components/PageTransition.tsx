import { usePageTransition } from "@/hooks/use-page-transition";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { isAnimating } = usePageTransition();

  return (
    <div 
      className={`page-transition-wrapper ${isAnimating ? 'page-entering' : 'page-entered'}`}
      style={{ willChange: isAnimating ? 'opacity, transform' : 'auto' }}
    >
      {/* Cracking overlay effect */}
      <div className="crack-overlay" style={{ willChange: isAnimating ? 'transform' : 'auto' }}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="crack-piece"
            style={{
              animationDelay: `${i * 0.05}s`,
              '--piece-index': i,
              willChange: 'transform, opacity'
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Main content with paste animation */}
      <div className="page-content" style={{ willChange: isAnimating ? 'transform' : 'auto' }}>
        {children}
      </div>
    </div>
  );
}
