export default function CommentsList({ comments }) {
  return (
    <div>
      {comments.map((c, i) => (
        <div key={i}>
          <b>{c.user__username}</b> — {c.comment}
        </div>
      ))}
    </div>
  );
}
