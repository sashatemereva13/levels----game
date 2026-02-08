import useRating from "../hooks/useRating";
import RatingForm from "./rating/RatingForm";
import RatingStats from "./rating/RatingStats";
import CommentsList from "./rating/CommentsList";

export default function StoryPage({ storyId }) {
  const { stats, comments, submit } = useRating(storyId);

  return (
    <div>
      <RatingStats stats={stats} />
      <RatingForm onSubmit={submit} />
      <CommentsList comments={comments} />
    </div>
  );
}
