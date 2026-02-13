import { useEffect, useRef, useState } from "react";

export default function RevealOnScroll({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate only once
        }
      },
      {
        threshold: 0.3, // triggers when 15% visible
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "revealVisible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
