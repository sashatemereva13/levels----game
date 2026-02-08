export default function RatingStats({ stats }) {
  if (!stats) return null;

  return (
    <div>
      ⭐ {stats.average?.toFixed(1) || 0} / 5 ({stats.total || 0} ratings)
    </div>
  );
}
