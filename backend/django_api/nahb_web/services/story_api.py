import requests
from django.conf import settings

class StoryAPIClient:
    BASE_URL = settings.STORY_API_URL

    def _get(self, path):
        res = requests.get(f"{self.BASE_URL}{path}")
        res.raise_for_status()
        return res.json()

    def _headers(self):
        return {"X-API-KEY": settings.STORY_API_KEY}

    def _post(self, path, data):
        res = requests.post(
            f"{self.BASE_URL}{path}",
            json=data,
            headers=self._headers()
        )
        res.raise_for_status()
        return res.json()

    def _put(self, path, data=None):
        res = requests.put(
            f"{self.BASE_URL}{path}",
            json=data,
            headers=self._headers()
        )
        res.raise_for_status()
        return res.json()

    def _delete(self, path):
        res = requests.delete(
            f"{self.BASE_URL}{path}",
            headers=self._headers()
        )
        res.raise_for_status()


    def update_story(self, story_id, data):
        res = requests.put(
            f"{self.BASE_URL}/stories/{story_id}",
            json=data,
            headers=self._headers()
        )
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

    def get_story_pages(self, story_id):
        return self._get(f"/stories/{story_id}/pages")

    def create_story(self, data):
        return self._post("/stories", data)

    def delete_story(self, story_id):
        self._delete(f"/stories/{story_id}")

    def publish_story(self, story_id):
        return self._put(f"/stories/{story_id}/publish")


    def create_page(self, story_id, data):
        return self._post(f"/stories/{story_id}/pages", data)
