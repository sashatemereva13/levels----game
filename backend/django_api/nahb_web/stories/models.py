from django.db import models
from django.contrib.auth.models import User


class StoryOwnership(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="owned_stories"
    )

    story_id = models.IntegerField(db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "story_id")


    def __str__(self):
        return f"{self.user.username} owns story {self.story_id}"