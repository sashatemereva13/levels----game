from services.page_api import PageAPIClient
from stories.models import StoryOwnership

client = PageAPIClient()


class PageService:

    def _check_owner(self, user, story_id):
        if not StoryOwnership.objects.filter(user=user, story_id=story_id).exists():
            raise PermissionError()


    def get_page(self, user, page_id):
        page = client.get(page_id)
        self._check_owner(user, page["story_id"])
        return page


    def update_page(self, user, page_id, data):
        page = client.get(page_id)
        self._check_owner(user, page["story_id"])
        return client.update(page_id, data)


    def delete_page(self, user, page_id):
        page = client.get(page_id)
        self._check_owner(user, page["story_id"])
        return client.delete(page_id)


    def create_choice(self, user, page_id, data):
        page = client.get(page_id)
        self._check_owner(user, page["story_id"])
        return client.create_choice(page_id, data)
