from community.models import Report

class ReportService:

    def create(self, user, story_id: int, reason: str):
        if not reason or not reason.strip():
            raise ValueError("Reason required")

        return Report.objects.create(
            user=user,
            story_id=story_id,
            reason=reason.strip()
        )


    def all(self):
        return list(
            Report.objects
            .select_related("user")
            .values(

                "id",
                "story_id",
                "reason",
                "created_at",
                "user__username"
            )
            .order_by("-created_at")
        )


    def for_story(self, story_id:int):
        return list(
            Report.objects
            .select_related("user")
            .filter(story_id=story_id)
            .values(
                "reason",
                "created_at",
                "user__username"
            )
            .order_by("-created_at")
        )


    def count(self, story_id: int):
        return Report.objects.filter(story_id=story_id).count()