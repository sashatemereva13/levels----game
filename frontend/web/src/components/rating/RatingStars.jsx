import { useState } from "react";

export default function RatingStars({ value, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ fontSize: "28px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          style={{
            color: n <= (hover || value) ? "#FFD700" : "#ccc",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
