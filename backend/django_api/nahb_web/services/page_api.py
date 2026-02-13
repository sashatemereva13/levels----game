import requests
from django.conf import settings


class PageAPIClient:
    BASE_URL = settings.STORY_API_URL   # ✅ use existing setting

    def _headers(self):
        return {"X-API-KEY": settings.STORY_API_KEY}

    def _get(self, path):
        res = requests.get(
            f"{self.BASE_URL}{path}",
            headers=self._headers()
        )
        res.raise_for_status()
        return res.json()

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


    # ======================
    # PAGE ENDPOINTS
    # ======================

    def get_page(self, page_id):
        return self._get(f"/pages/{page_id}")

    def update_page(self, page_id, data):
        return self._put(f"/pages/{page_id}", data)

    def delete_page(self, page_id):
        self._delete(f"/pages/{page_id}")

    def create_choice(self, page_id, data):
        return self._post(f"/pages/{page_id}/choices", data)
