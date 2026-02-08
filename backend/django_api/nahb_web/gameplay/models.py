from django.db import models
from django.contrib.auth.models import User


# permanent history
class Play(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        related_name="plays"
    )

    story_id = models.IntegerField(db_index=True)
    ending_page_id = models.IntegerField(null=True, blank=True, db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Play(story={self.story_id}, ending={self.ending_page_id})"

# temporary progress
class PlaySession(models.Model):
    session_key = models.CharField(max_length=64)

    story_id = models.IntegerField()
    current_page_id = models.IntegerField()

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("session_key", "story_id")

    def __str__(self):
        return f"Session({self.session_key} -> page {self.current_page_id})"