import requirements
from django.config import settings

class StoryAPIClient:
    BASE_URL =  "http://127.0.0.1:5001"

    def _get(self, path):
        res = requests.get(f"{self.BASE_URL}{path}")
        res.raise_for_status()
        return res.json()

    def get_published_stories(self):
        return self._get("/stories?status=published")

    def get_story(self, story_id):
        return self._get(f"/stories/{story_id}")

    def get_start_page(self, story_id):
        return self._get(f"/stories/{story_id}/start")

    def get_page(self, page_id):
        return self._get(f"/pages/{page_id}")