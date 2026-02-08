from django.db import models
from django.contrib.auth.models import User


class Rating(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="ratings"
    )

    story_id = models.IntegerField(db_index=True)

    score = models.IntegerField()

    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "story_id")

    def __str__(self):
        return f"{self.user.username} -> story {self.story_id}: {self.score}"


class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    story_id = models.IntegerField(db_index=True)
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
