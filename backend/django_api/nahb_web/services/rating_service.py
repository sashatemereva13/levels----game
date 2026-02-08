from django.db.models import Avg, Count
from community.models import Rating


class RatingService:

    def rate(self, user, story_id: int, score: int, comment: str = ""):
        if score < 1 or score > 5:
              raise ValueError("Score must be between 1 and 5")

        rating, _ = Rating.objects.update_or_create(
            user=user,
            story_id=story_id,
            defaults={
                "score": score,
                "comment": comment or ""
            }
        )

        return rating

    def stats(self, story_id: int):
        qs = Rating.objects.filter(story_id=story_id)

        data = qs.aggregate(
            average=Avg("score"),
            count=Count("id")
        )

        return {
            "average": round(data["average"] or 0, 2),
            "count": data["count"]
        }

    def comments(self, story_id: int):
        return list(
            Rating.objects
            .filter(story_id=story_id)
            .exclude(comment="")
            .values("user__username", "score", "comment", "created_at")
            .order_by("-created_at")
        )

    def top(self):
        return list(
            Rating.objects
            .values("story_id")
            .annotate(avg=Avg("score"), total=Count("id"))
            .order_by("-avg")[:10]
        )

    def recent_comments(self, story_id):
        return list(
            Rating.objects
            .filter(story_id=story_id)
            .exclude(comment="")
            .order_by("-created_at")
            .values("user__username", "comment", "created_at")[:20]
        )