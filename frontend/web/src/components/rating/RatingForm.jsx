import { useState } from "react";
import RatingStars from "./RatingStars";

export default function RatingForm({ onSubmit }) {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div>
      <RatingStars value={score} onChange={setScore} />

      <textarea
        placeholder="Write your thoughts..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={() => onSubmit(score, comment)}>Submit rating</button>
    </div>
  );
}
