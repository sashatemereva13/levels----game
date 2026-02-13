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

        StoryOwnership.objects.get_or_create(
            user=user,
            story_id=story["id"]
        )

        return story

    def user_stories(self, user):
        owned_ids = StoryOwnership.objects.filter(user=user).values_list("story_id", flat=True)

        stories = []

        for i in owned_ids:
            try:
                story = self.api.get_story(i)
                if story:
                    stories.append(story)
            except:
                pass

        return stories

    def delete_story(self, user, story_id):
        if not StoryOwnership.objects.filter(user=user, story_id=story_id).exists():
            raise PermissionError("Not owner")

        self.api.delete_story(story_id)

    def update_story(self, user, story_id, data):
        if not StoryOwnership.objects.filter(user=user, story_id=story_id).exists():
            raise PermissionError("Not owner")

        return self.api.update_story(story_id, data)


    def publish_story(self, user, story_id):
        if not StoryOwnership.objects.filter(user=user, story_id=story_id).exists():
            raise PermissionError("Not owner")

        return self.api.publish_story(story_id)

    def create_page(self, user, story_id, data):
        if not StoryOwnership.objects.filter(user=user, story_id=story_id).exists():
            raise PermissionError("Not owner")

        return self.api.create_page(story_id, data)