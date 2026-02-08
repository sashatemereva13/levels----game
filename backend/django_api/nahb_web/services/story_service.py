from django.conf import settings
from stories.models import StoryOwnership
from .story_api import StoryAPIClient

class StoryService:
    def __init__(self):
        self.api = StoryAPIClient()

    def list_published(self):
        return self.api.get_published_stories()

    def create_story(self, user, data):
        story = self.api.create_story(data)

        StoryOwnership.objects.create(
            user=user,
            story_id=story["id"]
        )

        return story

    def user_stories(self, user):
        owned_ids = StoryOwnership.objects.filter(user=user).values_list("story_id", flat=True)
        return [self.api.get_story(i) for i in owned_ids]

    def delete_story(self, user, story_id):
        if not StoryOwnership.objects.filter(user=user, story_id=story_id).exists():
            raise PermissionError("Not owner")

        self.api.delete_story(story_id)

